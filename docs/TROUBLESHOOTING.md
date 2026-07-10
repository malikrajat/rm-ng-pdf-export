# Troubleshooting

## Common Issues and Solutions

### Issue: PDF Not Downloading

**Problem:** Export method completes but no PDF is downloaded.

**Solution:**

```typescript
// Check browser popup blockers
// Ensure user interaction triggered the export
exportOnClick(): void {
  // This should be triggered by a button click, not automatically
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
}

// Check browser console for errors
async exportWithLogging(): Promise<void> {
  try {
    await this.pdfExportService.exportToPdf(
      this.contentElement.nativeElement,
      'document.pdf'
    );
    console.log('Export successful');
  } catch (error) {
    console.error('Export failed:', error);
  }
}
```

### Issue: Images Not Showing in PDF

**Problem:** Images appear in the browser but not in the exported PDF.

**Solution:**

```typescript
// 1. Ensure images are loaded before export
async exportAfterImagesLoad(): Promise<void> {
  await this.waitForImagesToLoad();
  
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
}

private waitForImagesToLoad(): Promise<void> {
  return new Promise(resolve => {
    const images = this.contentElement.nativeElement.querySelectorAll('img');
    let loadedCount = 0;
    
    images.forEach((img: HTMLImageElement) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            resolve();
          }
        });
      }
    });
    
    if (loadedCount === images.length) {
      resolve();
    }
  });
}

// 2. Use inline images or proper CORS headers
<img src="data:image/png;base64,..." alt="Inline image">

// 3. Set crossorigin attribute for external images
<img src="https://example.com/image.jpg" crossorigin="anonymous">
```

### Issue: Poor PDF Quality

**Problem:** Exported PDF appears blurry or low quality.

**Solution:**

```typescript
// Increase quality setting
exportHighQuality(): void {
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'high-quality.pdf',
      quality: 3, // Use highest quality
      compress: false // Disable compression
    }
  );
}

// Ensure content has appropriate dimensions
.content-to-export {
  width: 210mm; /* A4 width */
  min-height: 297mm; /* A4 height */
}
```

### Issue: Content Cut Off

**Problem:** Content is cut off or not fully visible in PDF.

**Solution:**

```typescript
// 1. Adjust margins
exportWithMargins(): void {
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'document.pdf',
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  );
}

// 2. Ensure content fits page width
.exportable-content {
  max-width: 100%;
  box-sizing: border-box;
}

// 3. Handle page breaks
.page-break {
  page-break-after: always;
}
```

### Issue: Slow Export Performance

**Problem:** PDF export takes too long or freezes the browser.

**Solution:**

```typescript
// 1. Show loading indicator
isExporting = false;

async exportWithProgress(): Promise<void> {
  this.isExporting = true;
  
  try {
    await this.pdfExportService.exportToPdf(
      this.contentElement.nativeElement,
      'document.pdf'
    );
  } finally {
    this.isExporting = false;
  }
}

// 2. Reduce quality for faster export
exportFast(): void {
  this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    {
      filename: 'document.pdf',
      quality: 1 // Lower quality = faster export
    }
  );
}

// 3. Optimize content before export
async exportOptimized(): Promise<void> {
  // Remove unnecessary elements
  const tempElements = this.contentElement.nativeElement.querySelectorAll('.no-export');
  tempElements.forEach(el => el.style.display = 'none');
  
  await this.pdfExportService.exportToPdf(
    this.contentElement.nativeElement,
    'document.pdf'
  );
  
  // Restore elements
  tempElements.forEach(el => el.style.display = '');
}
```

### Issue: TypeScript Errors

**Problem:** Getting type errors when using the service.

**Solution:**

```typescript
// Ensure proper imports
import { RmNgPdfExportService, PdfExportOptions } from '@codewithrajat/rm-ng-pdf-export';

// Use proper typing
export class MyComponent {
  constructor(private pdfExportService: RmNgPdfExportService) {}
  
  exportDocument(): void {
    const options: PdfExportOptions = {
      filename: 'document.pdf',
      format: 'a4',
      orientation: 'portrait'
    };
    
    this.pdfExportService.exportToPdf(
      this.contentElement.nativeElement,
      options
    );
  }
}
```

### Issue: CORS Errors with External Images

**Problem:** External images fail to load due to CORS restrictions.

**Solution:**

```typescript
// 1. Use proxy for external images
// 2. Add crossorigin attribute
<img src="https://example.com/image.jpg" crossorigin="anonymous">

// 3. Convert to data URL
async convertImageToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
```
