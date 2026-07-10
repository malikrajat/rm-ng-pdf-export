# Browser and Operating System Support

`@codewithrajat/rm-ng-pdf-export` is built using modern web standards and is designed to work reliably across supported browsers and operating systems that meet Angular’s baseline requirements.

---

## Supported Browsers

The library is fully supported and tested on the following modern, evergreen browsers:

| Browser | Minimum Version | Support Level | Notes |
|-------|----------------|---------------|-------|
| Google Chrome | 80+ | Full Support | Recommended for best performance |
| Mozilla Firefox | 75+ | Full Support | Fully compatible |
| Microsoft Edge | 80+ | Full Support | Chromium-based |
| Safari (macOS) | 13+ | Full Support | Supported on macOS |
| Safari (iOS) | 13+ | Full Support | Mobile Safari supported |
| Opera | 67+ | Full Support | Chromium-based |
| Samsung Internet | 12+ | Full Support | Android devices |

---

## Supported Operating Systems

The library works on all operating systems capable of running supported browsers and Angular applications.

| Operating System | Minimum Version | Support Level | Notes |
|------------------|----------------|---------------|-------|
| Windows | Windows 10 | Full Support | Windows 11 supported |
| macOS | macOS 10.15 (Catalina) | Full Support | Apple Silicon supported |
| Linux | Modern distributions | Full Support | Ubuntu, Debian, Fedora |
| iOS | iOS 13+ | Full Support | iPhone and iPad |
| Android | Android 9+ | Full Support | Mobile and tablets |

---

## Mobile and Tablet Support

The library is compatible with modern mobile and tablet environments:

- iOS Safari 13+
- Chrome for Android 80+
- Samsung Internet
- Chromium-based mobile browsers

Performance on mobile devices may vary depending on available memory and document complexity.

---

## Unsupported Browsers and Platforms

The following browsers and platforms are not supported:

- Internet Explorer (all versions)
- Legacy Edge (non-Chromium)
- Browsers without ES2015+ support
- Very old Android WebView versions

These environments lack required APIs such as modern Canvas rendering, Blob handling, and reliable file download support.

---

## Known Limitations Across Browsers and OS

While supported environments work reliably, some limitations apply:

- PDF generation may be slower on low-memory devices
- Complex CSS effects may not render identically across browsers
- Fonts loaded from external domains require proper CORS configuration
- Cross-origin images must be configured with appropriate headers
- Large DOM trees may impact performance during export

---

## Best Practices for Compatibility

To ensure consistent behavior across browsers and operating systems:

- Use web-safe fonts or properly embedded custom fonts
- Avoid experimental or browser-specific CSS features
- Ensure all images and assets are fully loaded before export
- Test exports on at least one desktop and one mobile browser
- Prefer Chromium-based browsers for development and testing

---

## Angular Compatibility

| Angular Version | Support |
|----------------|---------|
| Angular 14 | Supported |
| Angular 15 | Supported |
| Angular 16 | Supported |
| Angular 17 | Supported |
| Angular 18+ | Supported |

---

## Summary

If your application runs on a supported browser and operating system compatible with Angular,  
`rm-ng-pdf-export` will function reliably without additional configuration.

For optimal results, use a modern Chromium-based browser on a desktop operating system during development and testing.
