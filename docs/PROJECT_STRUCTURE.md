
## Project Structure

This project follows a minimal and focused Angular library structure.  
The goal is to keep the public API small, predictable, and easy to maintain while avoiding unnecessary abstraction.


```
rm-ng-pdf-export/
├── src/
│   ├── lib/
│   │   ├── rm-ng-pdf-export.service.ts
│   │   └── types.ts
│   └── public-api.ts
├── package.json
├── README.md
└── LICENSE
```

---

### Directory and File Overview

#### `src/`

Contains the complete source code of the library.

This folder is packaged and published to npm and represents the runtime code consumed by applications.

---

#### `src/lib/`

Holds the internal implementation of the library.

This directory contains all core logic required for PDF generation and export.

##### `rm-ng-pdf-export.service.ts`

* Main service responsible for PDF export functionality
* Encapsulates all PDF rendering and configuration logic
* Designed to be injectable and tree-shakable
* Serves as the primary entry point for consumers

##### `types.ts`

* Contains shared TypeScript types and interfaces
* Defines configuration contracts and input/output models
* Keeps the service implementation clean and strongly typed
* Intended for reuse across the library

---

#### `src/public-api.ts`

Defines the **public surface area** of the library.

Only the symbols exported from this file are accessible to library consumers.

Best practices followed:

* No internal implementation details are exposed
* Only stable APIs are exported
* Enables safe refactoring without breaking consumers

---

#### `package.json`

Defines:

* Library metadata
* Peer and direct dependencies
* Build and publish scripts
* Angular compatibility constraints

This file ensures correct installation and version alignment with Angular projects.

---

#### `README.md`

Primary documentation entry point.

Includes:

* Installation instructions
* Basic usage examples
* High-level overview of features
* Links to extended documentation (if any)

---

#### `LICENSE`

Contains licensing information governing usage, modification, and distribution of the library.

---

### Design Philosophy

This structure is intentionally minimal to:

* Reduce cognitive overhead for contributors
* Simplify maintenance and debugging
* Avoid over-engineering
* Keep the public API stable
* Support easy tree-shaking and bundling

---

### Summary

Although the directory structure is compact, it is fully sufficient for:

* A production-ready Angular library
* Clear separation between public API and implementation
* Long-term maintainability and extensibility
