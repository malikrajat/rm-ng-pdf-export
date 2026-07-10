import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-batch-export',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Batch Export Example</h2>
      <button (click)="exportAll()" [disabled]="isExporting">
        {{ isExporting ? 'Exporting...' : 'Export All Documents' }}
      </button>
      
      <div class="documents-grid">
        <div #doc class="document-card" *ngFor="let item of items; let i = index">
          <h3>Document {{ i + 1 }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .documents-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
    .document-card { padding: 20px; border: 1px solid #ccc; background: white; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; }
  `]
})
export class BatchExportComponent {
  @ViewChildren('doc') documents!: QueryList<ElementRef>;
  isExporting = false;

  items = [
    { content: 'Content for document 1' },
    { content: 'Content for document 2' },
    { content: 'Content for document 3' }
  ];

  constructor(private pdfExportService: PdfExportService) { }

  async exportAll(): Promise<void> {
    this.isExporting = true;
    const docs = this.documents.toArray();

    try {
      for (let i = 0; i < docs.length; i++) {
        await this.pdfExportService.exportHtml(
          docs[i].nativeElement,
          { filename: `document-${i + 1}.pdf` }
        );
        // Optional: Add small delay between exports
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (err) {
      console.error('Batch export failed', err);
    } finally {
      this.isExporting = false;
    }
  }
}
