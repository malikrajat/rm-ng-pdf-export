# Certificate Generator Example

This example demonstrates how to use `rm-ng-pdf-export` to create a dynamic, interactive certificate generator.

## Features
- **Interactive Form**: Users can input recipient name, course name, and instructor name.
- **Real-time Updates**: changes are reflected in the UI (if you add binding).
- **Custom Styling**: Uses CSS to create a professional-looking certificate border and layout.
- **Landscape Orientation**: Exports the PDF in landscape mode for a traditional certificate look.

## Key Code Highlights
```typescript
this.pdfExportService.exportHtml(
  this.certificateElement.nativeElement,
  {
    filename: 'certificate.pdf',
    pageSize: 'A4',
    orientation: 'landscape',
    margins: { top: 10, right: 10, bottom: 10, left: 10 }
  }
);
```
