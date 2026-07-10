import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

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

    constructor(private pdfExportService: PdfExportService) { }

    exportAsPortrait(): void {
        this.pdfExportService.exportHtml(
            this.reportContent.nativeElement,
            {
                filename: `report-Q4-2024-portrait.pdf`,
                pageSize: 'A4',
                orientation: 'portrait'
            }
        );
    }

    exportAsLandscape(): void {
        this.pdfExportService.exportHtml(
            this.reportContent.nativeElement,
            {
                filename: `report-Q4-2024-landscape.pdf`,
                pageSize: 'A4',
                orientation: 'landscape'
            }
        );
    }
}
