# 📈 Dashboard Export Example

Export complex dashboards with charts, graphs, and data visualizations to PDF while maintaining high quality and proper formatting.

## 🎯 What You'll Learn

- Exporting charts and graphs (Chart.js, D3.js, etc.)
- Handling complex dashboard layouts
- Landscape orientation for wide content
- Custom page sizes for dashboards
- Preserving interactive element styling

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📋 Features Demonstrated

- ✅ Chart.js integration
- ✅ Multiple chart types (bar, line, pie, doughnut)
- ✅ Data tables with sorting
- ✅ KPI cards and metrics
- ✅ Landscape orientation
- ✅ Large page formats (A3, Tabloid)
- ✅ Grid layouts

## 💻 Component Implementation

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PdfExportService } from 'rm-ng-pdf-export';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface DashboardData {
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  salesData: number[];
  monthlyLabels: string[];
}

@Component({
  selector: 'app-dashboard-export',
  templateUrl: './dashboard-export.component.html',
  styleUrls: ['./dashboard-export.component.css']
})
export class DashboardExportComponent implements AfterViewInit {
  @ViewChild('dashboardContent') dashboardContent!: ElementRef;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef;
  @ViewChild('ordersChart') ordersChartRef!: ElementRef;
  @ViewChild('customerChart') customerChartRef!: ElementRef;

  dashboardData: DashboardData = {
    revenue: 125000,
    orders: 1250,
    customers: 850,
    conversionRate: 3.2,
    salesData: [15000, 18000, 22000, 19000, 25000, 28000, 32000, 29000, 35000, 38000, 42000, 45000],
    monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  private charts: Chart[] = [];
  isExporting = false;

  constructor(private pdfService: PdfExportService) {}

  ngAfterViewInit() {
    this.initializeCharts();
  }

  private initializeCharts() {
    // Revenue Chart (Line)
    const revenueConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.dashboardData.monthlyLabels,
        datasets: [{
          label: 'Monthly Revenue',
          data: this.dashboardData.salesData,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Trend'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + (value as number).toLocaleString();
              }
            }
          }
        }
      }
    };

    // Orders Chart (Bar)
    const ordersConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.dashboardData.monthlyLabels.slice(-6),
        datasets: [{
          label: 'Orders',
          data: [120, 150, 180, 160, 200, 220],
          backgroundColor: '#2ecc71',
          borderColor: '#27ae60',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Recent Orders'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    // Customer Distribution (Doughnut)
    const customerConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['New Customers', 'Returning Customers', 'VIP Customers'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: ['#3498db', '#2ecc71', '#f39c12'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Customer Distribution'
          }
        }
      }
    };

    // Create charts
    this.charts.push(
      new Chart(this.revenueChartRef.nativeElement, revenueConfig),
      new Chart(this.ordersChartRef.nativeElement, ordersConfig),
      new Chart(this.customerChartRef.nativeElement, customerConfig)
    );
  }

  async exportDashboard() {
    this.isExporting = true;

    try {
      // Wait for charts to render completely
      await this.waitForChartsToRender();

      await this.pdfService.exportHtml(this.dashboardContent.nativeElement, {
        filename: `dashboard-${new Date().toISOString().split('T')[0]}.pdf`,
        pageSize: 'A3',
        orientation: 'landscape',
        metadata: {
          title: 'Sales Dashboard Report',
          author: 'Analytics Team',
          subject: 'Monthly Dashboard Export'
        }
      });

      console.log('Dashboard exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export dashboard. Please try again.');
    } finally {
      this.isExporting = false;
    }
  }

  private waitForChartsToRender(): Promise<void> {
    return new Promise(resolve => {
      // Give charts time to fully render
      setTimeout(() => {
        this.charts.forEach(chart => chart.update());
        setTimeout(resolve, 500);
      }, 100);
    });
  }

  ngOnDestroy() {
    // Clean up charts
    this.charts.forEach(chart => chart.destroy());
  }
}
```

## 🎨 Template Structure

```html
<div class="container">
  <div class="controls">
    <h1>📊 Sales Dashboard</h1>
    <button 
      (click)="exportDashboard()" 
      [disabled]="isExporting"
      class="export-btn">
      {{ isExporting ? 'Exporting...' : '📄 Export Dashboard PDF' }}
    </button>
  </div>

  <div #dashboardContent class="dashboard-container">
    <!-- Dashboard Header -->
    <header class="dashboard-header">
      <h1>Sales Dashboard</h1>
      <p class="report-date">Report Generated: {{ new Date() | date:'medium' }}</p>
    </header>

    <!-- KPI Cards -->
    <section class="kpi-section">
      <div class="kpi-grid">
        <div class="kpi-card revenue">
          <div class="kpi-icon">💰</div>
          <div class="kpi-content">
            <h3>Total Revenue</h3>
            <p class="kpi-value">{{ dashboardData.revenue | currency }}</p>
            <span class="kpi-change positive">+12.5%</span>
          </div>
        </div>

        <div class="kpi-card orders">
          <div class="kpi-icon">📦</div>
          <div class="kpi-content">
            <h3>Total Orders</h3>
            <p class="kpi-value">{{ dashboardData.orders | number }}</p>
            <span class="kpi-change positive">+8.3%</span>
          </div>
        </div>

        <div class="kpi-card customers">
          <div class="kpi-icon">👥</div>
          <div class="kpi-content">
            <h3>Active Customers</h3>
            <p class="kpi-value">{{ dashboardData.customers | number }}</p>
            <span class="kpi-change positive">+15.2%</span>
          </div>
        </div>

        <div class="kpi-card conversion">
          <div class="kpi-icon">📈</div>
          <div class="kpi-content">
            <h3>Conversion Rate</h3>
            <p class="kpi-value">{{ dashboardData.conversionRate }}%</p>
            <span class="kpi-change negative">-0.8%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="charts-section">
      <div class="charts-grid">
        <!-- Revenue Chart -->
        <div class="chart-container large">
          <canvas #revenueChart></canvas>
        </div>

        <!-- Orders Chart -->
        <div class="chart-container medium">
          <canvas #ordersChart></canvas>
        </div>

        <!-- Customer Distribution -->
        <div class="chart-container medium">
          <canvas #customerChart></canvas>
        </div>
      </div>
    </section>

    <!-- Data Table -->
    <section class="table-section">
      <h2>Monthly Performance</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Orders</th>
            <th>Avg. Order Value</th>
            <th>Growth</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let month of dashboardData.monthlyLabels.slice(-6); let i = index">
            <td>{{ month }} 2025</td>
            <td>{{ dashboardData.salesData[dashboardData.salesData.length - 6 + i] | currency }}</td>
            <td>{{ (dashboardData.salesData[dashboardData.salesData.length - 6 + i] / 150) | number:'1.0-0' }}</td>
            <td>{{ (dashboardData.salesData[dashboardData.salesData.length - 6 + i] / (dashboardData.salesData[dashboardData.salesData.length - 6 + i] / 150)) | currency }}</td>
            <td class="growth-cell">
              <span class="growth positive" *ngIf="i > 0">+{{ ((dashboardData.salesData[dashboardData.salesData.length - 6 + i] / dashboardData.salesData[dashboardData.salesData.length - 6 + i - 1] - 1) * 100) | number:'1.1-1' }}%</span>
              <span class="growth neutral" *ngIf="i === 0">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Footer -->
    <footer class="dashboard-footer">
      <p>Generated by Analytics Dashboard | Confidential</p>
    </footer>
  </div>
</div>
```

## 🎨 Dashboard Styling

```css
.dashboard-container {
  background: white;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #3498db;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 28px;
}

.report-date {
  color: #666;
  margin: 10px 0 0 0;
  font-size: 14px;
}

/* KPI Cards */
.kpi-section {
  margin-bottom: 40px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.kpi-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.kpi-card.revenue {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.kpi-card.orders {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.kpi-card.customers {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
}

.kpi-card.conversion {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
}

.kpi-icon {
  font-size: 32px;
  margin-right: 15px;
}

.kpi-content h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  opacity: 0.9;
}

.kpi-value {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: bold;
}

.kpi-change {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.2);
}

.kpi-change.positive {
  background: rgba(46, 204, 113, 0.3);
}

.kpi-change.negative {
  background: rgba(231, 76, 60, 0.3);
}

/* Charts */
.charts-section {
  margin-bottom: 40px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #eee;
}

.chart-container.large {
  grid-row: span 2;
}

/* Data Table */
.table-section {
  margin-bottom: 30px;
}

.table-section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.data-table thead {
  background: #34495e;
  color: white;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
}

.data-table th {
  font-weight: 600;
  font-size: 14px;
}

.data-table tbody tr {
  border-bottom: 1px solid #eee;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.data-table td:nth-child(2),
.data-table td:nth-child(3),
.data-table td:nth-child(4) {
  text-align: right;
}

.growth-cell {
  text-align: center !important;
}

.growth {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.growth.positive {
  background: #d4edda;
  color: #155724;
}

.growth.negative {
  background: #f8d7da;
  color: #721c24;
}

.growth.neutral {
  background: #e2e3e5;
  color: #6c757d;
}

/* Footer */
.dashboard-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  color: #666;
  font-size: 12px;
}

/* Controls */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.controls h1 {
  margin: 0;
  color: #2c3e50;
}

.export-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
    gap: 15px;
  }
}
```

## 📊 Chart.js Integration

### Installation
```bash
npm install chart.js
```

### Key Points for PDF Export

1. **Wait for Rendering**: Charts need time to render before export
2. **Canvas Elements**: Chart.js uses canvas which exports well to PDF
3. **Responsive Design**: Ensure charts fit within page boundaries
4. **Color Schemes**: Use print-friendly colors

## 🎯 Best Practices

1. **Large Page Sizes**: Use A3 or Tabloid for dashboards
2. **Landscape Orientation**: Better for wide dashboard layouts
3. **Grid Layouts**: Organize content in structured grids
4. **High Contrast**: Ensure readability in PDF format
5. **Chart Sizing**: Size charts appropriately for PDF output

## 🔄 Next Steps

- [Multi-page Documents](../multi-page/) - Handle large dashboards
- [Advanced Configuration](../advanced-config/) - Custom PDF settings
- [Styled Components](../styled-components/) - Advanced styling techniques

## 📞 Support

Need help with dashboard exports? Contact [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)