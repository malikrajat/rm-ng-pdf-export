# 📊 Basic Usage Example

This example demonstrates the simplest way to use `rm-ng-pdf-export` to convert HTML content to PDF.

## 🎯 What You'll Learn

- Basic service injection and usage
- Simple HTML to PDF conversion
- Default configuration options
- Error handling basics

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200
```

## 📋 Features Demonstrated

- ✅ Service-based PDF export
- ✅ ViewChild reference usage
- ✅ Basic error handling
- ✅ Default A4 portrait layout
- ✅ Simple content structure

## 💻 Code Overview

### Component Implementation

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from 'rm-ng-pdf-export';

@Component({
  selector: 'app-basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.css']
})
export class BasicExampleComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  
  isExporting = false;

  constructor(private pdfService: PdfExportService) {}

  async exportToPdf() {
    this.isExporting = true;
    
    try {
      await this.pdfService.exportHtml(this.pdfContent.nativeElement, {
        filename: 'basic-example.pdf'
      });
      
      console.log('PDF exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      this.isExporting = false;
    }
  }
}
```

### Template Structure

```html
<div class="container">
  <h1>Basic PDF Export Example</h1>
  
  <!-- Content to be exported -->
  <div #pdfContent class="pdf-content">
    <header class="document-header">
      <h1>Sample Document</h1>
      <p class="subtitle">Generated using rm-ng-pdf-export</p>
      <hr>
    </header>
    
    <main class="document-body">
      <section>
        <h2>Introduction</h2>
        <p>This is a basic example of HTML to PDF conversion using the rm-ng-pdf-export library.</p>
      </section>
      
      <section>
        <h2>Features</h2>
        <ul>
          <li>Simple service-based API</li>
          <li>High-quality PDF output</li>
          <li>Preserves HTML styling</li>
          <li>Easy integration with Angular</li>
        </ul>
      </section>
      
      <section>
        <h2>Sample Table</h2>
        <table class="sample-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PDF Export</td>
              <td>✅ Active</td>
              <td>Convert HTML to PDF</td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>✅ Active</td>
              <td>Preserve CSS styles</td>
            </tr>
            <tr>
              <td>Page Breaking</td>
              <td>✅ Active</td>
              <td>Smart page breaks</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
    
    <footer class="document-footer">
      <p>Generated on: {{ currentDate | date:'medium' }}</p>
    </footer>
  </div>
  
  <!-- Export Controls -->
  <div class="export-controls">
    <button 
      (click)="exportToPdf()" 
      [disabled]="isExporting"
      class="export-btn">
      {{ isExporting ? 'Exporting...' : 'Export to PDF' }}
    </button>
  </div>
</div>
```

### Styling

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.pdf-content {
  background: white;
  padding: 40px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.document-header {
  text-align: center;
  margin-bottom: 30px;
}

.document-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-style: italic;
}

.document-body section {
  margin-bottom: 25px;
}

.document-body h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.sample-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.sample-table th,
.sample-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.sample-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.document-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.9em;
}

.export-controls {
  text-align: center;
  margin: 30px 0;
}

.export-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## 🔧 Module Setup

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfExportService } from 'rm-ng-pdf-export';

import { AppComponent } from './app.component';
import { BasicExampleComponent } from './basic-example.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicExampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PdfExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 📱 Responsive Considerations

The example includes responsive design considerations:

```css
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .pdf-content {
    padding: 20px;
  }
  
  .sample-table {
    font-size: 0.9em;
  }
  
  .sample-table th,
  .sample-table td {
    padding: 8px;
  }
}
```

## 🎯 Key Learning Points

1. **Service Injection**: How to inject and use `PdfExportService`
2. **ViewChild Usage**: Referencing DOM elements for PDF export
3. **Error Handling**: Basic try-catch for export operations
4. **Loading States**: Managing UI during export process
5. **Default Configuration**: Using library defaults for quick setup

## 🔄 Next Steps

After mastering this basic example, explore:

- [Invoice Generator](../invoice-generator/) - Professional document layouts
- [Styled Components](../styled-components/) - Advanced CSS styling
- [Advanced Configuration](../advanced-config/) - Custom settings and options

## 🐛 Common Issues

### Export Button Not Working
- Ensure `PdfExportService` is properly injected
- Check browser console for errors
- Verify ViewChild reference is set

### Styling Not Preserved
- Use inline styles for critical styling
- Avoid external font dependencies
- Test with web-safe fonts

### Large Content Issues
- Consider page breaking for long content
- Optimize images before export
- Use the multi-page example for guidance

## 📞 Support

Need help with this example?
- 📧 Email: [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- 🐛 Report issues: [GitHub Issues](https://github.com/malikrajat/rm-ng-pdf-export/issues)