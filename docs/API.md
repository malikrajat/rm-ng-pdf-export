# API Reference

Complete API documentation for `rm-ng-pdf-export` library.

## Core Service

### PdfExportService

The main service for PDF export functionality.

#### Methods

##### `exportHtml(element: HTMLElement, config?: PdfExportConfig): Promise<void>`

Exports an HTML element to PDF.

**Parameters:**
- `element` (HTMLElement): The DOM element to export
- `config` (PdfExportConfig, optional): Configuration options

**Returns:** Promise<void>

**Example:**
```typescript
await this.pdfService.exportHtml(this.contentRef.nativeElement, {
  filename: 'my-document.pdf',
  pageSize: 'A4',
  orientation: 'portrait'
});
```

##### `getAvailablePageSizes(): string[]`

Returns an array of supported page sizes.

**Returns:** string[] - Array of page size names

**Example:**
```typescript
const sizes = this.pdfService.getAvailablePageSizes();
// Returns: ['A3', 'A4', 'A5', 'Letter', 'Legal', 'Tabloid', 'Ledger', 'Executive', 'B4', 'B5']
```

## 🎛Configuration

### PdfExportConfig Interface

Configuration options for PDF export.

```typescript
interface PdfExportConfig {
  pageSize?: PageSize;
  orientation?: PageOrientation;
  filename?: string;
  metadata?: PdfMetadata;
  openInNewTab?: boolean;
}
```

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pageSize` | PageSize | 'A4' | Page size for the PDF |
| `orientation` | PageOrientation | 'portrait' | Page orientation |
| `filename` | string | 'document.pdf' | Filename for download |
| `metadata` | PdfMetadata | undefined | PDF metadata |
| `openInNewTab` | boolean | false | Open PDF in new tab instead of download |

### PageSize Type

Supported page sizes:

```typescript
type PageSize = 
  | 'A3' 
  | 'A4' 
  | 'A5' 
  | 'Letter' 
  | 'Legal' 
  | 'Tabloid' 
  | 'Ledger' 
  | 'Executive' 
  | 'B4' 
  | 'B5';
```

#### Page Size Dimensions

| Size | Portrait (mm) | Landscape (mm) | Portrait (in) | Landscape (in) |
|------|---------------|----------------|---------------|----------------|
| A3 | 297 × 420 | 420 × 297 | 11.7 × 16.5 | 16.5 × 11.7 |
| A4 | 210 × 297 | 297 × 210 | 8.3 × 11.7 | 11.7 × 8.3 |
| A5 | 148 × 210 | 210 × 148 | 5.8 × 8.3 | 8.3 × 5.8 |
| Letter | 216 × 279 | 279 × 216 | 8.5 × 11.0 | 11.0 × 8.5 |
| Legal | 216 × 356 | 356 × 216 | 8.5 × 14.0 | 14.0 × 8.5 |
| Tabloid | 279 × 432 | 432 × 279 | 11.0 × 17.0 | 17.0 × 11.0 |
| Ledger | 432 × 279 | 279 × 432 | 17.0 × 11.0 | 11.0 × 17.0 |
| Executive | 184 × 267 | 267 × 184 | 7.25 × 10.5 | 10.5 × 7.25 |
| B4 | 250 × 353 | 353 × 250 | 9.8 × 13.9 | 13.9 × 9.8 |
| B5 | 176 × 250 | 250 × 176 | 6.9 × 9.8 | 9.8 × 6.9 |

### PageOrientation Type

```typescript
type PageOrientation = 'portrait' | 'landscape';
```

### PdfMetadata Interface

Metadata information for the PDF document.

```typescript
interface PdfMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
}
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Document title |
| `author` | string | Document author |
| `subject` | string | Document subject |
| `keywords` | string | Document keywords |
| `creator` | string | Application that created the document |
| `producer` | string | Application that produced the PDF |

## Directive API

### rmPdfExport Directive

Declarative directive for PDF export functionality.

#### Selector
```html
[rmPdfExport]
```

#### Properties

| Input | Type | Description |
|-------|------|-------------|
| `pdfConfig` | PdfExportConfig | Complete configuration object |
| `pageSize` | PageSize | Page size (alternative to pdfConfig) |
| `orientation` | PageOrientation | Orientation (alternative to pdfConfig) |
| `filename` | string | Filename (alternative to pdfConfig) |
| `exportTarget` | ElementRef | Target element to export |

#### Usage Examples

**With configuration object:**
```html
<button 
  rmPdfExport
  [pdfConfig]="{ pageSize: 'A4', orientation: 'portrait', filename: 'report.pdf' }"
  [exportTarget]="contentRef">
  Export PDF
</button>
```

**With individual properties:**
```html
<button 
  rmPdfExport
  [pageSize]="'Letter'"
  [orientation]="'landscape'"
  [filename]="'document.pdf'"
  [exportTarget]="contentRef">
  Export PDF
</button>
```

## Component API

### rm-pdf-export Component

Wrapper component for PDF export functionality.

#### Selector
```html
<rm-pdf-export>
```

#### Properties

| Input | Type | Description |
|-------|------|-------------|
| `pdfConfig` | PdfExportConfig | Complete configuration object |
| `pageSize` | PageSize | Page size |
| `orientation` | PageOrientation | Page orientation |
| `filename` | string | Export filename |
| `openInNewTab` | boolean | Open in new tab |

#### Content Projection

The component uses content projection to wrap the content to be exported:

```html
<rm-pdf-export [pageSize]="'A4'" [filename]="'my-document.pdf'">
  <div>
    <!-- Content to be exported -->
    <h1>Document Title</h1>
    <p>Document content...</p>
  </div>
</rm-pdf-export>
```

## Injection Tokens

### PDF_EXPORT_CONFIG

Injection token for global PDF export configuration.

```typescript
import { PDF_EXPORT_CONFIG, PdfExportConfig } from 'rm-ng-pdf-export';

const defaultConfig: PdfExportConfig = {
  pageSize: 'A4',
  orientation: 'portrait',
  filename: 'document.pdf',
  openInNewTab: false
};

// In providers array
{
  provide: PDF_EXPORT_CONFIG,
  useValue: defaultConfig
}
```

## CSS Classes for Page Breaking

The library recognizes specific CSS classes for intelligent page breaking:

### Recognized Classes

| Class | Purpose | Behavior |
|-------|---------|----------|
| `.pdf-section` | Major content sections | Preferred break points |
| `.content-block` | Large content areas | Avoid breaking inside |
| `.blog-card` | Article cards | Keep intact |
| `.feature-card` | Feature cards | Prevent mid-card breaks |
| `.stat-card` | Statistics cards | Maintain visual integrity |

### CSS Page-Break Properties

Standard CSS page-break properties are supported:

```css
/* Prevent breaking inside element */
.important-content {
  page-break-inside: avoid;
}

/* Force break before element */
.new-section {
  page-break-before: always;
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

## Error Handling

### Common Error Types

The service may throw these types of errors:

#### Canvas Rendering Errors
```typescript
try {
  await this.pdfService.exportHtml(element);
} catch (error) {
  if (error.message.includes('html2canvas')) {
    console.error('Canvas rendering failed:', error);
    // Handle canvas-specific errors
  }
}
```

#### PDF Generation Errors
```typescript
try {
  await this.pdfService.exportHtml(element);
} catch (error) {
  if (error.message.includes('pdf-lib')) {
    console.error('PDF generation failed:', error);
    // Handle PDF-specific errors
  }
}
```

#### Browser Compatibility Errors
```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

constructor(
  private pdfService: PdfExportService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

exportPdf() {
  if (!isPlatformBrowser(this.platformId)) {
    console.warn('PDF export is only available in browser environment');
    return;
  }
  
  // Proceed with export
  this.pdfService.exportHtml(element);
}
```

## Advanced Usage

### Custom Configuration Factory

```typescript
import { InjectionToken } from '@angular/core';

export function createPdfConfig(): PdfExportConfig {
  return {
    pageSize: window.innerWidth > 1200 ? 'A3' : 'A4',
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    filename: `export-${new Date().toISOString().split('T')[0]}.pdf`
  };
}

// In providers
{
  provide: PDF_EXPORT_CONFIG,
  useFactory: createPdfConfig
}
```

### Service Extension

```typescript
import { Injectable } from '@angular/core';
import { PdfExportService, PdfExportConfig } from 'rm-ng-pdf-export';

@Injectable()
export class CustomPdfService extends PdfExportService {
  
  async exportWithWatermark(element: HTMLElement, watermarkText: string) {
    // Add watermark logic
    const watermarkElement = this.createWatermark(watermarkText);
    element.appendChild(watermarkElement);
    
    try {
      await this.exportHtml(element);
    } finally {
      // Clean up watermark
      element.removeChild(watermarkElement);
    }
  }
  
  private createWatermark(text: string): HTMLElement {
    const watermark = document.createElement('div');
    watermark.textContent = text;
    watermark.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 48px;
      color: rgba(0,0,0,0.1);
      pointer-events: none;
      z-index: 1000;
    `;
    return watermark;
  }
}
```

## Support

For API-related questions:

- **Email**: [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/malikrajat/rm-ng-pdf-export/issues)
- **Discussions**: [GitHub Discussions](https://github.com/malikrajat/rm-ng-pdf-export/discussions)
- **Examples**: [View Examples](../examples/README.md)
