# rm-ng-pdf-export

[![npm version](https://badge.fury.io/js/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/rm-ng-pdf-export)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Angular Support](https://img.shields.io/badge/angular-14--20-brightgreen)
![Tree-shakable](https://img.shields.io/badge/tree--shaking-supported-success)
![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)

---

`@codewithrajat/rm-ng-pdf-export` is a lightweight, flexible, and tree-shakable Angular library for generating and exporting high-quality PDFs from HTML content. Built with modern Angular (v14–v20), it seamlessly integrates with your application using services, directives, and components.

---

### ✅ Solves

- Client-side PDF generation without backend dependency
- Export HTML content (tables, charts, dynamic data) to PDF
- Highly customizable output (metadata, layout, styles)

### 👤 Ideal For

- Angular developers building reporting tools, dashboards, or invoice systems
- Applications requiring PDF export from the browser
- Teams using standalone components or Angular libraries

---

## 🚀 Features

- ✅ HTML to PDF rendering using `html2canvas` and `pdfMake`
- ✅ Standalone and module-based Angular support
- ✅ Custom filename, page size, orientation, metadata
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
          filename: 'export.pdf',
          orientation: 'portrait',
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
          filename: 'report.pdf',
          orientation: 'landscape',
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
    this.pdfService.exportHtml(this.contentRef.nativeElement, { filename: 'one.pdf' });
  }
```

### ✅ Declarative Directive

```html
  <div #pdfContent>Invoice body here</div>
  
  <button
    rmPdfExport
    [pdfConfig]="{ filename: 'invoice.pdf' }"
    [exportTarget]="pdfContent">
    Export as PDF
  </button>
```

---

⚙️ Advanced Configuration

| Option        | Description                                     |
|---------------|-------------------------------------------------|
| filename      | Custom filename for the download                |
| orientation   | 'portrait' or 'landscape'                       |
| pageSize      | 'A4', 'LETTER', 'LEGAL', etc.                   |
| metadata.title| Sets the PDF document title                     |
| metadata.author| Sets author info                                |
| openInNewTab  | true opens PDF in a new tab instead of download |

Example:

```ts
  {
    filename: 'summary.pdf',
    orientation: 'landscape',
    metadata: {
      title: 'Sales Summary',
      author: 'Analytics Team'
    },
    openInNewTab: true
  }
```

---

📘 API Reference

**PdfExportService**

```ts
    exportHtml(element: HTMLElement, overrideConfig?: PdfExportConfig): Promise<void>;
```

**PDF_EXPORT_CONFIG**

An `InjectionToken<PdfExportConfig>` for global config defaults.

---

🌳 Tree-Shaking and Optimization

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
