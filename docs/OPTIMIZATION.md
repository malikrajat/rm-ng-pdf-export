## Optimization

This section describes best practices and recommendations to achieve optimal performance and reliability when using `rm-ng-pdf-export`.

The library is designed to be lightweight and tree-shakable, but performance ultimately depends on how it is used within the consuming application.

---

## Bundle Size Optimization

- The library exposes a minimal public API through `public-api.ts`
- Only the required symbols are imported into the host application
- Unused code is removed during Angular’s build-time tree-shaking

Best practices:
- Import only the required service or types
- Avoid wildcard imports from the library
- Use production builds for accurate bundle size measurement

---

## Runtime Performance

PDF generation is a CPU- and memory-intensive operation. To minimize runtime impact:

- Trigger PDF export only on explicit user actions
- Avoid generating PDFs automatically during component initialization
- Prefer exporting smaller DOM sections instead of entire pages
- Avoid deeply nested or excessively large DOM trees

---

## Change Detection Considerations

For best results in Angular applications:

- Use `ChangeDetectionStrategy.OnPush` where possible
- Ensure the DOM is stable before triggering PDF generation
- Avoid frequent state changes during export

This reduces unnecessary re-rendering and improves export consistency.

---

## Asset Optimization

### Fonts
- Prefer web-safe fonts when possible
- If using custom fonts, ensure they are fully loaded before export
- Avoid loading multiple font weights unless required

### Images
- Optimize image size and resolution
- Ensure images are fully loaded before generating the PDF
- Use proper CORS headers for externally hosted images

---

## Memory Management

Large or complex documents may consume significant memory:

- Avoid exporting very large pages on low-memory devices
- Break large content into smaller sections if possible
- Be cautious when exporting on mobile or tablet devices

Mobile browsers may impose stricter memory limits than desktop environments.

---

## Browser-Specific Recommendations

- Chromium-based browsers generally provide the best performance
- Safari may require additional attention for font loading and layout consistency
- Test critical export flows on at least two different browsers

---

## Development vs Production Builds

Always test PDF generation using a **production build**:

- Development builds include additional checks and overhead
- Performance characteristics differ significantly from production
- Production builds provide more accurate memory and timing behavior

---

## Monitoring and Debugging

To identify performance issues:

- Use browser performance profiling tools
- Monitor memory usage during PDF generation
- Test with realistic document sizes
- Validate behavior on target devices and browsers

---

## Summary

To achieve optimal performance with `rm-ng-pdf-export`:

- Keep exports intentional and scoped
- Optimize assets and DOM complexity
- Align with Angular performance best practices
- Test across browsers and environments

Following these guidelines ensures reliable PDF generation with minimal performance impact.
