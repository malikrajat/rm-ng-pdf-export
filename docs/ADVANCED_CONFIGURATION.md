
## Advanced Configuration

This section describes advanced configuration options for `rm-ng-pdf-export` that allow greater control over PDF generation behavior.

Advanced configuration should be used only when default settings do not meet application requirements.

---

## Configuration via Options Object

The library supports advanced behavior through a configuration object passed to the export method.

Example:

### main.ts Configuration

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

### Set up Component 

```ts
this.pdfExportService.export(element, {
  fileName: 'report.pdf',
  scale: 2,
  margin: 10,
  orientation: 'portrait'
});
````

---

## Supported Configuration Options

### File Output

| Option        | Type                        | Description                         |
| ------------- | --------------------------- | ----------------------------------- |
| `fileName`    | `string`                    | Name of the generated PDF file      |
| `orientation` | `'portrait' \| 'landscape'` | Page orientation                    |
| `pageSize`    | `string`                    | Page size (for example, A4, Letter) |

---

### Rendering Options

| Option            | Type     | Description                               |
| ----------------- | -------- | ----------------------------------------- |
| `scale`           | `number` | Rendering scale for higher quality output |
| `margin`          | `number` | Page margin in pixels                     |
| `backgroundColor` | `string` | Background color used during rendering    |

---

### Content Handling

| Option                  | Type       | Description                           |
| ----------------------- | ---------- | ------------------------------------- |
| `includeHiddenElements` | `boolean`  | Include elements with `display: none` |
| `ignoreSelectors`       | `string[]` | CSS selectors to exclude from export  |
| `pageBreakSelector`     | `string`   | Selector to control page breaks       |

---

## Global Default Configuration

Advanced users can define default configuration values and reuse them across exports:

```ts
const defaultConfig = {
  scale: 2,
  margin: 10,
  orientation: 'portrait'
};

this.pdfExportService.export(element, {
  ...defaultConfig,
  fileName: 'invoice.pdf'
});
```

---

## Font Configuration

* Custom fonts must be fully loaded before export
* External fonts require proper CORS configuration
* Font loading should be completed prior to invoking export

Failure to load fonts correctly may result in fallback fonts in the generated PDF.

---

## Image and Asset Configuration

* Ensure all images are loaded before export
* Use optimized image formats
* Configure `crossorigin="anonymous"` for external images
* Avoid very large images when exporting on mobile devices

---

## Page Break Control

For multi-page PDFs, page breaks can be controlled using CSS:

```css
.page-break {
  page-break-before: always;
}
```

Use this approach for predictable multi-page layouts.

---

## Error Handling Configuration

Advanced error handling can be implemented in the consuming application:

```ts
try {
  await this.pdfExportService.export(element, options);
} catch (error) {
  // Handle export failure
}
```

Always handle errors gracefully to provide proper user feedback.

---

## When to Use Advanced Configuration

Advanced configuration is recommended when:

* High-quality print-ready PDFs are required
* Large or complex layouts are exported
* Specific layout or page break control is needed
* Cross-browser consistency must be fine-tuned

---

## Summary

Advanced configuration enables fine-grained control over PDF output.

Use these options thoughtfully to balance quality, performance, and maintainability.

