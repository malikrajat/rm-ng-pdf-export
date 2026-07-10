# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-07-10

### Major Release

#### Added
- **Angular 22 Support**: Added explicit compatibility for Angular 22, ensuring seamless integration with the latest Angular framework version.
- **Modern Angular APIs**: Updated library internals to leverage Angular 22's latest APIs, compiler improvements, and runtime optimizations.
- **Enhanced Type Safety**: Improved TypeScript type definitions to align with Angular 22's stricter type checking and enhanced type system.

#### Changed
- **Extended Angular Support**: Expanded peer dependency range to support Angular versions 16.0.0 to 22.0.0, covering Angular 16, 17, 18, 19, 20, 21, and 22.
- **Framework Compatibility**: Updated peer dependencies and compatibility declarations to align with Angular 22's latest APIs, compiler, and runtime changes.
- **Build Configuration**: Verified and updated build targets, module resolution, and package exports to maintain full compatibility with Angular 22's build system and modern Angular CLI.
- **Type Definitions**: Refined TypeScript type declarations to ensure compatibility with Angular 22's type system and stricter compiler checks.
- **Peer Dependencies**: Updated `@angular/core`, `@angular/common`, and related Angular packages in peer dependencies to accept version 22.x.

#### Fixed
- **Angular 22 Compatibility**: Resolved any compatibility issues arising from Angular 22's breaking changes, ensuring smooth migration path for users upgrading from Angular 21.
- **Peer Dependency Resolution**: Fixed peer dependency warnings when installing the library in Angular 22 projects.
- **Build Warnings**: Eliminated build-time warnings and errors that may occur with Angular 22's stricter build validation.
- **Runtime Compatibility**: Ensured all library features work correctly with Angular 22's updated runtime behavior and change detection mechanisms.

---

## [2.0.1] - 2025-12-24

### Major Release

#### Added
- **Extended Angular Support**: Expanded peer dependency range to support Angular versions 16.0.0 to 21.0.0.
- **Documentation Architecture**: Introduced a comprehensive `docs` folder with dedicated guides for API, Examples, and Best Practices.
- **Discovery**: Added extensive keywords to `package.json` to improve registry searchability.

#### Changed
- **Core Rendering Logic**: Updated `PdfExportService` with refined canvas coordinate calculations (x, y, width, height) for superior PDF alignment.
- **Project Structure**: Streamlined `README.md` to be a lightweight entry point, delegating details to the new documentation structure.
- **Licensing**: Updated copyright attributions to 2026.

#### Fixed
- **Build Configuration**: Adjusted entry points and package exports for modern Angular build systems.

---

## [1.2.1] - 2025-09-14

### Ultra-High-Quality PDF Rendering

#### Added
- **Ultra-High Resolution Output**: 3x html2canvas scaling + 4x canvas resolution for crystal-clear PDFs
- **Print-Quality DPI**: 300 DPI rendering for professional print output
- **Enhanced Image Smoothing**: Maximum quality image smoothing and letter rendering
- **Superior Text Clarity**: Crisp, razor-sharp fonts and text at any zoom level
- **Crystal-Clear Graphics**: High-definition images, charts, and visual elements

#### Technical Improvements
- Enhanced html2canvas options with 3x scale factor and 300 DPI
- Ultra-high resolution canvas rendering with 4x pixel density
- Maximum PNG export quality (1.0) for lossless image compression
- Advanced image smoothing algorithms for professional output
- Optimized text baseline and rendering context settings

#### Fixed
- **Blurry Text**: Crystal-clear fonts and text rendering
- **Pixelated Images**: High-definition graphics and photos
- **Poor Print Quality**: Professional 300 DPI output suitable for printing
- **Low Resolution**: Ultra-sharp PDFs that look crisp at any zoom level

## [1.2.0] - 2025-09-12
### Added
- **Smart Page Breaking**: Intelligent content boundary detection to prevent cutting cards, images, and sections mid-way
- **CSS Page-Break Support**: Respect for CSS `page-break-before`, `page-break-after`, and `page-break-inside` properties
- **Content Boundary Detection**: Automatic identification of sections, cards, and content blocks for optimal break points
- **Professional Page Transitions**: Clean breaks between content sections instead of arbitrary mathematical divisions
- **Enhanced HTML Structure**: Added CSS classes and page-break hints for better PDF formatting
- **Visual Content Preservation**: Cards, blog posts, statistics sections, and content blocks remain intact across pages

### Changed
- **Enhanced PDF Generation**: Page breaks now respect content boundaries instead of simple height division
- **Improved Algorithm**: Smart break point detection with priority-based selection for optimal page transitions
- **Better Content Organization**: HTML template updated with strategic CSS classes for clean page breaking

### Fixed
- Content no longer cuts off in the middle of important visual elements
- Cards and sections now break cleanly at natural boundaries
- Multi-page PDFs maintain professional appearance with logical page transitions

### Technical Details
- Added `ContentBreakPoint` interface for break point analysis
- Implemented `_detectContentBreakPoints()` method for DOM element boundary detection
- Added `_calculateSmartPageBreaks()` method for intelligent break point selection
- Created `_createSmartPageCanvas()` method for precise content sectioning
- Enhanced HTML template with `.pdf-section`, `.content-block`, `.blog-card`, and `.feature-card` classes

---

## [1.1.0] - 2025-09-12
### Added
- Initial release of `rm-ng-pdf-export` Angular library.
- PDF export from HTML using `html2canvas` and `pdfMake`.
- Support for Angular versions 14 through 20.
- Service, Directive, and Component API options.
- Tree-shakable and side-effect-free library structure.
- Basic configuration options: filename, page size, orientation, metadata.
- Compatibility with standalone Angular components.
- Unit tests with Jest.
- Documentation and demo placeholder.

### Fixed
- N/A

### Deprecated
- N/A

### Removed
- N/A

---

## [1.1.0] - 2025-09-12
### Added
- **Configurable Page Sizes**: Support for multiple predefined page sizes (A3, A4, A5, Letter, Legal, Tabloid, Ledger, Executive, B4, B5)
- **Portrait and Landscape Orientations**: Dynamic orientation support with automatic dimension swapping
- **Multi-page PDF Generation**: Content automatically splits across multiple pages when exceeding page height
- **Enhanced Component API**: Added individual input properties for `pageSize`, `orientation`, `filename`, and `openInNewTab`
- **Enhanced Directive API**: Added individual input properties for all configuration options
- **Type Safety**: Strong TypeScript typing with `PageSize` and `PageOrientation` types
- **Public API Method**: Added `getAvailablePageSizes()` method to retrieve supported page sizes
- **Demo Application**: Comprehensive demo showing all configuration options with real-time preview

### Changed
- **Breaking Change**: PDF generation now uses configurable page dimensions instead of hardcoded A4
- **Improved Scaling**: Content now scales dynamically to fit any selected page width
- **Enhanced Configuration**: `PdfExportConfig` interface updated with new `pageSize` and `orientation` options

### Fixed
- Page sizing now properly handles different paper formats
- Content scaling maintains aspect ratio across all page sizes
- Multi-page generation works correctly with all page sizes and orientations

### Technical Details
- Added predefined page size definitions with precise point measurements
- Implemented dynamic page dimension calculation based on size and orientation
- Enhanced canvas creation logic to handle variable page dimensions
- Backward compatibility maintained - existing code continues to work with A4 Portrait defaults

---

## [1.0.1] - 2025-08-30
### Added
- Updated README.md
- Update installation instructions.
- 
### Fixed
- N/A

### Deprecated
- N/A

### Removed
- N/A

---

