# Version Compatibility Matrix

This document describes the compatibility between Angular versions,  
`@codewithrajat/rm-ng-pdf-export` library versions, and supported Node.js versions.

Using supported combinations is strongly recommended to avoid build-time or runtime issues.

---

## Angular, Library, and Node.js Compatibility

| Library Version | Angular Version | Node.js Version | Status |
|-----------------|----------------|-----------------|--------|
| 1.x.x | Angular 17 | Node 14.x, 16.x | Supported |
| 1.x.x | Angular 18 | Node 14.x, 16.x | Supported |
| 1.x.x | Angular 19 | Node 16.x, 18.x | Supported |
| 2.x.x | Angular 20 | Node 18.x | Supported |
| 2.x.x | Angular 21 | Node 22.x, 24.x | Supported |
| 3.x.x | Angular 22 | Node 22.x, 24.x | Supported |

---

## Recommended Versions

For new projects, the following combination is recommended:

- Angular: 18+
- Library: Latest version
- Node.js: 18.x LTS or 20.x LTS

This combination provides optimal performance, long-term support, and compatibility with modern tooling.

---

## Node.js Support Policy

The library follows Angular’s official Node.js support policy:

- Only **Active LTS** and **Maintenance LTS** Node.js versions are supported
- End-of-Life Node.js versions are not supported
- Node.js version must be compatible with the Angular CLI version in use

Refer to Angular’s official documentation when selecting Node.js versions.

---

## Unsupported Configurations

The following configurations are not supported:

- Node.js versions below 16.x
- Angular versions below 16
- Mixing unsupported Angular and Node.js versions
- Custom builds using deprecated Angular CLI tooling

Such configurations may result in:
- Build failures
- Runtime errors
- PDF generation issues
- Missing polyfills or browser API failures

---

## Upgrade Guidance

When upgrading, follow this order:

1. Upgrade Node.js to a supported LTS version
2. Upgrade Angular framework and CLI
3. Upgrade `@codewithrajat/rm-ng-pdf-export` to a compatible version
4. Validate application build and PDF generation

---

## Summary

Using aligned versions of Angular, Node.js, and the library ensures:

- Stable builds
- Reliable PDF generation
- Long-term maintainability
- Compatibility with modern browsers and OS environments

Always refer to this matrix before upgrading or configuring CI/CD pipelines.
