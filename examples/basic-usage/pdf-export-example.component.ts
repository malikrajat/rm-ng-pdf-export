import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

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

  constructor(private pdfExportService: PdfExportService) {}

  exportToPdf(): void {
    // Usage with simple filename
    this.pdfExportService.exportHtml(
      this.contentToExport.nativeElement,
      { filename: 'my-document.pdf' }
    );
  }
}
