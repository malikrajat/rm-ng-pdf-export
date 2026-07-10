
## Peer Dependencies

`rm-ng-pdf-export` relies on a set of peer dependencies that must be provided by the consuming Angular application.

Peer dependencies are **not bundled** with the library. This ensures:
- A single shared Angular runtime
- No version conflicts
- Smaller bundle sizes
- Better compatibility with existing applications

---

### Required Peer Dependencies

The following peer dependencies must be installed in the host application:

| Package | Supported Versions | Reason |
|-------|-------------------|--------|
| `@angular/core` | ^21.0.0 | Core Angular runtime |
| `@angular/common` | Same as `@angular/core` | Angular common utilities |
| `rxjs` | ^7.8.2 | Reactive programming support |
| `zone.js` | ^0.15.1  | Required for Angular change detection |

---

### Example `package.json` Configuration

The library declares peer dependencies as follows:

```json
{
  "peerDependencies": {
    "@angular/core": "^16.0.0 || ^17.0.0 || ^18.0.0  || ^19.0.0  || ^20.0.0  || ^21.0.0 ",
    "@angular/common": "^16.0.0 || ^17.0.0 || ^18.0.0  || ^19.0.0  || ^20.0.0  || ^21.0.0 ",
    "rxjs": "^7.0.0 || ^7.8.2",
    "zone.js": "^0.15.0 || ^0.15.1"
  }
}
````

---

### Why These Are Peer Dependencies

These packages are declared as peer dependencies because:

* Angular libraries must share the same Angular instance as the host app
* Multiple Angular versions in a single application cause runtime errors
* RxJS must align with Angular’s supported version
* Zone.js behavior must match the Angular framework version

---

### What Happens If Peer Dependencies Are Missing

If peer dependencies are not installed or versions are incompatible, you may encounter:

* Build-time warnings
* Runtime injection errors
* Unexpected behavior during PDF export
* Angular compiler failures

Always ensure peer dependency versions align with your Angular application.

---

### Notes on Optional Dependencies

This library does not require any optional peer dependencies at this time.

If optional peer dependencies are introduced in future versions, they will be clearly documented.

---

### Summary

To use `rm-ng-pdf-export` safely and correctly:

* Ensure Angular, RxJS, and Zone.js are installed in the host application
* Use versions compatible with your Angular setup
* Do not override peer dependencies inside the library
