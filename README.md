# rm-ng-pdf-export

[![npm version](https://badge.fury.io/js/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/rm-ng-pdf-export)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Angular Support](https://img.shields.io/badge/angular-14--20-brightgreen)
![Tree-shakable](https://img.shields.io/badge/tree--shaking-supported-success)
![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)

---

`@codewithrajat/rm-ng-pdf-export` is a lightweight, flexible, and tree-shakable Angular library for generating and exporting high-quality PDFs from HTML content with **smart page breaking**. Built with modern Angular (v14–v20), it seamlessly integrates with your application using services, directives, and components.

---

### ✅ Solves

- Client-side PDF generation without backend dependency
- Export HTML content (tables, charts, dynamic data) to PDF with professional page breaks
- Highly customizable output (metadata, layout, styles, page sizing)
- **Smart content preservation** - prevents cutting cards, images, and sections mid-way

### 👤 Ideal For

- Angular developers building reporting tools, dashboards, or invoice systems
- Applications requiring professional PDF export with clean page transitions
- Teams using standalone components or Angular libraries

---

## 🚀 Features

- ✅ HTML to PDF rendering using `html2canvas` and `pdf-lib`
- ✅ **Smart Page Breaking**: Intelligent content boundary detection for professional page transitions
- ✅ **CSS Page-Break Support**: Respects `page-break-before`, `page-break-after`, and `page-break-inside` properties
- ✅ **Configurable Page Sizes**: A3, A4, A5, Letter, Legal, Tabloid, Ledger, Executive, B4, B5
- ✅ **Portrait and Landscape Orientations**: Dynamic orientation support
- ✅ **Multi-page PDF Generation**: Automatic page breaks for large content
- ✅ **Content Preservation**: Cards, sections, and visual elements remain intact across pages
- ✅ Standalone and module-based Angular support
- ✅ Custom filename, metadata, and export options
- ✅ Tree-shakable and side-effect-free
- ✅ Supports Angular v14 to v20 (Ivy and standalone)
- ✅ API via Service, Directive (`[rmPdfExport]`), or Component (`<rm-pdf-export>`)
- ✅ Download or open in new tab
- ✅ Optional support for charts, tables, and images
- ✅ Platform-safe (browser check using `isPlatformBrowser`)
- ✅ Peer dependency friendly and compatible with lazy loading

---

## 🖼️ Live Demo 

> [See the implementation here](https://stackblitz.com/edit/stackblitz-starters-5rt3lrkz)

---

## 📦 Installation Instructions

Install via npm:

```bash
  npm install @codewithrajat/rm-ng-pdf-export
```

📋 Peer Dependencies

| Library         | Version          |
|-----------------|------------------|
| @angular/core   | ^14.0.0–^20.0.0  |
| pdf-lib         | ^1.17.1          |
| html2canvas     | ^1.4.1           |

Install missing dependencies if needed:

```bash
  npm install pdf-lib html2canvas
```

---

🧭 Compatibility Matrix

| Angular Version | Compatible | Standalone Support  |
|-----------------|------------|--------------------|
| 14              | ✅         | ❌ (partial)        |
| 15              | ✅         | ✅                  |
| 16              | ✅         | ✅                  |
| 17              | ✅         | ✅                  |
| 18–20           | ✅         | ✅                  |

The library follows the Angular Package Format (APF) and supports both ViewEngine and Ivy compilation.

---

🧪 Usage

### ✅ Basic Setup

Import providers in `main.ts` :

```ts
  // in case of adding in root
  import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from './app/app.component';
  import { PdfExportService, PDF_EXPORT_CONFIG } from '@codewithrajat/rm-ng-pdf-export';
  
  bootstrapApplication(AppComponent, {
    providers: [
      PdfExportService,
      {
        provide: PDF_EXPORT_CONFIG,
        useValue: {
          pageSize: 'A4',           // 'A3', 'A4', 'A5', 'Letter', 'Legal', etc.
          orientation: 'portrait',  // 'portrait' or 'landscape'
          filename: 'export.pdf',
          openInNewTab: false
        }
      }
    ]
  });
```

Import providers in `component.ts` (if using standalone and do not want to import globally like main.ts):

```ts
  // in case of adding in component 
  import { Component, ElementRef, ViewChild } from '@angular/core';
  import { PdfExportService, PDF_EXPORT_CONFIG } from '@codewithrajat/rm-ng-pdf-export';
  
  @Component({
    selector: 'app-report',
    standalone: true,
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    providers: [
      PdfExportService,
      {
        provide: PDF_EXPORT_CONFIG,
        useValue: {
          pageSize: 'Letter',       // Configurable page size
          orientation: 'landscape', // Configurable orientation
          filename: 'report.pdf',
          openInNewTab: true
        }
      }
    ]
  })
  export class ReportComponent {
    constructor(private pdfExport: PdfExportService) {}
    
    @ViewChild('pdfContent') contentRef!: ElementRef;
  
    export() {
      this.pdfExport.exportHtml(this.contentRef.nativeElement, { filename: 'one.pdf' });
    }
  }
```
Use in component:

```html
  <div #pdfContent>
    <h1>Invoice</h1>
    <p>Product list, totals, etc.</p>
  </div>
  
  <button (click)="export()">Export PDF</button>
```

```ts
  @ViewChild('pdfContent') contentRef!: ElementRef;
  
  constructor(private pdfService: PdfExportService) {}
  
  export() {
    this.pdfService.exportHtml(this.contentRef.nativeElement, { 
      pageSize: 'Letter',
      orientation: 'landscape',
      filename: 'invoice.pdf' 
    });
  }
```

### ✅ Declarative Directive

```html
  <div #pdfContent>Invoice body here</div>
  
  <!-- Using full configuration object -->
  <button
    rmPdfExport
    [pdfConfig]="{ 
      pageSize: 'A4', 
      orientation: 'portrait', 
      filename: 'invoice.pdf' 
    }"
    [exportTarget]="pdfContent">
    Export as PDF
  </button>
  
  <!-- Using individual properties -->
  <button
    rmPdfExport
    [pageSize]="'Letter'"
    [orientation]="'landscape'"
    [filename]="'invoice.pdf'"
    [exportTarget]="pdfContent">
    Export as PDF
  </button>
```

### ✅ Component API

```html
  <!-- Using individual properties -->
  <rm-pdf-export 
    [pageSize]="'A3'" 
    [orientation]="'landscape'"
    [filename]="'large-report.pdf'"
    [openInNewTab]="true">
    <div #pdfContent>Large report content here</div>
  </rm-pdf-export>
  
  <!-- Using configuration object -->
  <rm-pdf-export [pdfConfig]="exportConfig">
    <div #pdfContent>Content to export</div>
  </rm-pdf-export>
```

---

⚙️ Advanced Configuration

| Option        | Type          | Description                                     | Default     |
|---------------|---------------|-------------------------------------------------|-------------|
| pageSize      | PageSize      | 'A3', 'A4', 'A5', 'Letter', 'Legal', 'Tabloid', 'Ledger', 'Executive', 'B4', 'B5' | 'A4' |
| orientation   | PageOrientation | 'portrait' or 'landscape'                     | 'portrait'  |
| filename      | string        | Custom filename for the download                | 'document.pdf' |
| metadata.title| string        | Sets the PDF document title                     | undefined   |
| metadata.author| string       | Sets author info                                | undefined   |
| metadata.subject| string      | Sets document subject                           | undefined   |
| openInNewTab  | boolean       | true opens PDF in a new tab instead of download | false      |

### Available Page Sizes

| Page Size | Portrait Dimensions | Landscape Dimensions | Common Use |
|-----------|-------------------|---------------------|------------|
| A3        | 297 × 420 mm      | 420 × 297 mm        | Large format documents, posters |
| A4        | 210 × 297 mm      | 297 × 210 mm        | Standard international documents |
| A5        | 148 × 210 mm      | 210 × 148 mm        | Small books, flyers |
| Letter    | 8.5 × 11 in       | 11 × 8.5 in         | US standard documents |
| Legal     | 8.5 × 14 in       | 14 × 8.5 in         | US legal documents |
| Tabloid   | 11 × 17 in        | 17 × 11 in          | Large prints, newspapers |
| Ledger    | 17 × 11 in        | 11 × 17 in          | Spreadsheets, accounting |
| Executive | 7.25 × 10.5 in    | 10.5 × 7.25 in      | Premium business documents |
| B4        | 250 × 353 mm      | 353 × 250 mm        | Large format |
| B5        | 176 × 250 mm      | 250 × 176 mm        | Books, journals |

Example:

```ts
  // Service usage with new options
  await this.pdfService.exportHtml(element, {
    pageSize: 'Letter',
    orientation: 'landscape',
    filename: 'sales-summary.pdf',
    metadata: {
      title: 'Q3 Sales Summary',
      author: 'Analytics Team',
      subject: 'Quarterly Report'
    },
    openInNewTab: true
  });
  
  // Get available page sizes programmatically
  const availableSizes = this.pdfService.getAvailablePageSizes();
  console.log(availableSizes); // ['A3', 'A4', 'A5', 'Letter', 'Legal', ...]
```

---

📘 API Reference

**PdfExportService**

```ts
    exportHtml(element: HTMLElement, overrideConfig?: PdfExportConfig): Promise<void>;
    getAvailablePageSizes(): string[]; // Returns array of supported page sizes
```

**PdfExportConfig Interface**

```ts
interface PdfExportConfig {
  pageSize?: PageSize;           // 'A3' | 'A4' | 'A5' | 'Letter' | 'Legal' | etc.
  orientation?: PageOrientation; // 'portrait' | 'landscape'
  filename?: string;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
  };
  openInNewTab?: boolean;
}
```

**Type Definitions**

```ts
type PageSize = 'A3' | 'A4' | 'A5' | 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'Executive' | 'B4' | 'B5';
type PageOrientation = 'portrait' | 'landscape';
```

**PDF_EXPORT_CONFIG**

An `InjectionToken<PdfExportConfig>` for global config defaults.

---

## 🎯 Smart Page Breaking

The library includes intelligent page breaking that prevents content from being cut in the middle of important visual elements. This ensures professional-looking PDFs with clean page transitions.

### ✨ Features

- **Content Boundary Detection**: Automatically identifies sections, cards, and content blocks
- **CSS Page-Break Support**: Respects CSS `page-break-before`, `page-break-after`, and `page-break-inside` properties
- **Visual Element Preservation**: Cards, images, and styled sections remain intact across pages
- **Priority-Based Breaking**: Intelligent selection of optimal break points based on content importance

### 🎨 CSS Page-Break Properties

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

### 📝 HTML Structure for Optimal Breaking

Structure your HTML with semantic classes for best results:

```html
<div class="pdf-content">
  <!-- Header section - keeps together -->
  <header class="pdf-section" style="page-break-inside: avoid;">
    <h1>Document Title</h1>
    <p>Subtitle and metadata</p>
  </header>

  <!-- Feature cards - won't break in middle -->
  <section class="pdf-section" style="page-break-before: auto;">
    <div class="feature-card" style="page-break-inside: avoid;">
      <h3>Feature 1</h3>
      <p>Feature description...</p>
    </div>
    
    <div class="feature-card" style="page-break-inside: avoid;">
      <h3>Feature 2</h3>
      <p>Feature description...</p>
    </div>
  </section>

  <!-- Content blocks - smart boundaries -->
  <div class="content-block" style="page-break-inside: avoid; page-break-before: auto;">
    <h2>Large Content Section</h2>
    <p>This content will break cleanly at section boundaries...</p>
  </div>

  <!-- Footer - keeps together -->
  <footer class="pdf-section" style="page-break-inside: avoid;">
    <p>Footer content</p>
  </footer>
</div>
```

### 🔧 Supported CSS Classes

The smart page breaking algorithm recognizes these classes for optimal break point detection:

| Class | Purpose | Break Behavior |
|-------|---------|----------------|
| `.pdf-section` | Major content sections | Prefers breaks before/after |
| `.content-block` | Large content areas | Avoids breaking inside |
| `.blog-card` | Article/blog post cards | Keeps intact on single page |
| `.feature-card` | Feature/service cards | Prevents mid-card breaks |
| `.stat-card` | Statistics/metric cards | Maintains visual integrity |

### 📊 Break Point Priority System

The algorithm uses a priority system to choose optimal break points:

| Priority | Trigger | Use Case |
|----------|---------|----------|
| 10 | Document start/end | Absolute boundaries |
| 9 | `page-break-before: always` | Forced breaks |
| 8 | `page-break-inside: avoid` | Element boundaries |
| 7 | `page-break-before: auto` | Preferred breaks |

### 💡 Best Practices

1. **Use semantic classes** (`.pdf-section`, `.content-block`) for better break detection
2. **Apply `page-break-inside: avoid`** to cards, images, and important visual elements
3. **Group related content** in sections with appropriate CSS classes
4. **Test different page sizes** to ensure content breaks cleanly in all formats
5. **Avoid very tall content blocks** that exceed page height entirely

### 🎯 Example: Professional Document Structure

```html
<div class="document-content">
  <!-- Cover section -->
  <section class="pdf-section cover" style="page-break-inside: avoid; page-break-after: always;">
    <h1>Annual Report 2025</h1>
    <div class="cover-image"></div>
  </section>

  <!-- Executive summary -->
  <section class="pdf-section" style="page-break-before: auto;">
    <h2>Executive Summary</h2>
    <div class="summary-cards">
      <div class="stat-card" style="page-break-inside: avoid;">
        <h3>Revenue Growth</h3>
        <div class="metric">+25%</div>
      </div>
      <div class="stat-card" style="page-break-inside: avoid;">
        <h3>Customer Satisfaction</h3>
        <div class="metric">98%</div>
      </div>
    </div>
  </section>

  <!-- Detailed sections -->
  <div class="content-block" style="page-break-inside: avoid; page-break-before: auto;">
    <h2>Financial Performance</h2>
    <div class="charts-grid">
      <div class="chart-card" style="page-break-inside: avoid;">
        <!-- Chart content -->
      </div>
    </div>
  </div>
</div>
```

---

## 🌳 Tree-Shaking and Optimization

- The library is marked as `sideEffects: false` in `package.json`
- All internal modules and services are tree-shakable
- Lazy-load friendly and safe for modern Angular SSR setups
- Avoids loading `pdf-lib` or `html2canvas` until explicitly needed

---

⚠️ Known Issues & Limitations

- `html2canvas` does not support modern CSS functions like `oklch()` or `color()`
- Use PostCSS to convert or sanitize styles
- Large DOMs may consume high memory for rendering
- Dynamic SVG/Canvas may need rasterization before export
- **Smart Page Breaking**: Content automatically breaks at intelligent boundaries; very tall elements that exceed page height may still require manual adjustment
- **CSS Compatibility**: Page-break properties work best with block-level elements; inline elements may not be detected for break point analysis
- **Complex Layouts**: Grid and flexbox layouts with intricate positioning may need additional CSS classes for optimal break detection

---

🛠 Development Setup (for contributors)

```bash
  git clone https://github.com/malikrajat/@codewithrajat/rm-ng-pdf-export.git
  cd rm-ng-pdf-export
  npm install
```

**Scripts**

| Command        | Description                          |
|----------------|--------------------------------------|
| npm run build  | Builds the library using ng-packagr  |
| npm run test   | Runs unit tests with Jest            |
| npm run lint   | Lints the codebase                   |

**Folder Structure**

```
  projects/
    rm-ng-pdf-export/
      src/
        lib/
          directives/
          services/
          tokens/
          components/
        public-api.ts
      ng-package.json
```

---

📦 Release Notes / Changelog

See `CHANGELOG.md` for detailed version history.

---

📄 License

This project is licensed under the MIT License.

---

👤 Author / Maintainer Info

Rajat Malik
Frontend Developer | Open Source Contributor
<p>
  <a href="mailto:mr.rajatmalik@gmail.com">📧 Email</a><br>
  <a href="https://rajatmalik.dev" target="_blank">🌐 Website</a><br>
  <a href="mailto:mr.rajatmalik@gmail.com?subject=Hello%20Rajat&body=I%20want%20to%20connect%20with%20you.">🤝 Contact</a>
</p>

---

🙏 Credits & Acknowledgements

- pdf-lib — Low-level PDF generation
- html2canvas — DOM to Canvas rendering
- Angular team for powerful tooling and open source support

---

Built with ❤️ for the Angular community.
