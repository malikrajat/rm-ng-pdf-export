import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

interface Certificate {
    recipientName: string;
    courseName: string;
    completionDate: Date;
    certificateId: string;
    instructor: string;
}

@Component({
    selector: 'app-certificate-generator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="generator-container">
      <div class="form-section">
        <h2>Certificate Generator</h2>
        
        <div class="form-group">
          <label>Recipient Name:</label>
          <input [(ngModel)]="certificate.recipientName" placeholder="Enter name">
        </div>
        
        <div class="form-group">
          <label>Course Name:</label>
          <input [(ngModel)]="certificate.courseName" placeholder="Enter course">
        </div>
        
        <div class="form-group">
          <label>Instructor:</label>
          <input [(ngModel)]="certificate.instructor" placeholder="Enter instructor">
        </div>
        
        <button (click)="generateCertificate()" [disabled]="!isFormValid()">
          Generate & Download Certificate
        </button>
      </div>

      <div #certificate class="certificate">
        <div class="certificate-border">
          <div class="certificate-content">
            <h1 class="certificate-title">Certificate of Completion</h1>
            
            <div class="certificate-body">
              <p class="presented-to">This certificate is presented to</p>
              <h2 class="recipient-name">{{ certificate.recipientName || 'Recipient Name' }}</h2>
              
              <p class="completion-text">
                for successfully completing the course
              </p>
              
              <h3 class="course-name">{{ certificate.courseName || 'Course Name' }}</h3>
              
              <p class="completion-date">
                on {{ certificate.completionDate | date:'MMMM d, yyyy' }}
              </p>
            </div>
            
            <div class="certificate-footer">
              <div class="signature-section">
                <div class="signature-line"></div>
                <p class="signature-label">{{ certificate.instructor || 'Instructor' }}</p>
                <p class="signature-title">Course Instructor</p>
              </div>
              
              <div class="certificate-seal">
                <div class="seal-circle">
                  <span>CERTIFIED</span>
                </div>
              </div>
            </div>
            
            <p class="certificate-id">Certificate ID: {{ certificate.certificateId }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .generator-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
    }
    .form-section {
      background: white;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      height: fit-content;
    }
    .form-section h2 {
      margin: 0 0 20px 0;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
    }
    button:hover:not(:disabled) {
      background: #0056b3;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .certificate {
      background: white;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .certificate-border {
      border: 10px solid #007bff;
      padding: 50px;
      position: relative;
    }
    .certificate-border::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 2px solid #007bff;
    }
    .certificate-content {
      text-align: center;
      position: relative;
    }
    .certificate-title {
      font-size: 48px;
      margin: 0 0 40px 0;
      color: #007bff;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .presented-to {
      font-size: 18px;
      color: #666;
      margin: 0;
    }
    .recipient-name {
      font-size: 42px;
      margin: 20px 0;
      color: #333;
      font-family: 'Brush Script MT', cursive;
    }
    .completion-text {
      font-size: 18px;
      color: #666;
      margin: 30px 0 10px 0;
    }
    .course-name {
      font-size: 32px;
      margin: 10px 0 30px 0;
      color: #007bff;
    }
    .completion-date {
      font-size: 16px;
      color: #666;
    }
    .certificate-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 60px;
      padding: 0 40px;
    }
    .signature-section {
      text-align: left;
    }
    .signature-line {
      width: 200px;
      height: 2px;
      background: #333;
      margin-bottom: 10px;
    }
    .signature-label {
      margin: 0;
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
    .signature-title {
      margin: 5px 0 0 0;
      font-size: 14px;
      color: #666;
    }
    .certificate-seal {
      text-align: right;
    }
    .seal-circle {
      width: 100px;
      height: 100px;
      border: 3px solid #007bff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #007bff;
      font-size: 14px;
    }
    .certificate-id {
      margin-top: 40px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  `]
})
export class CertificateGeneratorComponent {
    @ViewChild('certificate') certificateElement!: ElementRef;

    certificate: Certificate = {
        recipientName: '',
        courseName: '',
        completionDate: new Date(),
        certificateId: this.generateCertificateId(),
        instructor: ''
    };

    constructor(private pdfExportService: PdfExportService) { }

    isFormValid(): boolean {
        return !!(
            this.certificate.recipientName &&
            this.certificate.courseName &&
            this.certificate.instructor
        );
    }

    generateCertificateId(): string {
        return `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    generateCertificate(): void {
        if (!this.isFormValid()) return;

        this.pdfExportService.exportHtml(
            this.certificateElement.nativeElement,
            {
                filename: `certificate-${this.certificate.recipientName.replace(/\s+/g, '-')}.pdf`,
                pageSize: 'A4',
                orientation: 'landscape',
                margins: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }
            }
        );
    }
}
