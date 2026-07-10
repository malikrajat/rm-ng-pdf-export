# Installation Guide

This comprehensive guide will help you install and set up `rm-ng-pdf-export` in your Angular application.

## Prerequisites

Before installing the library, ensure you have:

- **Node.js** (version 16 or higher)
- **Angular CLI** (version 17 or higher)
- **An existing Angular project** (version 17+)
- **Package manager**: npm, yarn, or pnpm

## Installation Methods

### Method 1: NPM (Recommended)

```bash
npm install rm-ng-pdf-export
```

### Method 2: Yarn

```bash
yarn add rm-ng-pdf-export
```

### Method 3: PNPM

```bash
pnpm add rm-ng-pdf-export
```

## Peer Dependencies

The library requires these peer dependencies to function properly:

```bash
# Install required peer dependencies
npm install pdf-lib html2canvas

# Or with specific versions
npm install pdf-lib@^1.17.1 html2canvas@^1.4.1
```

### Dependency Overview

| Package | Version | Purpose |
|---------|---------|---------|
| pdf-lib | ^1.17.1 | PDF generation and manipulation |
| html2canvas | ^1.4.1 | HTML to canvas conversion |
| @angular/core | ^14.0.0-^22.0.0 | Angular framework |

## Setup Methods

### For Standalone Applications (Angular 14+)

#### main.ts Configuration

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PdfExportService, PDF_EXPORT_CONFIG } from 'rm-ng-pdf-export';

bootstrapApplication(AppComponent, {
  providers: [
    PdfExportService,
    {
      provide: PDF_EXPORT_CONFIG,
      useValue: {
        pageSize: 'A4',
        orientation: 'portrait',
        filename: 'document.pdf',
        openInNewTab: false
      }
    }
  ]
});
```

#### Component-Level Configuration

```typescript
import { Component } from '@angular/core';
import { PdfExportService, PDF_EXPORT_CONFIG } from 'rm-ng-pdf-export';

@Component({
  selector: 'app-example',
  standalone: true,
  providers: [
    PdfExportService,
    {
      provide: PDF_EXPORT_CONFIG,
      useValue: {
        pageSize: 'Letter',
        orientation: 'landscape'
      }
    }
  ],
  template: `<!-- Your template -->`
})
export class ExampleComponent {
  constructor(private pdfService: PdfExportService) {}
}
```

### For Module-Based Applications

#### app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfExportService, PDF_EXPORT_CONFIG } from 'rm-ng-pdf-export';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    PdfExportService,
    {
      provide: PDF_EXPORT_CONFIG,
      useValue: {
        pageSize: 'A4',
        orientation: 'portrait',
        filename: 'export.pdf'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Verification

### Quick Test Component

Create a test component to verify the installation:

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from 'rm-ng-pdf-export';

@Component({
  selector: 'app-installation-test',
  template: `
    <div #testContent>
      <h1>Installation Test</h1>
      <p>If you can export this as PDF, the installation is successful!</p>
    </div>
    <button (click)="testExport()">Test PDF Export</button>
  `
})
export class InstallationTestComponent {
  @ViewChild('testContent') testContent!: ElementRef;

  constructor(private pdfService: PdfExportService) {}

  async testExport() {
    try {
      await this.pdfService.exportHtml(this.testContent.nativeElement, {
        filename: 'installation-test.pdf'
      });
      console.log('Installation successful!');
      alert('PDF export successful! Installation is working correctly.');
    } catch (error) {
      console.error('Installation test failed:', error);
      alert('Installation test failed. Please check the console for errors.');
    }
  }
}
```

## Troubleshooting

### Common Installation Issues

#### 1. Peer Dependency Warnings

```bash
# If you see peer dependency warnings
npm install --legacy-peer-deps

# Or force install
npm install --force
```

#### 2. TypeScript Errors

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

#### 3. Angular Version Compatibility

| Angular Version | Library Version | Status |
|----------------|----------------|---------|
| 17.x | 1.x | Supported |
| 18.x | 1.x | Supported |
| 19.x | 1.x | Supported |
| 20.x | 2.x | Supported |
| 21.x | 2.x | Supported |
| 22.x | 3.x | Supported |

For more troubleshooting help, see our [Troubleshooting Guide](./TROUBLESHOOTING.md).

## Support

Need help with installation?

- **Email**: [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/malikrajat/rm-ng-pdf-export/issues)
- **Discussions**: [GitHub Discussions](https://github.com/malikrajat/rm-ng-pdf-export/discussions)
