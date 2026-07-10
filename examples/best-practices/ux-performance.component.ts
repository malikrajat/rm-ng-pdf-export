import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
    selector: 'app-ux-performance',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <div #content class="content">
        <h1>User Experience & Performance</h1>
        <p>Feedback during long running processes is crucial.</p>
        <div *ngFor="let i of [1,2,3,4,5]">
           <p>Simulating complex content line {{ i }}</p>
        </div>
      </div>

      <div class="actions">
        <!-- Button shows loading state -->
        <button (click)="exportWithFeedback()" [disabled]="isExporting">
          <span *ngIf="isExporting" class="spinner">↻</span>
          {{ isExporting ? 'Generating PDF...' : 'Export PDF' }}
        </button>
      </div>

      <!-- Overlay for blocking interaction if needed -->
      <div *ngIf="isExporting" class="loading-overlay">
        <div class="message">Processing your document...</div>
      </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; position: relative; }
    .content { padding: 30px; background: white; min-height: 200px; }
    .spinner { display: inline-block; animation: spin 1s linear infinite; margin-right: 5px; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .loading-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.8);
      display: flex; justify-content: center; align-items: center;
    }
  `]
})
export class UxPerformanceComponent {
    @ViewChild('content') content!: ElementRef;
    isExporting = false;

    constructor(private pdfExportService: PdfExportService) { }

    async exportWithFeedback(): Promise<void> {
        this.isExporting = true;

        // Simulate slight delay to ensure UI updates before heavy work
        await new Promise(resolve => setTimeout(resolve, 50));

        try {
            await this.pdfExportService.exportHtml(
                this.content.nativeElement,
                { filename: 'ux-demo.pdf' }
            );
        } finally {
            this.isExporting = false;
        }
    }
}
