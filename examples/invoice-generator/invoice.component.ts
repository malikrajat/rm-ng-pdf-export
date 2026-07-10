import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
}

interface Invoice {
    number: string;
    date: Date;
    dueDate: Date;
    client: {
        name: string;
        address: string;
        email: string;
    };
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
}

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="invoice-container">
      <div #invoiceContent class="invoice">
        <div class="invoice-header">
          <div class="company-info">
            <h1>ACME Corporation</h1>
            <p>123 Business St</p>
            <p>Business City, BC 12345</p>
            <p>contact@acme.com</p>
          </div>
          
          <div class="invoice-details">
            <h2>INVOICE</h2>
            <p><strong>Invoice #:</strong> {{ invoice.number }}</p>
            <p><strong>Date:</strong> {{ invoice.date | date:'MMM d, yyyy' }}</p>
            <p><strong>Due Date:</strong> {{ invoice.dueDate | date:'MMM d, yyyy' }}</p>
          </div>
        </div>

        <div class="client-info">
          <h3>Bill To:</h3>
          <p><strong>{{ invoice.client.name }}</strong></p>
          <p>{{ invoice.client.address }}</p>
          <p>{{ invoice.client.email }}</p>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of invoice.items">
              <td>{{ item.description }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price | currency }}</td>
              <td>{{ item.total | currency }}</td>
            </tr>
          </tbody>
        </table>

        <div class="invoice-totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>{{ invoice.subtotal | currency }}</span>
          </div>
          <div class="total-row">
            <span>Tax (10%):</span>
            <span>{{ invoice.tax | currency }}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total:</span>
            <span>{{ invoice.total | currency }}</span>
          </div>
        </div>

        <div class="invoice-footer">
          <p>Thank you for your business!</p>
          <p class="terms">Payment is due within 30 days</p>
        </div>
      </div>

      <div class="action-buttons">
        <button (click)="exportInvoice()" class="export-btn">
          Download PDF
        </button>
        <button (click)="printInvoice()" class="print-btn">
          Print Invoice
        </button>
      </div>
    </div>
  `,
    styles: [`
    .invoice-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .invoice {
      background: white;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #333;
    }
    .company-info h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      color: #333;
    }
    .company-info p {
      margin: 5px 0;
      color: #666;
    }
    .invoice-details {
      text-align: right;
    }
    .invoice-details h2 {
      margin: 0 0 15px 0;
      font-size: 32px;
      color: #007bff;
    }
    .invoice-details p {
      margin: 5px 0;
    }
    .client-info {
      margin-bottom: 30px;
    }
    .client-info h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .client-info p {
      margin: 5px 0;
      color: #666;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .invoice-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #dee2e6;
      font-weight: 600;
    }
    .invoice-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
    }
    .invoice-table tbody tr:hover {
      background: #f8f9fa;
    }
    .invoice-totals {
      margin-left: auto;
      width: 300px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 16px;
    }
    .grand-total {
      border-top: 2px solid #333;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
    }
    .invoice-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      text-align: center;
    }
    .invoice-footer p {
      margin: 10px 0;
    }
    .terms {
      font-size: 14px;
      color: #666;
      font-style: italic;
    }
    .action-buttons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
    }
    button {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
    }
    .export-btn {
      background: #007bff;
      color: white;
    }
    .export-btn:hover {
      background: #0056b3;
    }
    .print-btn {
      background: #6c757d;
      color: white;
    }
    .print-btn:hover {
      background: #545b62;
    }
  `]
})
export class InvoiceComponent {
    @ViewChild('invoiceContent') invoiceContent!: ElementRef;

    invoice: Invoice = {
        number: 'INV-2024-001',
        date: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: {
            name: 'John Doe',
            address: '456 Client Ave, Client City, CC 67890',
            email: 'john.doe@example.com'
        },
        items: [
            {
                description: 'Web Development Services',
                quantity: 40,
                price: 100,
                total: 4000
            },
            {
                description: 'UI/UX Design',
                quantity: 20,
                price: 80,
                total: 1600
            },
            {
                description: 'Consulting',
                quantity: 10,
                price: 150,
                total: 1500
            }
        ],
        subtotal: 7100,
        tax: 710,
        total: 7810
    };

    constructor(private pdfExportService: PdfExportService) { }

    exportInvoice(): void {
        this.pdfExportService.exportHtml(
            this.invoiceContent.nativeElement,
            {
                filename: `invoice-${this.invoice.number}.pdf`,
                pageSize: 'A4',
                orientation: 'portrait',
                margins: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            }
        );
    }

    printInvoice(): void {
        window.print();
    }
}
