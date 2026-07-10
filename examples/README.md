# Angular PDF Export Examples

This folder contains a collection of examples demonstrating how to use the `@codewithrajat/rm-ng-pdf-export` library.

## Directory Structure

### Basic Examples
- **[Basic Usage](./basic-usage)**: setup and simple export.
- **[Invoice Generator](./invoice-generator)**: Professional invoice layout with data tables.
- **[Dashboard Report](./dashboard-export)**: Business report with metrics and charts.
- **[Certificate Generator](./certificate-generator)**: Interactive certificate creator with landscape export.
- **[Multi-Page Document](./multi-page)**: Handling content that spans multiple pages.

### Advanced Topics
- **[Advanced Usage](./advanced-usage)**: 
  - **Batch Export**: Generate multiple PDFs in a loop.
  - **Custom Config**: Dynamic page sizes, margins, and orientation.
- **[Best Practices](./best-practices)**:
  - **Error Handling**: Graceful failure management.
  - **UX & Performance**: Loading states and performance optimization patterns.

## Running the Examples
1. Ensure you have installed the library:
   ```bash
   npm install @codewithrajat/rm-ng-pdf-export
   ```
2. Import `PdfExportService` in your component.
3. Call `exportHtml()` with your element and options.

## Quick Snippet
```typescript
constructor(private pdfService: PdfExportService) {}

download() {
  this.pdfService.exportHtml(this.contentRef.nativeElement, {
    filename: 'demo.pdf',
    pageSize: 'A4'
  });
}
```