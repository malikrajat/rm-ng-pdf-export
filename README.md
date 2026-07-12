# rm-ng-pdf-export

<p align="left">
  <img src="https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg" alt="npm version">
  <img src="https://img.shields.io/badge/Stability-production--ready-success" alt="Production ready">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
  <img src="https://img.shields.io/badge/Angular-14%20to%2022-blue" alt="Angular support range">
  <img src="https://img.shields.io/badge/Ivy-compatible-success" alt="Ivy compatible">
  <img src="https://img.shields.io/badge/Standalone-supported-success" alt="Standalone API">
  <img src="https://img.shields.io/badge/AOT-compatible-success" alt="AOT compatible">
  <img src="https://img.shields.io/badge/SSR-compatible-success" alt="SSR compatible">
  <img src="https://img.shields.io/badge/TypeScript-strict-success" alt="Strict TS">
  <img src="https://img.shields.io/badge/tree--shaking-supported-success" alt="Tree-shakable">
  <img src="https://img.shields.io/badge/Side%20Effects-none-success" alt="No side effects">
  <img src="https://img.shields.io/badge/Linting-enabled-success" alt="Linting">
  <img src="https://img.shields.io/badge/Tests-covered-success" alt="Tests">
  <img src="https://img.shields.io/badge/Coverage-90%25-success" alt="Coverage">
  <img src="https://img.shields.io/badge/A11y-WCAG%202.1-success" alt="Accessibility compliant">
  <img src="https://img.shields.io/badge/API-documented-blue" alt="API docs">
  <img src="https://img.shields.io/badge/Examples-available-success" alt="Examples">
  <img src="https://img.shields.io/badge/Dependencies-none-success" alt="No dependencies">
  <img src="https://img.shields.io/npm/dt/@codewithrajat/rm-ng-pdf-export" alt="total downloads">
  <img src="https://img.shields.io/npm/last-update/@codewithrajat/rm-ng-pdf-export" alt="Last update">
  <img src="https://img.shields.io/badge/Maintained-yes-success" alt="Maintained">
  <img src="https://img.shields.io/badge/SemVer-compliant-blue" alt="SemVer">
  <img src="https://img.shields.io/github/issues/malikrajat/rm-ng-pdf-export" alt="Open issues">
  <img src="https://img.shields.io/github/stars/malikrajat/rm-ng-pdf-export" alt="GitHub stars">
</p>


## See It In Action

<div align="center">

  <img src="https://github.com/malikrajat/rm-ng-pdf-export/blob/master/assets/export-pdf.gif" alt="rm-ng-pdf-export Demo" width="800"/>

  <p><em>Export any HTML element to PDF with customizable settings!</em></p>

</div>

---

`rm-ng-pdf-export` is a lightweight, flexible, and tree-shakable Angular library for generating and exporting **ultra-high-quality PDFs** from HTML content with **smart page breaking** and **crystal-clear rendering**. Built with modern Angular, it seamlessly integrates with your application using services, directives, and components.

---

> **Note:**
> 
>This library is intended for generating **non-editable, read-only PDFs**.
>
> If you need to create structured, searchable, and editable PDFs, please use our other library: **[@codewithrajat/rm-ng-structure-pdf](https://www.npmjs.com/package/@codewithrajat/rm-ng-structure-pdf)**.
>

---

## Table of Contents

- [Why This Library](./docs/WHY_THIS_LIBRARY.md)
- [Installation](./docs/INSTALLATION.md)
- [Quick Start / Usage](./docs/USAGE.md)
- [API Reference](./docs/API.md)
- [Advanced Configuration](./docs/ADVANCED_CONFIGURATION.md)
- [Peer Dependencies](./docs/PEER_DEPENDENCIES.md)
- [Best Practices](./docs/BEST_PRACTICES.md)
- [Performance Optimization](./docs/OPTIMIZATION.md)
- [Browser Support](./docs/BROWSER_SUPPORT.md)
- [Versioning & Angular Compatibility](./docs/VERSION_COMPATIBILITY.md)
- [Breaking Changes](./docs/BREAKING_CHANGES.md)
- [FAQ](#faq)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [Roadmap](./docs/ROADMAP.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
- [Examples](./examples/README.md)
- [Usage Examples](./docs/USAGE.md)

---

## Live Demo & Playground

<div align="center">

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://stackblitz.com/edit/stackblitz-starters-5rt3lrkz" target="_blank">
        <img src="https://img.shields.io/badge/StackBlitz_Demo-1976D2?style=for-the-badge&logo=stackblitz&logoColor=white" alt="StackBlitz Demo"/>
      </a>
      <br/><br/>
      <sub><b>Interactive Playground</b></sub><br/>
      <sub>Try all features live in your browser</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-ng-pdf-export/tree/master/examples" target="_blank">
        <img src="https://img.shields.io/badge/Code_Examples-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Examples"/>
      </a>
      <br/><br/>
      <sub><b>Complete Examples</b></sub><br/>
      <sub>Copy-paste ready code samples</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export" target="_blank">
        <img src="https://img.shields.io/badge/npm_Package-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm Package"/>
      </a>
      <br/><br/>
      <sub><b>npm Registry</b></sub><br/>
      <sub>Install and view package details</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-ng-pdf-export" target="_blank">
        <img src="https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository"/>
      </a>
      <br/><br/>
      <sub><b>Source Code</b></sub><br/>
      <sub>Star, fork, and contribute</sub>
    </td>
  </tr>
</table>

</div>

---

## Quick Start

### Installation

```bash
npm install @codewithrajat/rm-ng-pdf-export
```

### Basic Usage

#### Set up Root Config

```typescript
import { PDF_EXPORT_CONFIG, PdfExportConfig } from '@codewithrajat/rm-ng-pdf-export';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
      {
      provide: PDF_EXPORT_CONFIG,
      useValue: {
        pageSize: 'A4',
        orientation: 'portrait',
        filename: 'default.pdf',
        openInNewTab: false,
      } as PdfExportConfig,
    }
  ]
};

```

#### main.ts Configuration

```typescript
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-example',
  template: `
    <div #content>
      <h1>Hello PDF!</h1>
      <p>This content will be exported to PDF</p>
    </div>
    <button (click)="exportPdf()">Export PDF</button>
  `
})
export class ExampleComponent {
  private readonly pdfService: PdfExportService  = inject(PdfExportService)
  content = viewChild<ElementRef<HTMLDivElement>>('content');

  exportPdf() {
    const contentEl = this.content()?.nativeElement;
    if (!contentEl) {
      return;
    }
    this.pdfService.exportHtml(contentEl, {
      filename: 'my-document.pdf',
      pageSize: 'A4',
      orientation: 'portrait'
    });
  }
}
```

---


## Features

- **Ultra-High-Resolution Output**: 3x html2canvas scaling + 4x canvas resolution
- **Smart Page Breaking**: Intelligent content boundary detection
- **Multiple Page Sizes**: A3, A4, A5, Letter, Legal, and more
- **Portrait/Landscape**: Dynamic orientation support
- **Angular 14-21 Support**: Compatible with modern Angular versions
- **Tree-shakable**: Optimized bundle size
- **TypeScript**: Full type safety
- **Multiple APIs**: Service, Directive, and Component approaches

---

## Live Examples

Explore our comprehensive examples to see the library in action:

- [**Basic Usage**](./examples/basic-usage/README.md) - Simple PDF export
- [**Invoice Generator**](./examples/invoice-generator/README.md) - Professional invoice template
- [**Dashboard Export**](./examples/dashboard-export/README.md) - Charts and data visualization
- [**Certificate Generator**](./examples/certificate-generator/README.md) - Interactive certificate creator
- [**Multi-page Documents**](./examples/multi-page/README.md) - Large content with page breaks
- [**Advanced Usage**](./examples/advanced-usage/README.md) - Batch export and custom configuration
- [**Best Practices**](./examples/best-practices/README.md) - Error handling and performance

[**View All Examples →**](./examples/README.md)

---

## Installation & Setup

For detailed installation instructions, see our [Installation Guide](./docs/INSTALLATION.md).

---

## Usage

For comprehensive usage examples and API documentation, see our [Usage Guide](./docs/USAGE.md).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history and updates.

---

### Latest Release

Check the [releases page](https://github.com/malikrajat/rm-ng-pdf-export/releases) for the most recent version and updates.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use this library freely in commercial and personal projects.


### MIT License Summary

**You can:**
- Use commercially
- Modify the code
- Distribute
- Use privately

**You must:**
- Include the license and copyright notice

**You cannot:**
- Hold the author liable

---

## FAQ

**Q: What is rm-ng-pdf-export?**

A: `rm-ng-pdf-export` is an Angular library that converts rendered HTML content into high-quality, non-editable PDF files using image-based rendering and smart page breaking.

**Q: Which Angular versions are supported?**

A: The library supports modern Angular versions, including Angular 14 through 22, with Ivy, AOT, SSR, and standalone-compatible APIs.

**Q: Is the generated PDF editable or searchable?**

A: No. This library creates image-based PDFs, so the output is read-only and non-editable. Use `@codewithrajat/rm-ng-structure-pdf` if you need structured, searchable, or editable PDFs.

**Q: Can I export multiple pages?**

A: Yes. The library supports multi-page PDF generation based on the target page size, orientation, margins, and content height.

**Q: Can I customize page size and orientation?**

A: Yes. You can choose common page sizes such as A3, A4, A5, Letter, and Legal, and switch between portrait and landscape orientations.

**Q: Does it work with images, charts, and canvas content?**

A: Yes. Most HTML content can be exported, including images, charts, and canvas-based visualizations. External images must be loaded correctly and follow browser CORS requirements.

**Q: Why are some images or fonts missing in the PDF?**

A: This usually happens when assets are not fully loaded before export or when external resources block browser rendering. Load images before exporting and ensure CORS is configured for remote assets.

**Q: Can I export Angular forms?**

A: Yes. You can export any rendered Angular template, including forms. Make sure the form state is finalized before calling the export method.

**Q: Can I add headers, footers, or page numbers?**

A: Yes, include them as part of the HTML content you export. For repeated headers or footers, create a layout inside the export target.

**Q: How do I handle very large documents?**

A: Large documents can increase export time and PDF size. Use lower scale values, reduce image sizes, split content into sections, or batch export pages when needed.

**Q: Does it work on mobile browsers?**

A: Yes, it works on modern mobile browsers. Performance depends on device memory, content size, and image resolution.

**Q: Can I use this in commercial projects?**

A: Yes. The library is MIT licensed and can be used in personal and commercial projects.


---

## Browser Compatibility

### Supported Browsers

| Browser | Version | Support Level | Notes |
|---------|---------|---------------|-------|
| Chrome | 80+ | Full Support | Recommended browser |
| Firefox | 75+ | Full Support | Works perfectly |
| Safari | 13+ | Full Support | iOS and macOS |
| Edge | 80+ | Full Support | Chromium-based |
| Opera | 67+ | Full Support | Works well |
| Samsung Internet | 12+ | Full Support | Mobile support |

### Mobile Support

- iOS Safari 13+
- Chrome for Android 80+
- Samsung Internet
- All mobile browsers with modern JavaScript support

### Download Behavior by Platform

| Platform | Behavior |
|----------|----------|
| Desktop Chrome/Firefox/Edge | Direct download to Downloads folder |
| Desktop Safari | May prompt for download location |
| iOS Safari | Opens download manager |
| Android Chrome | Downloads to Downloads folder |
| Mobile Safari | Shows share sheet with save option |

### Not Supported

- Internet Explorer (all old versions)
- Very old mobile browsers (pre-2019)

---

## Statistics

[![npm downloads](https://img.shields.io/npm/dt/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)
[![npm version](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)
[![GitHub issues](https://img.shields.io/github/issues/malikrajat/rm-ng-pdf-export.svg)](https://github.com/malikrajat/rm-ng-pdf-export/issues)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-ng-pdf-export.svg?style=social)](https://github.com/malikrajat/rm-ng-pdf-export/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malikrajat/rm-ng-pdf-export/blob/master/LICENSE)

---

## Support This Project

If **rm-ng-pdf-export** has helped you build better Angular applications, please consider:

If this library has saved you development time and helped create amazing image sliders in your projects, **please consider giving it a  star!** 

 **Why star this repo?**
- Help other developers discover this lightweight, optimized solution
- Support continued development and improvements
- Show appreciation for free, quality tools
- Boost visibility in the Angular community
- Increases visibility in the Angular community
- Supports ongoing development and maintenance
- Encourages more open-source contributions
- Helps other developers find quality tools

###  **Want More Quality Libraries?**

This is just one of several useful libraries I've created. **[Explore my other Angular & web development libraries](https://github.com/malikrajat?tab=repositories)** that might solve your next challenge:

-  **Utility libraries** for common development tasks
-  **UI components** for better user experiences  
-  **Performance tools** for optimization
-  **Mobile-friendly solutions** for responsive apps

**Found them helpful?** A star on each repo you find useful helps tremendously! It takes just one click but means the world to open-source maintainers.

[![GitHub](https://img.shields.io/badge/View_All_Repositories-181717?logo=github)](https://github.com/malikrajat?tab=repositories)
[![GitHub followers](https://img.shields.io/github/followers/malikrajat?style=social)](https://github.com/malikrajat)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-ng-pdf-export?style=social)](https://github.com/malikrajat/rm-ng-pdf-export/stargazers)

---

## Support and Community

### Getting Help

Need assistance? We're here to help!

| Support Channel | Link | Best For |
|----------------|------|----------|
| Bug Reports | [Report Bug](https://github.com/malikrajat/rm-ng-pdf-export/issues/new?template=bug_report.md) | Technical issues |
| Feature Requests | [Request Feature](https://github.com/malikrajat/rm-ng-pdf-export/issues/new?template=feature_request.md) | New features |
| Discussions | [Join Discussion](https://github.com/malikrajat/rm-ng-pdf-export/discussions) | General questions |
| Email | [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com?subject=rm-ng-pdf-export%20Support) | Direct support |

### Documentation

- [GitHub Repository](https://github.com/malikrajat/rm-ng-pdf-export)
- [npm Package](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)
- [Live Demo](https://stackblitz.com/edit/stackblitz-starters-5rt3lrkz)
- [Changelog](https://github.com/malikrajat/rm-ng-pdf-export/blob/master/CHANGELOG.md)

### Community

- Star the repository to show support
- Watch for updates and new releases
- Share your use cases and feedback
- Contribute code or documentation

### Stay Updated

- Follow the project on [GitHub](https://github.com/malikrajat/rm-ng-pdf-export)
- Star the repository for updates
- Watch for new releases


---

## Acknowledgements

This library was created to provide a simple, effective solution for PDF export in Angular applications.

Special thanks to:
- **[Angular Team](https://angular.io/)** - Amazing framework and ecosystem
- **[html2canvas](https://html2canvas.hertzen.com/)** - Excellent HTML rendering library
- **[pdf-lib](https://pdf-lib.js.org/)** - Powerful PDF generation library
- **Contributors** - Thank you for making this library better
- **Community** - For feedback and feature requests

---


## Other Libraries

### UI Components

| Library                           | Description                                                              | npm Link                                                                                                        |
|-----------------------------------| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **rm-range-slider**               | Lightweight two-thumb range slider with tooltips and color customization | [![npm](https://img.shields.io/npm/v/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider)       |
| **rm-ng-range-slider**            | Angular-specific version of the dual range slider                        | [![npm](https://img.shields.io/npm/v/rm-ng-range-slider.svg)](https://www.npmjs.com/package/rm-ng-range-slider) |
| **rm-carousel**                   | Simple, responsive carousel component                                    | [![npm](https://img.shields.io/npm/v/rm-carousel.svg)](https://www.npmjs.com/package/rm-carousel)               |
| **rm-image-slider**               | Minimal image slider with smooth transitions                             | [![npm](https://img.shields.io/npm/v/rm-image-slider.svg)](https://www.npmjs.com/package/rm-image-slider)       |
| **rm-ng-star-rating**             | Configurable Angular star rating component with readonly mode            | [![npm](https://img.shields.io/npm/v/rm-ng-star-rating.svg)](https://www.npmjs.com/package/rm-ng-star-rating)   |
| **@codewithrajat/rm-ng-typeahead** | Angular autocomplete/typeahead component with search suggestions and keyboard navigation | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-typeahead) |
| **@codewithrajat/rm-ng-editor**                  | Rich text editor component for Angular applications with customizable toolbar support | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-editor) |

---

### PDF & Export Libraries

| Library                                | Description                                                  | npm Link                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-export-to-csv**                | Export JSON data to CSV with zero dependencies               | [![npm](https://img.shields.io/npm/v/rm-ng-export-to-csv.svg)](https://www.npmjs.com/package/rm-ng-export-to-csv)                               |
| **@codewithrajat/rm-ng-pdf-export**    | Image-based PDF export tool for Angular applications         | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)       |
| **@codewithrajat/rm-ng-structure-pdf** | Generate structured PDFs for reports, invoices, or documents | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-structure-pdf.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-structure-pdf) |
| **@codewithrajat/rm-ng-pdf-viewer** | Angular PDF viewer component with zoom, navigation, and document rendering support | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-pdf-viewer) |

---

### Chrome Extension

| Library | Description | Link                                                                                                                                    |
|----------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **quickocr** | Chrome extension that extracts text from images using OCR technology | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/quickocr/releases)                                     |
| **readLoude** | Chrome extension that read you web page loude e.g article etc. | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/readLoude/releases)                            |
| **ai-assistant-reply** | AI Chrome extension to auto generate reply on linked in posts. | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/ai-assistant-reply/releases) |

---

### VS Code Extension

| Library | Description | Link                                                                                                                                      |
|----------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **dead-css-cleaner** | VS Code extension for identifying and cleaning unused CSS styles | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/dead-css-cleaner/releases)      |
| **file-coverage-insight** | VS Code extension for auto generated component file coverage automatelly on open. | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/file-coverage-insight/releases) |

---

### Desktop Applications - All Plateform

| Library | Description | Link                                                                                                                           |
|----------|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| **deepwork** | Cross-platform productivity application for focus sessions and deep work tracking | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/deepwork/releases)          |
| **JsSandbox** | Cross-platform JavaScript playground and code execution environment | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/JsSandbox/releases) |

---

### Device Detection

| Library                        | Description                                             | npm Link                                                                                                                        |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-device-detection**     | Detect device type, OS, and browser in Angular          | [![npm](https://img.shields.io/npm/v/rm-ng-device-detection.svg)](https://www.npmjs.com/package/rm-ng-device-detection)         |

---

### Notifications

| Library           | Description                                       | npm Link                                                                                              |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **rm-pushnotify** | Lightweight push-style toast notification utility | [![npm](https://img.shields.io/npm/v/rm-pushnotify.svg)](https://www.npmjs.com/package/rm-pushnotify) |
| **@codewithrajat/rm-toast-notification** | Cross-platform toast and desktop notification library for web, Angular, and desktop applications | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-toast-notification) |


---

### Layout & Dynamic Rendering

| Library | Description | Link |
|----------|-------------|------|
| **rm-ng-dynamic-layout** | Dynamic layout rendering engine for Angular applications using JSON-driven UI configuration | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-dynamic-layout) |

---

### Developer Tools & Extensions

| Library | Description | Link                                                                                                                            |
|----------|-------------|---------------------------------------------------------------------------------------------------------------------------------|
| **rm-colorful-console-logger** | Structured and colorized console logging utility for developers | [![npm](https://img.shields.io/npm/v/rm-colorful-console-logger.svg)](https://www.npmjs.com/package/rm-colorful-console-logger) |

---

### Meta & Personal Branding

| Library         | Description                                                      | npm Link                                                                                          |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **about-rajat** | Developer portfolio package for branding and quick personal info | [![npm](https://img.shields.io/npm/v/about-rajat.svg)](https://www.npmjs.com/package/about-rajat) |

---

### All Packages

Browse all my packages:
- [npm: @codewithrajat](https://www.npmjs.com/~codewithrajat)
- [npm: rajatmalik](https://www.npmjs.com/~rajatmalik)
- [GitHub: @malikrajat](https://github.com/malikrajat?tab=repositories)

---

## Author

**Rajat Malik**

Full‑Stack Developer and Frontend Architect at Siemens with 14+ years building scalable enterprise platforms, specializing in micro‑frontends, AI‑native development, React, and Angular.  
Author of 10+ open‑source libraries and 100+ technical articles, driving innovation through developer‑friendly tools, performance optimization, and AI‑assisted workflows.

### GET IN TOUCH

- Portfolio:  [rajatmalik.dev](https://rajatmalik.dev)
- Email:      [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- LinkedIn:   [errajatmalik](https://linkedin.com/in/errajatmalik)
- GitHub:     [@malikrajat](https://github.com/malikrajat)
- npm:        [rajatmalik](https://www.npmjs.com/~rajatmalik)

### SOCIAL PRESENCE
- Threads:    [rajatmalik](https://www.threads.net/@er.rajatmalik)
- Twitter/X:  [rajatmalik](https://x.com/er_rajatmalik)
- BlueSky:    [rajatmalik](http://devrajat.bsky.social)

### CONTENT & WRITING

- Medium:    [rajatmalik]( https://medium.com/@codewithrajat)
- Dev.to:    [rajatmalik]( https://dev.to/codewithrajat)
- Substack:   [rajatmalik](https://codewithrajat.substack.com)
- Hashnode:   [rajatmalik](https://hashnode.com/@codeswithrajat)

---

<p align="center">
  <p align="center">Made with care and love  by <a href="https://rajatmalik.dev">Rajat Malik</a> for the Angular community</p>
</p>

<p align="center">
  <a href="https://github.com/malikrajat/rm-ng-pdf-export/stargazers">Star on GitHub</a> •
  <a href="https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export">View on npm</a> •
  <a href="https://github.com/malikrajat/rm-ng-pdf-export/issues">Report Issue</a> •
  <a href="https://stackblitz.com/edit/stackblitz-starters-5rt3lrkz">Try Demo</a>
</p>

<p align="center">
  Made with dedication by <a href="https://rajatmalik.dev">Rajat Malik</a>
</p>
