import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-custom-config',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div #content class="content" [class.has-image]="includeImage">
        <h1>Custom Config Export</h1>
        <p>This document demonstrates various export configurations.</p>
        <img *ngIf="includeImage" src="assets/placeholder.png" alt="Placeholder" />
      </div>

      <div class="controls">
        <label>
          <input type="checkbox" (change)="toggleImage($event)" /> Include Image
        </label>
        
        <button (click)="exportCustom()">Export with Custom Settings</button>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .content { padding: 40px; border: 1px solid #ddd; background: white; margin-bottom: 20px; }
    .controls { display: flex; gap: 20px; align-items: center; }
  `]
})
export class CustomConfigComponent {
  @ViewChild('content') content!: ElementRef;
  includeImage = false;

  constructor(private pdfExportService: PdfExportService) { }

  toggleImage(event: any) {
    this.includeImage = event.target.checked;
  }

  exportCustom(): void {
    // Conditional logic before export
    const filename = this.includeImage ? 'document-with-image.pdf' : 'document-text-only.pdf';
    const orientation = this.includeImage ? 'landscape' : 'portrait';

    this.pdfExportService.exportHtml(
      this.content.nativeElement,
      {
        filename: filename,
        orientation: orientation, // Conditional orientation
        pageSize: 'A4', // Can change to 'Legal', 'Tabloid' etc.
        margins: { top: 30, bottom: 30, left: 30, right: 30 },
        openInNewTab: true // Preview instead of download
      }
    );
  }
}
