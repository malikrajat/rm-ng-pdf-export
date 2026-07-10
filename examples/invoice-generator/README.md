# 📋 Invoice Generator Example

A professional invoice template demonstrating real-world PDF generation with company branding, itemized billing, calculations, and professional formatting.

## 🎯 What You'll Learn

- Professional document layout design
- Dynamic data binding for invoices
- Automatic calculations (subtotal, tax, total)
- Company branding and logos
- Table formatting and styling
- Custom metadata configuration

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📋 Features Demonstrated

- ✅ Professional invoice layout
- ✅ Company logo and branding
- ✅ Client information section
- ✅ Itemized billing table
- ✅ Automatic calculations
- ✅ Tax and discount handling
- ✅ Payment terms and notes
- ✅ Custom PDF metadata

## 💻 Component Implementation

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from 'rm-ng-pdf-export';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Invoice {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  client: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
}

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.css']
})
export class InvoiceGeneratorComponent {
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  
  invoice: Invoice = {
    invoiceNumber: 'INV-2025-001',
    invoiceDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    company: {
      name: 'Your Company Name',
      address: '123 Business Street, Suite 100, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'billing@yourcompany.com'
    },
    client: {
      name: 'Client Company Inc.',
      address: '456 Client Avenue, City, State 67890',
      phone: '+1 (555) 987-6543',
      email: 'accounts@clientcompany.com'
    },
    items: [
      { description: 'Web Development Services', quantity: 40, unitPrice: 150, amount: 6000 },
      { description: 'UI/UX Design', quantity: 20, unitPrice: 120, amount: 2400 },
      { description: 'Consulting Hours', quantity: 10, unitPrice: 200, amount: 2000 },
      { description: 'Project Management', quantity: 15, unitPrice: 100, amount: 1500 }
    ],
    taxRate: 0.08, // 8% tax
    notes: 'Payment is due within 30 days. Please include invoice number with payment.'
  };

  get subtotal(): number {
    return this.invoice.items.reduce((sum, item) => sum + item.amount, 0);
  }

  get taxAmount(): number {
    return this.subtotal * this.invoice.taxRate;
  }

  get total(): number {
    return this.subtotal + this.taxAmount;
  }

  constructor(private pdfService: PdfExportService) {}

  async exportInvoice() {
    try {
      await this.pdfService.exportHtml(this.invoiceContent.nativeElement, {
        filename: `Invoice-${this.invoice.invoiceNumber}.pdf`,
        pageSize: 'A4',
        orientation: 'portrait',
        metadata: {
          title: `Invoice ${this.invoice.invoiceNumber}`,
          author: this.invoice.company.name,
          subject: `Invoice for ${this.invoice.client.name}`
        }
      });
    } catch (error) {
      console.error('Failed to export invoice:', error);
    }
  }

  addItem() {
    this.invoice.items.push({
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0
    });
  }

  removeItem(index: number) {
    this.invoice.items.splice(index, 1);
  }

  updateAmount(item: InvoiceItem) {
    item.amount = item.quantity * item.unitPrice;
  }
}
```

## 🎨 Template Structure

```html
<div class="container">
  <div class="controls">
    <button (click)="exportInvoice()" class="export-btn">
      📄 Export Invoice PDF
    </button>
  </div>

  <div #invoiceContent class="invoice-container">
    <!-- Header -->
    <header class="invoice-header">
      <div class="company-info">
        <h1>{{ invoice.company.name }}</h1>
        <p>{{ invoice.company.address }}</p>
        <p>Phone: {{ invoice.company.phone }}</p>
        <p>Email: {{ invoice.company.email }}</p>
      </div>
      <div class="invoice-title">
        <h2>INVOICE</h2>
        <p class="invoice-number">{{ invoice.invoiceNumber }}</p>
      </div>
    </header>

    <!-- Invoice Details -->
    <section class="invoice-details">
      <div class="detail-row">
        <div class="detail-col">
          <h3>Bill To:</h3>
          <p><strong>{{ invoice.client.name }}</strong></p>
          <p>{{ invoice.client.address }}</p>
          <p>{{ invoice.client.phone }}</p>
          <p>{{ invoice.client.email }}</p>
        </div>
        <div class="detail-col">
          <table class="info-table">
            <tr>
              <td><strong>Invoice Date:</strong></td>
              <td>{{ invoice.invoiceDate | date:'mediumDate' }}</td>
            </tr>
            <tr>
              <td><strong>Due Date:</strong></td>
              <td>{{ invoice.dueDate | date:'mediumDate' }}</td>
            </tr>
            <tr>
              <td><strong>Invoice #:</strong></td>
              <td>{{ invoice.invoiceNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>

    <!-- Items Table -->
    <section class="invoice-items">
      <table class="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of invoice.items">
            <td>{{ item.description }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitPrice | currency }}</td>
            <td>{{ item.amount | currency }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Totals -->
    <section class="invoice-totals">
      <div class="totals-table">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>{{ subtotal | currency }}</span>
        </div>
        <div class="total-row">
          <span>Tax ({{ invoice.taxRate * 100 }}%):</span>
          <span>{{ taxAmount | currency }}</span>
        </div>
        <div class="total-row grand-total">
          <span><strong>Total:</strong></span>
          <span><strong>{{ total | currency }}</strong></span>
        </div>
      </div>
    </section>

    <!-- Notes -->
    <section class="invoice-notes" *ngIf="invoice.notes">
      <h3>Notes:</h3>
      <p>{{ invoice.notes }}</p>
    </section>

    <!-- Footer -->
    <footer class="invoice-footer">
      <p>Thank you for your business!</p>
      <p class="footer-note">This is a computer-generated invoice.</p>
    </footer>
  </div>
</div>
```

## 🎨 Professional Styling

```css
.invoice-container {
  background: white;
  padding: 40px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 3px solid #2c3e50;
}

.company-info h1 {
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 24px;
}

.company-info p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.invoice-title {
  text-align: right;
}

.invoice-title h2 {
  color: #2c3e50;
  font-size: 36px;
  margin: 0;
}

.invoice-number {
  color: #3498db;
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.invoice-details {
  margin-bottom: 30px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.detail-col {
  flex: 1;
}

.detail-col h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 16px;
}

.detail-col p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.info-table {
  width: 100%;
}

.info-table td {
  padding: 5px 10px;
  font-size: 14px;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.items-table thead {
  background-color: #2c3e50;
  color: white;
}

.items-table th {
  padding: 12px;
  text-align: left;
  font-weight: bold;
}

.items-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.items-table tbody tr:hover {
  background-color: #f8f9fa;
}

.items-table td {
  padding: 12px;
  color: #333;
}

.items-table td:nth-child(2),
.items-table td:nth-child(3),
.items-table td:nth-child(4) {
  text-align: right;
}

.invoice-totals {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0;
}

.totals-table {
  width: 300px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 16px;
}

.total-row:not(.grand-total) {
  border-bottom: 1px solid #eee;
}

.grand-total {
  background-color: #2c3e50;
  color: white;
  font-size: 18px;
  margin-top: 10px;
}

.invoice-notes {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
}

.invoice-notes h3 {
  color: #2c3e50;
  margin-top: 0;
}

.invoice-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  color: #666;
}

.footer-note {
  font-size: 12px;
  font-style: italic;
  margin-top: 10px;
}

.controls {
  text-align: center;
  margin: 20px 0;
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

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

## 🔧 Key Features

### Dynamic Calculations
```typescript
get subtotal(): number {
  return this.invoice.items.reduce((sum, item) => sum + item.amount, 0);
}

get taxAmount(): number {
  return this.subtotal * this.invoice.taxRate;
}

get total(): number {
  return this.subtotal + this.taxAmount;
}
```

### Editable Items
```typescript
addItem() {
  this.invoice.items.push({
    description: '',
    quantity: 1,
    unitPrice: 0,
    amount: 0
  });
}

updateAmount(item: InvoiceItem) {
  item.amount = item.quantity * item.unitPrice;
}
```

## 📱 Print-Ready Styling

```css
@media print {
  .controls {
    display: none;
  }
  
  .invoice-container {
    box-shadow: none;
    margin: 0;
  }
}
```

## 🎯 Best Practices Demonstrated

1. **Professional Layout**: Clean, organized invoice structure
2. **Branding**: Company information prominently displayed
3. **Clear Sections**: Logical grouping of information
4. **Calculations**: Automatic totals and tax calculations
5. **Metadata**: Proper PDF metadata for organization
6. **Responsive Design**: Works on different screen sizes

## 🔄 Next Steps

- [Dashboard Export](../dashboard-export/) - Charts and visualizations
- [Multi-page Documents](../multi-page/) - Handling large invoices
- [Advanced Configuration](../advanced-config/) - Custom settings

## 📞 Support

Need help? Contact [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)