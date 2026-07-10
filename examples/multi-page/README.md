# 📑 Multi-page Documents Example

Demonstrate how to handle large documents with intelligent page breaking, content flow, and professional multi-page layouts.

## 🎯 What You'll Learn

- Smart page breaking algorithms
- CSS page-break properties
- Content preservation across pages
- Multi-page document structure
- Professional page layouts
- Headers and footers for each page

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📋 Features Demonstrated

- ✅ Intelligent page breaking
- ✅ CSS page-break properties
- ✅ Content boundary detection
- ✅ Section preservation
- ✅ Table of contents
- ✅ Page headers and footers
- ✅ Large document handling

## 💻 Component Implementation

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from 'rm-ng-pdf-export';

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocumentSection[];
}

@Component({
  selector: 'app-multi-page',
  templateUrl: './multi-page.component.html',
  styleUrls: ['./multi-page.component.css']
})
export class MultiPageComponent {
  @ViewChild('documentContent') documentContent!: ElementRef;
  
  isExporting = false;
  
  document = {
    title: 'Comprehensive Business Report 2025',
    subtitle: 'Annual Performance Analysis and Strategic Planning',
    author: 'Business Analytics Team',
    date: new Date(),
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        content: `This comprehensive report provides an in-depth analysis of our company's performance throughout 2025. 
        The year has been marked by significant growth, strategic initiatives, and market expansion. Our revenue increased by 
        25% compared to the previous year, driven by strong performance in our core business segments and successful 
        launch of new product lines. This document outlines our achievements, challenges, and strategic direction for 
        the upcoming fiscal year.`,
        subsections: [
          {
            id: 'key-highlights',
            title: 'Key Highlights',
            content: `• Revenue growth of 25% year-over-year
            • Successful expansion into 3 new markets
            • Launch of 5 innovative products
            • Customer satisfaction rating of 98%
            • Employee retention rate of 95%
            • Sustainability goals exceeded by 15%`
          }
        ]
      },
      {
        id: 'financial-performance',
        title: 'Financial Performance',
        content: `Our financial performance in 2025 exceeded expectations across all key metrics. Total revenue reached 
        $125 million, representing a 25% increase from the previous year. This growth was driven by strong performance 
        in both existing and new market segments. Operating margins improved to 18%, reflecting our continued focus on 
        operational efficiency and cost optimization initiatives.`,
        subsections: [
          {
            id: 'revenue-analysis',
            title: 'Revenue Analysis',
            content: `Revenue growth was consistent throughout the year, with particularly strong performance in Q3 and Q4. 
            Our subscription-based services contributed 60% of total revenue, while product sales accounted for 40%. 
            The recurring revenue model has provided stability and predictable cash flow, enabling strategic investments 
            in research and development.`
          },
          {
            id: 'cost-management',
            title: 'Cost Management',
            content: `We implemented comprehensive cost management strategies that resulted in a 12% reduction in operational 
            expenses while maintaining service quality. Key initiatives included automation of routine processes, 
            renegotiation of vendor contracts, and optimization of our supply chain operations.`
          }
        ]
      },
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        content: `The market landscape in 2025 presented both opportunities and challenges. Industry growth averaged 8%, 
        while our company achieved 25% growth, significantly outperforming market benchmarks. This success can be 
        attributed to our innovative product offerings, strong customer relationships, and strategic market positioning.`,
        subsections: [
          {
            id: 'competitive-landscape',
            title: 'Competitive Landscape',
            content: `We maintained our position as a market leader while facing increased competition from both established 
            players and new entrants. Our competitive advantages include superior technology, strong brand recognition, 
            and comprehensive customer support services.`
          },
          {
            id: 'market-opportunities',
            title: 'Market Opportunities',
            content: `Several emerging market opportunities have been identified for 2026, including expansion into 
            international markets, development of AI-powered solutions, and partnerships with technology providers. 
            These opportunities align with our strategic objectives and core competencies.`
          }
        ]
      },
      {
        id: 'operational-excellence',
        title: 'Operational Excellence',
        content: `Our commitment to operational excellence resulted in significant improvements across all business functions. 
        We implemented lean manufacturing principles, enhanced quality control processes, and invested in employee 
        training and development programs. These initiatives contributed to improved efficiency, reduced waste, and 
        higher customer satisfaction.`,
        subsections: [
          {
            id: 'process-improvements',
            title: 'Process Improvements',
            content: `We completed 15 major process improvement projects, resulting in a 20% increase in productivity 
            and 30% reduction in cycle times. Key improvements included automation of manual processes, implementation 
            of digital workflows, and optimization of resource allocation.`
          },
          {
            id: 'quality-initiatives',
            title: 'Quality Initiatives',
            content: `Our quality management system achieved ISO 9001:2015 certification, demonstrating our commitment 
            to quality excellence. Customer complaints decreased by 40%, while product quality ratings improved to 99.2%. 
            These achievements reflect our systematic approach to quality management and continuous improvement.`
          }
        ]
      },
      {
        id: 'strategic-initiatives',
        title: 'Strategic Initiatives',
        content: `2025 was a pivotal year for strategic initiatives that will shape our future growth trajectory. 
        We launched several key projects including digital transformation, sustainability programs, and innovation labs. 
        These initiatives are designed to enhance our competitive position and create long-term value for stakeholders.`,
        subsections: [
          {
            id: 'digital-transformation',
            title: 'Digital Transformation',
            content: `Our digital transformation journey accelerated in 2025 with the implementation of cloud-based 
            infrastructure, AI-powered analytics, and mobile-first applications. These investments improved operational 
            efficiency by 35% and enhanced customer experience across all touchpoints.`
          },
          {
            id: 'sustainability',
            title: 'Sustainability Programs',
            content: `We exceeded our sustainability targets by reducing carbon emissions by 25%, implementing circular 
            economy principles, and achieving zero waste to landfill status. These achievements demonstrate our 
            commitment to environmental stewardship and corporate social responsibility.`
          }
        ]
      }
    ]
  };

  constructor(private pdfService: PdfExportService) {}

  async exportDocument() {
    this.isExporting = true;

    try {
      await this.pdfService.exportHtml(this.documentContent.nativeElement, {
        filename: `${this.document.title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        pageSize: 'A4',
        orientation: 'portrait',
        metadata: {
          title: this.document.title,
          author: this.document.author,
          subject: 'Annual Business Report',
          keywords: 'business, report, analysis, performance, strategy'
        }
      });

      console.log('Multi-page document exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export document. Please try again.');
    } finally {
      this.isExporting = false;
    }
  }

  generateTableOfContents(): any[] {
    const toc: any[] = [];
    
    this.document.sections.forEach((section, index) => {
      toc.push({
        title: section.title,
        level: 1,
        pageNumber: index + 2 // Assuming each section starts on a new page
      });
      
      if (section.subsections) {
        section.subsections.forEach((subsection, subIndex) => {
          toc.push({
            title: subsection.title,
            level: 2,
            pageNumber: index + 2 + subIndex
          });
        });
      }
    });
    
    return toc;
  }
}
```

## 🎨 Template Structure

```html
<div class="container">
  <div class="controls">
    <h1>📄 Multi-page Document Generator</h1>
    <button 
      (click)="exportDocument()" 
      [disabled]="isExporting"
      class="export-btn">
      {{ isExporting ? 'Generating PDF...' : '📑 Export Multi-page PDF' }}
    </button>
  </div>

  <div #documentContent class="document-container">
    <!-- Cover Page -->
    <div class="cover-page pdf-section" style="page-break-after: always;">
      <div class="cover-content">
        <div class="company-logo">
          <div class="logo-placeholder">🏢</div>
        </div>
        <h1 class="document-title">{{ document.title }}</h1>
        <h2 class="document-subtitle">{{ document.subtitle }}</h2>
        <div class="document-meta">
          <p><strong>Prepared by:</strong> {{ document.author }}</p>
          <p><strong>Date:</strong> {{ document.date | date:'fullDate' }}</p>
          <p><strong>Version:</strong> 1.0</p>
        </div>
        <div class="cover-footer">
          <p>Confidential Business Document</p>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="toc-page pdf-section" style="page-break-after: always;">
      <h1 class="page-title">Table of Contents</h1>
      <div class="toc-content">
        <div class="toc-item" *ngFor="let item of generateTableOfContents()">
          <div class="toc-entry" [class.level-2]="item.level === 2">
            <span class="toc-title">{{ item.title }}</span>
            <span class="toc-dots"></span>
            <span class="toc-page">{{ item.pageNumber }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Sections -->
    <div *ngFor="let section of document.sections; let sectionIndex = index" 
         class="document-section pdf-section" 
         style="page-break-before: always;">
      
      <!-- Section Header -->
      <header class="section-header">
        <h1 class="section-title">
          {{ sectionIndex + 1 }}. {{ section.title }}
        </h1>
      </header>

      <!-- Section Content -->
      <div class="section-content content-block" style="page-break-inside: avoid;">
        <p class="section-text">{{ section.content }}</p>
      </div>

      <!-- Subsections -->
      <div *ngFor="let subsection of section.subsections; let subIndex = index" 
           class="subsection content-block" 
           style="page-break-inside: avoid; page-break-before: auto;">
        
        <h2 class="subsection-title">
          {{ sectionIndex + 1 }}.{{ subIndex + 1 }} {{ subsection.title }}
        </h2>
        
        <div class="subsection-content">
          <p class="subsection-text" [innerHTML]="subsection.content"></p>
        </div>

        <!-- Sample Data Table for Financial Section -->
        <div *ngIf="section.id === 'financial-performance' && subIndex === 0" 
             class="data-table-container" 
             style="page-break-inside: avoid;">
          <h3>Quarterly Revenue Breakdown</h3>
          <table class="financial-table">
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Revenue ($M)</th>
                <th>Growth (%)</th>
                <th>Margin (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1 2025</td>
                <td>28.5</td>
                <td>22.1</td>
                <td>16.8</td>
              </tr>
              <tr>
                <td>Q2 2025</td>
                <td>30.2</td>
                <td>24.3</td>
                <td>17.2</td>
              </tr>
              <tr>
                <td>Q3 2025</td>
                <td>33.8</td>
                <td>26.7</td>
                <td>18.1</td>
              </tr>
              <tr>
                <td>Q4 2025</td>
                <td>32.5</td>
                <td>25.9</td>
                <td>18.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sample Chart for Market Analysis -->
        <div *ngIf="section.id === 'market-analysis' && subIndex === 0" 
             class="chart-container" 
             style="page-break-inside: avoid;">
          <h3>Market Share Analysis</h3>
          <div class="chart-placeholder">
            <div class="chart-bar" style="height: 60%; background: #3498db;">
              <span>Our Company (35%)</span>
            </div>
            <div class="chart-bar" style="height: 40%; background: #2ecc71;">
              <span>Competitor A (25%)</span>
            </div>
            <div class="chart-bar" style="height: 30%; background: #f39c12;">
              <span>Competitor B (20%)</span>
            </div>
            <div class="chart-bar" style="height: 25%; background: #e74c3c;">
              <span>Others (20%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appendix -->
    <div class="appendix-section pdf-section" style="page-break-before: always;">
      <h1 class="page-title">Appendix</h1>
      
      <div class="appendix-content">
        <h2>A. Financial Statements</h2>
        <p>Detailed financial statements and supporting documentation are available upon request.</p>
        
        <h2>B. Market Research Data</h2>
        <p>Comprehensive market research data and analysis methodologies used in this report.</p>
        
        <h2>C. Glossary of Terms</h2>
        <div class="glossary">
          <div class="glossary-item">
            <strong>EBITDA:</strong> Earnings Before Interest, Taxes, Depreciation, and Amortization
          </div>
          <div class="glossary-item">
            <strong>KPI:</strong> Key Performance Indicator
          </div>
          <div class="glossary-item">
            <strong>ROI:</strong> Return on Investment
          </div>
        </div>
      </div>
    </div>

    <!-- Document Footer -->
    <footer class="document-footer">
      <div class="footer-content">
        <p>© 2025 Company Name. All rights reserved. | Confidential Business Document</p>
        <p>Generated on {{ document.date | date:'medium' }}</p>
      </div>
    </footer>
  </div>
</div>
```

## 🎨 Professional Document Styling

```css
.document-container {
  background: white;
  font-family: 'Times New Roman', serif;
  line-height: 1.6;
  color: #333;
  max-width: 210mm; /* A4 width */
  margin: 0 auto;
}

/* Cover Page */
.cover-page {
  min-height: 297mm; /* A4 height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.company-logo {
  margin-bottom: 40px;
}

.logo-placeholder {
  font-size: 80px;
  opacity: 0.8;
}

.document-title {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.document-subtitle {
  font-size: 24px;
  font-weight: 300;
  margin: 0 0 40px 0;
  opacity: 0.9;
}

.document-meta {
  background: rgba(255,255,255,0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
}

.document-meta p {
  margin: 5px 0;
  font-size: 16px;
}

.cover-footer {
  margin-top: auto;
  font-size: 14px;
  opacity: 0.8;
}

/* Table of Contents */
.toc-page {
  padding: 40mm 30mm;
  min-height: 257mm; /* A4 height minus padding */
}

.page-title {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
}

.toc-content {
  margin-top: 20px;
}

.toc-entry {
  display: flex;
  align-items: baseline;
  margin-bottom: 12px;
  font-size: 16px;
}

.toc-entry.level-2 {
  margin-left: 20px;
  font-size: 14px;
  color: #666;
}

.toc-title {
  flex-shrink: 0;
}

.toc-dots {
  flex-grow: 1;
  border-bottom: 1px dotted #ccc;
  margin: 0 10px;
  height: 1px;
}

.toc-page {
  flex-shrink: 0;
  font-weight: bold;
}

/* Document Sections */
.document-section {
  padding: 30mm 25mm 20mm 25mm;
  min-height: 267mm; /* A4 height minus padding */
}

.section-header {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.section-content {
  margin-bottom: 30px;
}

.section-text {
  font-size: 16px;
  text-align: justify;
  margin-bottom: 20px;
}

/* Subsections */
.subsection {
  margin-bottom: 25px;
}

.subsection-title {
  font-size: 20px;
  color: #34495e;
  margin: 20px 0 15px 0;
}

.subsection-text {
  font-size: 14px;
  text-align: justify;
  white-space: pre-line;
}

/* Tables */
.data-table-container {
  margin: 20px 0;
}

.data-table-container h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.financial-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 14px;
}

.financial-table th,
.financial-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.financial-table th {
  background-color: #34495e;
  color: white;
  font-weight: bold;
}

.financial-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* Charts */
.chart-container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.chart-container h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

.chart-placeholder {
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 200px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

.chart-bar {
  width: 60px;
  display: flex;
  align-items: end;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 10px 5px;
  border-radius: 4px 4px 0 0;
}

/* Appendix */
.appendix-section {
  padding: 30mm 25mm;
}

.appendix-content h2 {
  color: #2c3e50;
  font-size: 18px;
  margin: 25px 0 15px 0;
}

.glossary {
  margin-top: 15px;
}

.glossary-item {
  margin-bottom: 10px;
  padding: 8px;
  background: #f8f9fa;
  border-left: 4px solid #3498db;
}

/* Footer */
.document-footer {
  margin-top: 40px;
  padding: 20px 25mm;
  border-top: 2px solid #eee;
  text-align: center;
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

/* Page Break Utilities */
.pdf-section {
  page-break-inside: avoid;
}

.content-block {
  page-break-inside: avoid;
}

/* Print Styles */
@media print {
  .controls {
    display: none;
  }
  
  .document-container {
    box-shadow: none;
    margin: 0;
  }
}
```

## 📋 Page Breaking Best Practices

### CSS Page-Break Properties

```css
/* Force page break before element */
.new-chapter {
  page-break-before: always;
}

/* Avoid breaking inside element */
.keep-together {
  page-break-inside: avoid;
}

/* Avoid break after element */
.section-header {
  page-break-after: avoid;
}

/* Allow automatic breaking */
.flexible-content {
  page-break-before: auto;
  page-break-after: auto;
}
```

### Content Structure Guidelines

1. **Use semantic sections** with appropriate CSS classes
2. **Group related content** in containers with `page-break-inside: avoid`
3. **Add strategic break points** with `page-break-before: always`
4. **Keep headers with content** using `page-break-after: avoid`

## 🎯 Key Features

1. **Professional Layout**: Cover page, TOC, sections, appendix
2. **Smart Breaking**: Content preserved across page boundaries
3. **Consistent Styling**: Professional typography and spacing
4. **Structured Content**: Hierarchical organization
5. **Rich Metadata**: Complete PDF metadata for organization

## 🔄 Next Steps

- [Advanced Configuration](../advanced-config/) - Custom PDF settings
- [Styled Components](../styled-components/) - Advanced styling
- [Integration Examples](../integration/) - Real-world scenarios

## 📞 Support

Need help with multi-page documents? Contact [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)