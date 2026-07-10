# FAQ

**Q: Why choose rm-ng-pdf-export over other PDF libraries?**

A: This library provides a simple, image-based approach that accurately captures your HTML content as it appears in the browser. It's specifically built for Angular with TypeScript support and requires minimal configuration.

**Q: Can I export multiple pages?**

A: Yes, the library handles multi-page exports automatically based on content height. You can also use CSS page-break properties to control pagination.

**Q: Does it work with Angular forms?**

A: Yes, you can export any HTML content including forms. Just ensure the form is rendered before calling the export function.

**Q: Can I customize the PDF page size?**

A: Yes, you can choose from A4, Letter, Legal formats, and set custom margins.

**Q: How do I handle images in the PDF?**

A: Ensure images are loaded before export. Use inline images or properly configured CORS for external images.

**Q: Does it work on mobile devices?**

A: Yes, the library works on all modern mobile browsers.

**Q: Can I add headers and footers?**

A: Custom headers and footers are planned for v1.x. Currently, you can include them as part of your HTML content.

**Q: Is there a file size limit?**

A: File size depends on content complexity and quality settings. Use compression for large documents.

**Q: Can I export charts and graphs?**

A: Yes, any HTML content including charts rendered with libraries like Chart.js can be exported.

**Q: How do I handle very long documents?**

A: The library handles long documents automatically. Consider using lower quality settings for faster export of large documents.

**Q: Can I use this in commercial projects?**

A: Yes, the MIT license allows free use in both personal and commercial projects.

**Q: How do I handle styling differences between screen and PDF?**

A: Use CSS print media queries to define PDF-specific styles.
