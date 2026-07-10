# Usage Guide

## Quick Start

### Basic Implementation

Here's a minimal example to get you started:

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-pdf-export-example',
  standalone: true,
  template: `
    <div class="container">
      <div #contentToExport class="content">
        <h1>My Document</h1>
        <p>This content will be exported to PDF.</p>
        <table>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>Product A</td>
            <td>$100</td>
          </tr>
        </table>
      </div>
      
      <button (click)="exportToPdf()">Export to PDF</button>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .content {
      background: white;
      padding: 30px;
      border: 1px solid #ddd;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class PdfExportExampleComponent {
  @ViewChild('contentToExport', { static: false }) contentToExport!: ElementRef;

  constructor(private pdfExportService: RmNgPdfExportService) {}

  exportToPdf(): void {
    this.pdfExportService.exportToPdf(
      this.contentToExport.nativeElement,
      'my-document.pdf'
    );
  }
}
```

### With Custom Configuration

For more control over the output:

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RmNgPdfExportService, PdfExportOptions } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-advanced-export',
  standalone: true,
  template: `
    <div #invoice class="invoice">
      <h1>Invoice #12345</h1>
      <p>Date: {{ currentDate | date }}</p>
      <!-- Invoice content -->
    </div>
    
    <button (click)="exportInvoice()">Download Invoice</button>
  `
})
export class AdvancedExportComponent {
  @ViewChild('invoice') invoice!: ElementRef;
  currentDate = new Date();

  constructor(private pdfExportService: RmNgPdfExportService) {}

  exportInvoice(): void {
    const options: PdfExportOptions = {
      filename: `invoice-${Date.now()}.pdf`,
      format: 'a4',
      orientation: 'portrait',
      quality: 2,
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    };

    this.pdfExportService.exportToPdf(
      this.invoice.nativeElement,
      options
    );
  }
}
```

### Module-Based Registration

For traditional module-based Angular applications:

```typescript
import { NgModule } from '@angular/core';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@NgModule({
  providers: [RmNgPdfExportService],
  // ... other module configuration
})
export class AppModule {}
```

## API Reference

### RmNgPdfExportService

The main service for exporting HTML elements to PDF.

#### Methods

##### exportToPdf()

Export an HTML element to PDF.

```typescript
exportToPdf(
  element: HTMLElement,
  options: string | PdfExportOptions
): Promise<void>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `HTMLElement` | The HTML element to export |
| `options` | `string \| PdfExportOptions` | Filename string or options object |

**Returns:** `Promise<void>` - Resolves when PDF is generated and downloaded

#### PdfExportOptions Interface

Configuration options for PDF export.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `filename` | `string` | `'document.pdf'` | Name of the output PDF file |
| `format` | `'a4' \| 'letter' \| 'legal'` | `'a4'` | Page format/size |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Page orientation |
| `quality` | `number` | `1` | Image quality (1-3, higher = better) |
| `margin` | `Margin` | `{ top: 10, right: 10, bottom: 10, left: 10 }` | Page margins in mm |
| `compress` | `boolean` | `true` | Enable PDF compression |

#### Margin Interface

Margin configuration in millimeters.

| Property | Type | Description |
|----------|------|-------------|
| `top` | `number` | Top margin in mm |
| `right` | `number` | Right margin in mm |
| `bottom` | `number` | Bottom margin in mm |
| `left` | `number` | Left margin in mm |

#### Examples

**Simple Export:**

```typescript
this.pdfExportService.exportToPdf(element, 'document.pdf');
```

**With Options:**

```typescript
this.pdfExportService.exportToPdf(element, {
  filename: 'report.pdf',
  format: 'a4',
  orientation: 'landscape',
  quality: 2
});
```

**High Quality Export:**

```typescript
this.pdfExportService.exportToPdf(element, {
  filename: 'high-quality.pdf',
  quality: 3,
  compress: false
});
```

## Usage Examples

### Example 1: Invoice Export

Complete invoice with export functionality.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  number: string;
  date: Date;
  dueDate: Date;
  client: {
    name: string;
    address: string;
    email: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="invoice-container">
      <div #invoiceContent class="invoice">
        <div class="invoice-header">
          <div class="company-info">
            <h1>ACME Corporation</h1>
            <p>123 Business St</p>
            <p>Business City, BC 12345</p>
            <p>contact@acme.com</p>
          </div>
          
          <div class="invoice-details">
            <h2>INVOICE</h2>
            <p><strong>Invoice #:</strong> {{ invoice.number }}</p>
            <p><strong>Date:</strong> {{ invoice.date | date:'MMM d, yyyy' }}</p>
            <p><strong>Due Date:</strong> {{ invoice.dueDate | date:'MMM d, yyyy' }}</p>
          </div>
        </div>

        <div class="client-info">
          <h3>Bill To:</h3>
          <p><strong>{{ invoice.client.name }}</strong></p>
          <p>{{ invoice.client.address }}</p>
          <p>{{ invoice.client.email }}</p>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of invoice.items">
              <td>{{ item.description }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price | currency }}</td>
              <td>{{ item.total | currency }}</td>
            </tr>
          </tbody>
        </table>

        <div class="invoice-totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>{{ invoice.subtotal | currency }}</span>
          </div>
          <div class="total-row">
            <span>Tax (10%):</span>
            <span>{{ invoice.tax | currency }}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total:</span>
            <span>{{ invoice.total | currency }}</span>
          </div>
        </div>

        <div class="invoice-footer">
          <p>Thank you for your business!</p>
          <p class="terms">Payment is due within 30 days</p>
        </div>
      </div>

      <div class="action-buttons">
        <button (click)="exportInvoice()" class="export-btn">
          Download PDF
        </button>
        <button (click)="printInvoice()" class="print-btn">
          Print Invoice
        </button>
      </div>
    </div>
  `,
  styles: [`
    .invoice-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .invoice {
      background: white;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #333;
    }
    .company-info h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      color: #333;
    }
    .company-info p {
      margin: 5px 0;
      color: #666;
    }
    .invoice-details {
      text-align: right;
    }
    .invoice-details h2 {
      margin: 0 0 15px 0;
      font-size: 32px;
      color: #007bff;
    }
    .invoice-details p {
      margin: 5px 0;
    }
    .client-info {
      margin-bottom: 30px;
    }
    .client-info h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .client-info p {
      margin: 5px 0;
      color: #666;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .invoice-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #dee2e6;
      font-weight: 600;
    }
    .invoice-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
    }
    .invoice-table tbody tr:hover {
      background: #f8f9fa;
    }
    .invoice-totals {
      margin-left: auto;
      width: 300px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 16px;
    }
    .grand-total {
      border-top: 2px solid #333;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
    }
    .invoice-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      text-align: center;
    }
    .invoice-footer p {
      margin: 10px 0;
    }
    .terms {
      font-size: 14px;
      color: #666;
      font-style: italic;
    }
    .action-buttons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
    }
    button {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
    }
    .export-btn {
      background: #007bff;
      color: white;
    }
    .export-btn:hover {
      background: #0056b3;
    }
    .print-btn {
      background: #6c757d;
      color: white;
    }
    .print-btn:hover {
      background: #545b62;
    }
  `]
})
export class InvoiceComponent {
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;

  invoice: Invoice = {
    number: 'INV-2024-001',
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    client: {
      name: 'John Doe',
      address: '456 Client Ave, Client City, CC 67890',
      email: 'john.doe@example.com'
    },
    items: [
      {
        description: 'Web Development Services',
        quantity: 40,
        price: 100,
        total: 4000
      },
      {
        description: 'UI/UX Design',
        quantity: 20,
        price: 80,
        total: 1600
      },
      {
        description: 'Consulting',
        quantity: 10,
        price: 150,
        total: 1500
      }
    ],
    subtotal: 7100,
    tax: 710,
    total: 7810
  };

  constructor(private pdfExportService: RmNgPdfExportService) {}

  exportInvoice(): void {
    this.pdfExportService.exportToPdf(
      this.invoiceContent.nativeElement,
      {
        filename: `invoice-${this.invoice.number}.pdf`,
        format: 'a4',
        orientation: 'portrait',
        quality: 2,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    );
  }

  printInvoice(): void {
    window.print();
  }
}
```

### Example 2: Report Dashboard Export

Export dashboard with charts and data.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

interface ReportData {
  title: string;
  period: string;
  metrics: {
    label: string;
    value: number;
    change: number;
  }[];
  summary: string;
}

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div #reportContent class="report">
        <div class="report-header">
          <h1>{{ reportData.title }}</h1>
          <p class="period">{{ reportData.period }}</p>
          <p class="generated">Generated on: {{ currentDate | date:'full' }}</p>
        </div>

        <div class="metrics-grid">
          <div *ngFor="let metric of reportData.metrics" class="metric-card">
            <h3>{{ metric.label }}</h3>
            <div class="metric-value">{{ metric.value | number }}</div>
            <div class="metric-change" [class.positive]="metric.change > 0" [class.negative]="metric.change < 0">
              {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
            </div>
          </div>
        </div>

        <div class="report-summary">
          <h2>Executive Summary</h2>
          <p>{{ reportData.summary }}</p>
        </div>

        <div class="report-footer">
          <p>Confidential - For Internal Use Only</p>
        </div>
      </div>

      <div class="export-options">
        <button (click)="exportAsPortrait()" class="btn-primary">
          Export Portrait
        </button>
        <button (click)="exportAsLandscape()" class="btn-secondary">
          Export Landscape
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .report {
      background: white;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .report-header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #007bff;
    }
    .report-header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      color: #333;
    }
    .period {
      font-size: 18px;
      color: #666;
      margin: 10px 0;
    }
    .generated {
      font-size: 14px;
      color: #999;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .metric-card {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
    }
    .metric-card h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      color: #666;
      text-transform: uppercase;
    }
    .metric-value {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    .metric-change {
      font-size: 14px;
      font-weight: 600;
    }
    .metric-change.positive {
      color: #28a745;
    }
    .metric-change.negative {
      color: #dc3545;
    }
    .report-summary {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .report-summary h2 {
      margin: 0 0 15px 0;
      color: #333;
    }
    .report-summary p {
      line-height: 1.8;
      color: #666;
    }
    .report-footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      color: #999;
      font-size: 14px;
    }
    .export-options {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
    }
    button {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-primary:hover {
      background: #0056b3;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background: #545b62;
    }
  `]
})
export class ReportDashboardComponent {
  @ViewChild('reportContent') reportContent!: ElementRef;
  currentDate = new Date();

  reportData: ReportData = {
    title: 'Q4 2024 Business Report',
    period: 'October - December 2024',
    metrics: [
      { label: 'Total Revenue', value: 1250000, change: 15.3 },
      { label: 'New Customers', value: 342, change: 8.7 },
      { label: 'Customer Satisfaction', value: 94, change: 3.2 },
      { label: 'Market Share', value: 23, change: -1.5 }
    ],
    summary: 'This quarter showed strong performance across most metrics. Revenue increased by 15.3% compared to Q3, driven by successful product launches and improved customer retention. While market share saw a slight decline due to increased competition, our focus on customer satisfaction has yielded positive results with a 94% satisfaction rate.'
  };

  constructor(private pdfExportService: RmNgPdfExportService) {}

  exportAsPortrait(): void {
    this.pdfExportService.exportToPdf(
      this.reportContent.nativeElement,
      {
        filename: `report-Q4-2024-portrait.pdf`,
        format: 'a4',
        orientation: 'portrait',
        quality: 2
      }
    );
  }

  exportAsLandscape(): void {
    this.pdfExportService.exportToPdf(
      this.reportContent.nativeElement,
      {
        filename: `report-Q4-2024-landscape.pdf`,
        format: 'a4',
        orientation: 'landscape',
        quality: 2
      }
    );
  }
}
```

### Example 3: Certificate Generator

Generate and export certificates.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

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

  constructor(private pdfExportService: RmNgPdfExportService) {}

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

    this.pdfExportService.exportToPdf(
      this.certificateElement.nativeElement,
      {
        filename: `certificate-${this.certificate.recipientName.replace(/\s+/g, '-')}.pdf`,
        format: 'a4',
        orientation: 'landscape',
        quality: 3,
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      }
    );
  }
}
```

### Example 4: Multi-Page Document Export

Export documents with multiple pages.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmNgPdfExportService } from '@codewithrajat/rm-ng-pdf-export';

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

  constructor(private pdfExportService: RmNgPdfExportService) {}

  exportDocument(): void {
    this.pdfExportService.exportToPdf(
      this.documentContent.nativeElement,
      {
        filename: 'annual-report-2024.pdf',
        format: 'a4',
        orientation: 'portrait',
        quality: 2
      }
    );
  }
}
```

## Best Practices

### Content Preparation

```typescript
// Ensure content is properly rendered before export
async exportWithDelay(): Promise<void> {
  // Wait for images and dynamic content to load
  await this.waitForContent();
  
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
}

private waitForContent(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 500);
  });
}
```

### Styling for Print

```typescript
// Use print-specific styles
@Component({
  styles: [`
    /* Screen styles */
    .content {
      padding: 20px;
    }
    
    /* Print styles */
    @media print {
      .content {
        padding: 0;
      }
      
      .no-print {
        display: none !important;
      }
    }
  `]
})
```

### Image Optimization

```typescript
// Optimize images before export
<img 
  src="image.jpg" 
  alt="Description"
  style="max-width: 100%; height: auto;"
  loading="lazy">
```

### Error Handling

```typescript
async exportWithErrorHandling(): Promise<void> {
  try {
    await this.pdfExportService.exportToPdf(
      this.contentElement.nativeElement,
      {
        filename: 'document.pdf',
        quality: 2
      }
    );
    
    this.showSuccessMessage('PDF exported successfully');
  } catch (error) {
    console.error('Export failed:', error);
    this.showErrorMessage('Failed to export PDF. Please try again.');
  }
}
```

### Performance

```typescript
// Show loading indicator during export
isExporting = false;

async exportDocument(): Promise<void> {
  this.isExporting = true;
  
  try {
    await this.pdfExportService.exportToPdf(
      this.contentElement.nativeElement,
      'document.pdf'
    );
  } finally {
    this.isExporting = false;
  }
}
```

### User Experience

```typescript
// Provide export feedback
<button 
  (click)="exportDocument()"
  [disabled]="isExporting">
  {{ isExporting ? 'Exporting...' : 'Export PDF' }}
</button>

<div *ngIf="isExporting" class="loading-overlay">
  <div class="spinner"></div>
  <p>Generating your PDF...</p>
</div>
```

## Advanced Configuration

### High-Quality Exports

```typescript
exportHighQuality(): void {
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'high-quality.pdf',
      quality: 3,
      compress: false,
      margin: {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
      }
    }
  );
}
```

### Custom Page Sizes

```typescript
exportCustomSize(): void {
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'custom-size.pdf',
      format: 'letter',
      orientation: 'landscape'
    }
  );
}
```

### Conditional Export

```typescript
exportBasedOnContent(): void {
  const hasImages = this.contentElement.nativeElement.querySelectorAll('img').length > 0;
  
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'document.pdf',
      quality: hasImages ? 3 : 2,
      compress: !hasImages
    }
  );
}
```

### Batch Export

```typescript
async exportMultipleDocuments(): Promise<void> {
  const documents = [
    { element: this.doc1, filename: 'document-1.pdf' },
    { element: this.doc2, filename: 'document-2.pdf' },
    { element: this.doc3, filename: 'document-3.pdf' }
  ];
  
  for (const doc of documents) {
    await this.pdfExportService.exportToPdf(
      doc.element.nativeElement,
      doc.filename
    );
    
    // Add delay between exports
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

## Performance Optimization

### Bundle Size Impact

| Component | Size (Minified + Gzipped) |
|-----------|---------------------------|
| Service Core | ~3KB |
| html2canvas | ~140KB |
| jsPDF | ~180KB |
| **Total Impact** | **~323KB** |

### Optimization Tips

#### 1. Lazy Load the Service

```typescript
// Only load when needed
const routes: Routes = [
  {
    path: 'export',
    loadComponent: () => 
      import('./export.component').then(m => m.ExportComponent)
  }
];
```

#### 2. Optimize Images

```typescript
// Compress images before export
<img 
  src="optimized-image.jpg" 
  width="800" 
  height="600"
  loading="lazy">
```

#### 3. Reduce Quality for Large Documents

```typescript
exportLargeDocument(): void {
  this.pdfExportService.exportToPdf(
    this.largeContent.nativeElement,
    {
      filename: 'large-doc.pdf',
      quality: 1, // Lower quality for faster export
      compress: true
    }
  );
}
```

#### 4. Use Virtual Scrolling

```typescript
// For very long documents, render in chunks
async exportLongDocument(): Promise<void> {
  // Render visible content first
  await this.renderVisibleContent();
  
  // Export
  await this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
}
```

### Memory Management

```typescript
// Clean up after export
async exportAndCleanup(): Promise<void> {
  await this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
  
  // Clear any temporary data
  this.tempData = null;
}
```

## Smart Page Breaking

The library includes intelligent page breaking that prevents content from being cut in the middle of important visual elements. This ensures professional-looking PDFs with clean page transitions.

### Features

- **Content Boundary Detection**: Automatically identifies sections, cards, and content blocks
- **CSS Page-Break Support**: Respects CSS `page-break-before`, `page-break-after`, and `page-break-inside` properties
- **Visual Element Preservation**: Cards, images, and styled sections remain intact across pages
- **Priority-Based Breaking**: Intelligent selection of optimal break points based on content importance

### CSS Page-Break Properties

Use standard CSS page-break properties to guide the breaking logic:

```css
/* Prevent breaking inside an element */
.card, .content-block {
  page-break-inside: avoid;
}

/* Allow page break before if needed */
.section {
  page-break-before: auto;
}

/* Avoid page break after to keep content together */
.section-header {
  page-break-after: avoid;
}

/* Force a page break before */
.new-chapter {
  page-break-before: always;
}
```

### Supported CSS Classes

The smart page breaking algorithm recognizes these classes for optimal break point detection:

| Class | Purpose | Break Behavior |
|-------|---------|----------------|
| `.pdf-section` | Major content sections | Prefers breaks before/after |
| `.content-block` | Large content areas | Avoids breaking inside |
| `.blog-card` | Article/blog post cards | Keeps intact on single page |
| `.feature-card` | Feature/service cards | Prevents mid-card breaks |
| `.stat-card` | Statistics/metric cards | Maintains visual integrity |

### Break Point Priority System

The algorithm uses a priority system to choose optimal break points:

| Priority | Trigger | Use Case |
|----------|---------|----------|
| 10 | Document start/end | Absolute boundaries |
| 9 | `page-break-before: always` | Forced breaks |
| 8 | `page-break-inside: avoid` | Element boundaries |
| 7 | `page-break-before: auto` | Preferred breaks |
