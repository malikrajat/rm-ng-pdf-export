import * as i0 from '@angular/core';
import { InjectionToken, PLATFORM_ID, Inject, Injectable, HostListener, Input, Directive, ElementRef, ContentChild, Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';

// pdf-export-config.token.ts
const PDF_EXPORT_CONFIG = new InjectionToken('PDF_EXPORT_CONFIG');

class PdfExportService {
    config;
    platformId;
    constructor(config, platformId) {
        this.config = config;
        this.platformId = platformId;
    }
    async exportHtml(element, overrideConfig) {
        if (!isPlatformBrowser(this.platformId)) {
            throw new Error('PDF export is only supported in browser environments.');
        }
        const config = { ...this.config, ...overrideConfig };
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = await PDFDocument.create();
        const page = pdf.addPage([
            this._widthPxToPt(canvas.width),
            this._heightPxToPt(canvas.height),
        ]);
        const png = await pdf.embedPng(imgData);
        page.drawImage(png, {
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight()
        });
        if (config.metadata) {
            pdf.setTitle(config.metadata.title || '');
            pdf.setAuthor(config.metadata.author || '');
            pdf.setSubject(config.metadata.subject || '');
        }
        const bytes = await pdf.save();
        this._triggerDownload(bytes, config.filename || 'document.pdf', config.openInNewTab);
    }
    _triggerDownload(data, filename, openInNewTab) {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        if (openInNewTab) {
            window.open(url, '_blank');
        }
        else {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        }
        URL.revokeObjectURL(url);
    }
    _widthPxToPt(px) {
        return (px * 72) / 96;
    }
    _heightPxToPt(px) {
        return (px * 72) / 96;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportService, deps: [{ token: PDF_EXPORT_CONFIG }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PDF_EXPORT_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });

// pdf-export.directive.ts
class PdfExportDirective {
    el;
    svc;
    pdfConfig;
    constructor(el, svc) {
        this.el = el;
        this.svc = svc;
    }
    async onClick() {
        await this.svc.exportHtml(this.el.nativeElement, this.pdfConfig);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportDirective, deps: [{ token: i0.ElementRef }, { token: PdfExportService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.5", type: PdfExportDirective, isStandalone: true, selector: "[rmPdfExport]", inputs: { pdfConfig: "pdfConfig" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rmPdfExport]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: PdfExportService }], propDecorators: { pdfConfig: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

// pdf-export.component.ts
class PdfExportComponent {
    svc;
    content;
    constructor(svc) {
        this.svc = svc;
    }
    ngAfterContentInit() { }
    async export() {
        await this.svc.exportHtml(this.content.nativeElement);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportComponent, deps: [{ token: PdfExportService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.0.5", type: PdfExportComponent, isStandalone: true, selector: "rm-pdf-export", queries: [{ propertyName: "content", first: true, predicate: ["pdfContent"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `<ng-content></ng-content><button (click)="export()">Export PDF</button>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rm-pdf-export',
                    template: `<ng-content></ng-content><button (click)="export()">Export PDF</button>`
                }]
        }], ctorParameters: () => [{ type: PdfExportService }], propDecorators: { content: [{
                type: ContentChild,
                args: ['pdfContent', { read: ElementRef, static: true }]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { PDF_EXPORT_CONFIG, PdfExportComponent, PdfExportDirective, PdfExportService };
//# sourceMappingURL=codewithrajat-rm-ng-pdf-export.mjs.map
