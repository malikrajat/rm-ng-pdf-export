import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
    selector: 'app-error-handling',
    standalone: true,
    template: `
    <div class="container">
      <div #content class="content">
        <h1>Error Handling Demo</h1>
        <p>Reliable export implementation.</p>
      </div>
      
      <div *ngIf="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>
      
      <button (click)="exportSafe()">Export Safely</button>
    </div>
  `,
    styles: [`
    .error-alert { color: red; padding: 10px; border: 1px solid red; background: #fee; margin: 10px 0; }
  `]
})
export class ErrorHandlingComponent {
    @ViewChild('content') content!: ElementRef;
    errorMessage = '';

    constructor(private pdfExportService: PdfExportService) { }

    async exportSafe(): Promise<void> {
        this.errorMessage = '';

        try {
            if (!this.content) {
                throw new Error('Content element not found');
            }

            await this.pdfExportService.exportHtml(
                this.content.nativeElement,
                { filename: 'safe-document.pdf' }
            );

            console.log('Export completed successfully');
        } catch (error) {
            console.error('Export failed:', error);
            this.errorMessage = 'Failed to generate PDF. Please try again later.';
        }
    }
}
