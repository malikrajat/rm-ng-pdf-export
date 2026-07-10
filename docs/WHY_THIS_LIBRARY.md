# Why This Library?

Choosing the right PDF export solution in Angular applications is often more complex than it should be. Most existing solutions introduce unnecessary trade-offs between quality, performance, developer experience, and modern Angular compatibility.

`@codewithrajat/rm-ng-pdf-export` was created to solve these problems in a clean, Angular-first way.

---

## The Problem with Existing Solutions

Many PDF export libraries in the Angular ecosystem suffer from one or more of the following limitations:

- Complex setup with verbose configuration
- Tight coupling to Angular modules (poor support for standalone components)
- Low-quality or blurry PDF output
- Limited control over page size, margins, or orientation
- Large bundle sizes with poor tree-shaking
- Weak or missing TypeScript typings
- Generic JavaScript APIs not optimized for Angular workflows

For teams building modern Angular applications, these issues slow down development and negatively impact maintainability.

---

## What This Library Does Differently

`rm-ng-pdf-export` is designed specifically for **modern Angular (14+)** applications with a strong focus on simplicity, performance, and developer ergonomics.

### Angular-First Design

- Built as a **standalone injectable service**
- No NgModule dependency required
- Works seamlessly with standalone components and modern Angular architecture

### Simple, Predictable API

- One primary method: `exportToPdf`
- Sensible defaults for most use cases
- Optional configuration object for advanced scenarios

### High-Quality Output

- Uses `html2canvas` for accurate HTML rendering
- Uses `jsPDF` for reliable PDF generation
- Supports high DPI exports for professional, print-ready documents

### Performance-Conscious

- Tree-shakable and optimized for modern bundlers
- Minimal Angular-specific overhead
- Suitable for production-scale applications

### Strong Type Safety

- Fully written in TypeScript
- Well-defined interfaces for configuration
- IDE-friendly autocomplete and compile-time checks

---

## When Should You Use This Library?

This library is a good fit if you need to:

- Export Angular components or HTML sections as PDFs
- Generate invoices, reports, certificates, or dashboards
- Support both portrait and landscape layouts
- Maintain clean architecture in standalone Angular apps
- Avoid heavy or over-engineered PDF solutions
- Deliver consistent PDF output across modern browsers

---

## Design Philosophy

This library follows a few guiding principles:

- **Angular-native over generic JavaScript**
- **Simple by default, configurable when needed**
- **Quality output without sacrificing performance**
- **Developer experience matters**

If you value maintainable code, modern Angular patterns, and predictable behavior, this library was built with you in mind.

---

## Next Steps

- 📦 [Installation Guide](./INSTALLATION.md)
- 🚀 [Quick Start](./USAGE.md)
- 📘 [API Reference](./API.md)
- 🧪 [Usage Examples](./USAGE_EXAMPLES.md)
