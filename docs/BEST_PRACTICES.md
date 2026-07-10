## Best Practices

This section outlines recommended practices for using `rm-ng-pdf-export` effectively, safely, and in a maintainable way within Angular applications.

Following these guidelines helps ensure predictable behavior, optimal performance, and long-term compatibility.

---

## API Usage

- Use the library through the exported service only
- Avoid accessing or modifying internal implementation details
- Rely on the types provided in `types.ts` for configuration and contracts
- Keep usage centralized instead of scattering export logic across components

---

## Angular Integration

- Trigger PDF generation explicitly through user actions (for example, button clicks)
- Avoid invoking PDF export during component initialization
- Ensure the DOM is fully rendered before generating the PDF
- Prefer `ChangeDetectionStrategy.OnPush` for components involved in export

---

## Public API Discipline

- Import symbols only from the package root
- Do not import files directly from internal paths
- Treat the public API as a stable contract
- Avoid re-exporting internal types in consuming applications

---

## Performance and Stability

- Export only the required portion of the DOM
- Avoid exporting pages with excessive nesting or dynamic animations
- Keep document content as static as possible during export
- Test exports with realistic data sizes

---

## Asset Management

### Fonts
- Use web-safe fonts when possible
- Ensure custom fonts are fully loaded before export
- Avoid loading unnecessary font weights

### Images
- Optimize images for size and resolution
- Ensure images are accessible and loaded before export
- Configure proper CORS headers for external images

---

## Cross-Browser Consistency

- Test critical export flows in multiple browsers
- Validate layout consistency between Chromium-based browsers and Safari
- Avoid browser-specific CSS or experimental features

---

## Error Handling

- Handle export errors gracefully in the consuming application
- Provide user feedback when export fails
- Log errors during development to aid debugging

---

## Version Management

- Ensure Angular, Node.js, and library versions are compatible
- Follow the documented version compatibility matrix
- Upgrade dependencies in a controlled manner
- Test thoroughly after version upgrades

---

## Security Considerations

- Avoid exporting sensitive data without proper access control
- Ensure content complies with organizational security policies
- Validate input used in dynamic PDF content

---

## Testing and Validation

- Test PDF generation in production builds
- Validate output on target browsers and devices
- Include PDF export scenarios in end-to-end testing where applicable

---

## Summary

Adhering to these best practices ensures that `rm-ng-pdf-export` remains:

- Reliable
- Performant
- Maintainable
- Compatible with Angular best practices

These guidelines are intended to evolve alongside the library and Angular ecosystem.
