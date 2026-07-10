import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
    selector: 'app-multi-page-doc',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="document-container">
      <div #documentContent class="document">
        <div class="page">
          <h1>Annual Report 2024</h1>
          <h2>Executive Summary</h2>
          <p>This annual report presents a comprehensive overview of our company's performance, achievements, and strategic initiatives throughout 2024.</p>
          <!-- More content -->
        </div>
        
        <div class="page-break"></div>
        
        <div class="page">
          <h2>Financial Highlights</h2>
          <p>Our financial performance in 2024 demonstrated strong growth across all key metrics.</p>
          <!-- More content -->
        </div>
        
        <div class="page-break"></div>
        
        <div class="page">
          <h2>Future Outlook</h2>
          <p>Looking ahead to 2025, we are positioned for continued growth and success.</p>
          <!-- More content -->
        </div>
      </div>
      
      <button (click)="exportDocument()">Export Full Document</button>
    </div>
  `,
    styles: [`
    .document-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .document {
      background: white;
    }
    .page {
      padding: 40px;
      min-height: 1000px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    .page h1 {
      font-size: 36px;
      margin-bottom: 30px;
    }
    .page h2 {
      font-size: 28px;
      margin: 30px 0 20px 0;
      color: #007bff;
    }
    .page p {
      line-height: 1.8;
      margin-bottom: 20px;
    }
    .page-break {
      page-break-after: always;
    }
    button {
      width: 100%;
      padding: 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      margin-top: 20px;
    }
    button:hover {
      background: #0056b3;
    }
  `]
})
export class MultiPageDocComponent {
    @ViewChild('documentContent') documentContent!: ElementRef;

    constructor(private pdfExportService: PdfExportService) { }

    exportDocument(): void {
        this.pdfExportService.exportHtml(
            this.documentContent.nativeElement,
            {
                filename: 'annual-report-2024.pdf',
                pageSize: 'A4',
                orientation: 'portrait'
            }
        );
    }
}
