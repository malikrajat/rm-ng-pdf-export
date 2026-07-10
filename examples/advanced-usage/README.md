# Advanced Usage Examples

This directory contains examples demonstrating advanced capabilities of `rm-ng-pdf-export`.

## Examples

### 1. Batch Export (`batch-export.component.ts`)
Demonstrates how to export multiple documents sequentially.
- Uses `async/await` to process a list of items.
- Exports each item as a separate PDF file.
- Useful for generating bulk reports or invoices.

### 2. Custom Configuration (`custom-config.component.ts`)
Shows how to dynamically change export settings based on application state.
- **Conditional Filenames**: Change the output filename based on content.
- **Dynamic Orientation**: Switch between Portrait and Landscape programmatically.
- **Margins & Page Size**: Customize physical page properties.
- **Open in New Tab**: Preview the PDF instead of downloading immediately.

## Usage
Import the `PdfExportService` and pass the `PdfExportConfig` object to the `exportHtml` method.
