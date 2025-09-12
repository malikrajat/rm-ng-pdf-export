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
    // Predefined page sizes in points (72 DPI)
    PAGE_SIZES = {
        'A4': { name: 'A4', width: 595.28, height: 841.89 },
        'A3': { name: 'A3', width: 841.89, height: 1190.55 },
        'A5': { name: 'A5', width: 419.53, height: 595.28 },
        'Letter': { name: 'Letter', width: 612, height: 792 },
        'Legal': { name: 'Legal', width: 612, height: 1008 },
        'Tabloid': { name: 'Tabloid', width: 792, height: 1224 },
        'Ledger': { name: 'Ledger', width: 1224, height: 792 },
        'Executive': { name: 'Executive', width: 522, height: 756 },
        'B4': { name: 'B4', width: 708.66, height: 1000.63 },
        'B5': { name: 'B5', width: 498.90, height: 708.66 }
    };
    constructor(config, platformId) {
        this.config = config;
        this.platformId = platformId;
    }
    async exportHtml(element, overrideConfig) {
        if (!isPlatformBrowser(this.platformId)) {
            throw new Error('PDF export is only supported in browser environments.');
        }
        const config = { ...this.config, ...overrideConfig };
        // Get page dimensions based on configuration
        const pageSize = config.pageSize || 'A4';
        const orientation = config.orientation || 'portrait';
        const pageDimensions = this._getPageDimensions(pageSize, orientation);
        // Convert HTML element to canvas
        const canvas = await html2canvas(element);
        // Calculate scale factor to fit content width to page width
        const scaleFactor = this._calculateScaleFactor(canvas.width, pageDimensions.width);
        // Detect optimal break points in the content
        const breakPoints = this._detectContentBreakPoints(element, canvas, scaleFactor);
        // Calculate smart page breaks
        const pageBreaks = this._calculateSmartPageBreaks(canvas.height, scaleFactor, pageDimensions.height, breakPoints);
        // Create PDF document
        const pdf = await PDFDocument.create();
        // Add metadata if provided
        if (config.metadata) {
            pdf.setTitle(config.metadata.title || '');
            pdf.setAuthor(config.metadata.author || '');
            pdf.setSubject(config.metadata.subject || '');
        }
        // Generate each page with smart breaks
        for (let pageIndex = 0; pageIndex < pageBreaks.length; pageIndex++) {
            const currentBreak = pageBreaks[pageIndex];
            const nextBreak = pageBreaks[pageIndex + 1];
            // Create canvas for this page with smart bounds
            const pageCanvas = this._createSmartPageCanvas(canvas, currentBreak, nextBreak, scaleFactor, pageDimensions);
            // Convert page canvas to image data
            const pageImgData = pageCanvas.toDataURL('image/png');
            // Add page to PDF with configured dimensions
            const page = pdf.addPage([pageDimensions.width, pageDimensions.height]);
            // Embed the image and draw it on the page
            const png = await pdf.embedPng(pageImgData);
            page.drawImage(png, {
                x: 0,
                y: 0,
                width: pageDimensions.width,
                height: pageDimensions.height
            });
        }
        // Save and download the PDF
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
    /**
     * Get page dimensions based on page size and orientation
     */
    _getPageDimensions(pageSize = 'A4', orientation = 'portrait') {
        const pageDef = this.PAGE_SIZES[pageSize.toUpperCase()];
        if (!pageDef) {
            throw new Error(`Unsupported page size: ${pageSize}. Supported sizes: ${Object.keys(this.PAGE_SIZES).join(', ')}`);
        }
        if (orientation === 'landscape') {
            return {
                width: pageDef.height,
                height: pageDef.width
            };
        }
        else {
            return {
                width: pageDef.width,
                height: pageDef.height
            };
        }
    }
    /**
     * Get available page sizes
     */
    getAvailablePageSizes() {
        return Object.keys(this.PAGE_SIZES);
    }
    /**
     * Calculate the scale factor to fit content width to page width
     */
    _calculateScaleFactor(canvasWidth, pageWidth) {
        const contentWidthInPoints = this._widthPxToPt(canvasWidth);
        return pageWidth / contentWidthInPoints;
    }
    /**
     * Calculate how many pages are needed for the given content height
     */
    _calculateRequiredPages(canvasHeight, scaleFactor, pageHeight) {
        const scaledHeightInPoints = this._heightPxToPt(canvasHeight) * scaleFactor;
        return Math.ceil(scaledHeightInPoints / pageHeight);
    }
    /**
     * Detect optimal content break points by analyzing element boundaries
     */
    _detectContentBreakPoints(element, canvas, scaleFactor) {
        const breakPoints = [];
        // Add start point
        breakPoints.push({ y: 0, priority: 10, elementType: 'start' });
        // Find elements with page-break CSS properties
        const sectionsElements = element.querySelectorAll('.pdf-section, section, .content-block, .blog-card, .feature-card');
        sectionsElements.forEach((el) => {
            const htmlEl = el;
            const rect = htmlEl.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            // Calculate relative position to the exported element
            const relativeTop = rect.top - elementRect.top;
            const relativeBottom = rect.bottom - elementRect.top;
            // Convert to canvas coordinates
            const canvasTop = relativeTop * (canvas.height / element.scrollHeight);
            const canvasBottom = relativeBottom * (canvas.height / element.scrollHeight);
            // Check CSS page-break properties
            const computedStyle = window.getComputedStyle(htmlEl);
            const pageBreakBefore = computedStyle.getPropertyValue('page-break-before');
            const pageBreakAfter = computedStyle.getPropertyValue('page-break-after');
            const pageBreakInside = computedStyle.getPropertyValue('page-break-inside');
            // Add break point before element if requested
            if (pageBreakBefore === 'always' || pageBreakBefore === 'auto') {
                breakPoints.push({
                    y: canvasTop,
                    priority: pageBreakBefore === 'always' ? 9 : 7,
                    elementType: htmlEl.className || htmlEl.tagName.toLowerCase()
                });
            }
            // Add break point after element if requested
            if (pageBreakAfter === 'always' || pageBreakAfter === 'auto') {
                breakPoints.push({
                    y: canvasBottom,
                    priority: pageBreakAfter === 'always' ? 9 : 7,
                    elementType: htmlEl.className || htmlEl.tagName.toLowerCase()
                });
            }
            // If element should not be broken inside, add high-priority boundaries
            if (pageBreakInside === 'avoid') {
                breakPoints.push({
                    y: canvasTop,
                    priority: 8,
                    elementType: `${htmlEl.className || htmlEl.tagName.toLowerCase()}-start`
                });
                breakPoints.push({
                    y: canvasBottom,
                    priority: 8,
                    elementType: `${htmlEl.className || htmlEl.tagName.toLowerCase()}-end`
                });
            }
        });
        // Add end point
        breakPoints.push({ y: canvas.height, priority: 10, elementType: 'end' });
        // Sort by Y position
        breakPoints.sort((a, b) => a.y - b.y);
        // Remove duplicates and very close points
        const cleanedBreakPoints = [];
        for (let i = 0; i < breakPoints.length; i++) {
            const current = breakPoints[i];
            const lastAdded = cleanedBreakPoints[cleanedBreakPoints.length - 1];
            // Keep if it's the first point or far enough from the last point
            if (!lastAdded || Math.abs(current.y - lastAdded.y) > 20) {
                cleanedBreakPoints.push(current);
            }
            else if (current.priority > lastAdded.priority) {
                // Replace with higher priority point
                cleanedBreakPoints[cleanedBreakPoints.length - 1] = current;
            }
        }
        return cleanedBreakPoints;
    }
    /**
     * Calculate smart page breaks that respect content boundaries
     */
    _calculateSmartPageBreaks(canvasHeight, scaleFactor, pageHeight, breakPoints) {
        const pageHeightPx = (pageHeight * 96) / 72 / scaleFactor;
        const pageBreaks = [];
        let currentPageStart = 0;
        pageBreaks.push(currentPageStart);
        while (currentPageStart < canvasHeight) {
            const idealPageEnd = currentPageStart + pageHeightPx;
            if (idealPageEnd >= canvasHeight) {
                // Last page
                break;
            }
            // Find the best break point near the ideal page end
            let bestBreakPoint = idealPageEnd;
            let bestPriority = 0;
            // Look for break points within a reasonable range of the ideal end
            const searchRange = pageHeightPx * 0.2; // 20% of page height
            const searchStart = Math.max(currentPageStart + pageHeightPx * 0.5, idealPageEnd - searchRange);
            const searchEnd = idealPageEnd + searchRange;
            for (const breakPoint of breakPoints) {
                if (breakPoint.y >= searchStart && breakPoint.y <= searchEnd && breakPoint.y > currentPageStart) {
                    if (breakPoint.priority > bestPriority) {
                        bestBreakPoint = breakPoint.y;
                        bestPriority = breakPoint.priority;
                    }
                }
            }
            // If no good break point found, use the ideal position
            if (bestPriority === 0) {
                bestBreakPoint = idealPageEnd;
            }
            currentPageStart = bestBreakPoint;
            pageBreaks.push(currentPageStart);
        }
        return pageBreaks;
    }
    /**
     * Create a canvas section for a specific page with smart boundaries
     */
    _createSmartPageCanvas(sourceCanvas, pageStartY, pageEndY, scaleFactor, pageDimensions) {
        const pageCanvas = document.createElement('canvas');
        const ctx = pageCanvas.getContext('2d');
        // Page dimensions in pixels (at 96 DPI)
        const pageWidthPx = (pageDimensions.width * 96) / 72;
        const pageHeightPx = (pageDimensions.height * 96) / 72;
        pageCanvas.width = pageWidthPx;
        pageCanvas.height = pageHeightPx;
        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        // Calculate source height for this page
        const sourceHeight = pageEndY ? (pageEndY - pageStartY) : (sourceCanvas.height - pageStartY);
        if (sourceHeight > 0) {
            // Draw the source canvas section onto the page canvas with scaling
            ctx.drawImage(sourceCanvas, 0, pageStartY, sourceCanvas.width, sourceHeight, // source (x, y, width, height)
            0, 0, pageWidthPx, sourceHeight * scaleFactor // destination (x, y, width, height)
            );
        }
        return pageCanvas;
    }
    /**
     * Create a canvas section for a specific page
     */
    _createPageCanvas(sourceCanvas, pageIndex, scaleFactor, pageDimensions) {
        const pageCanvas = document.createElement('canvas');
        const ctx = pageCanvas.getContext('2d');
        // Page dimensions in pixels (at 96 DPI)
        const pageWidthPx = (pageDimensions.width * 96) / 72;
        const pageHeightPx = (pageDimensions.height * 96) / 72;
        pageCanvas.width = pageWidthPx;
        pageCanvas.height = pageHeightPx;
        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        // Calculate the height of content that fits on one page in source canvas pixels
        const contentHeightPerPage = pageHeightPx / scaleFactor;
        // Calculate source coordinates for this page
        const sourceY = pageIndex * contentHeightPerPage;
        const sourceHeight = Math.min(contentHeightPerPage, sourceCanvas.height - sourceY);
        if (sourceHeight > 0) {
            // Draw the source canvas section onto the page canvas with scaling
            ctx.drawImage(sourceCanvas, 0, sourceY, sourceCanvas.width, sourceHeight, // source (x, y, width, height)
            0, 0, pageWidthPx, sourceHeight * scaleFactor // destination (x, y, width, height)
            );
        }
        return pageCanvas;
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
    // Individual configuration inputs
    pageSize;
    orientation;
    filename;
    openInNewTab;
    // Full configuration object input (takes precedence)
    pdfConfig;
    constructor(el, svc) {
        this.el = el;
        this.svc = svc;
    }
    async onClick() {
        // Build configuration from individual inputs or use provided config
        const config = this.pdfConfig || {
            pageSize: this.pageSize,
            orientation: this.orientation,
            filename: this.filename,
            openInNewTab: this.openInNewTab
        };
        await this.svc.exportHtml(this.el.nativeElement, config);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportDirective, deps: [{ token: i0.ElementRef }, { token: PdfExportService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.5", type: PdfExportDirective, isStandalone: true, selector: "[rmPdfExport]", inputs: { pageSize: "pageSize", orientation: "orientation", filename: "filename", openInNewTab: "openInNewTab", pdfConfig: "pdfConfig" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rmPdfExport]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: PdfExportService }], propDecorators: { pageSize: [{
                type: Input
            }], orientation: [{
                type: Input
            }], filename: [{
                type: Input
            }], openInNewTab: [{
                type: Input
            }], pdfConfig: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

// pdf-export.component.ts
class PdfExportComponent {
    svc;
    content;
    // Individual configuration inputs
    pageSize;
    orientation;
    filename;
    openInNewTab;
    // Full configuration object input (takes precedence)
    pdfConfig;
    constructor(svc) {
        this.svc = svc;
    }
    async export() {
        // Build configuration from individual inputs or use provided config
        const config = this.pdfConfig || {
            pageSize: this.pageSize,
            orientation: this.orientation,
            filename: this.filename,
            openInNewTab: this.openInNewTab
        };
        await this.svc.exportHtml(this.content.nativeElement, config);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.5", ngImport: i0, type: PdfExportComponent, deps: [{ token: PdfExportService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.0.5", type: PdfExportComponent, isStandalone: true, selector: "rm-pdf-export", inputs: { pageSize: "pageSize", orientation: "orientation", filename: "filename", openInNewTab: "openInNewTab", pdfConfig: "pdfConfig" }, queries: [{ propertyName: "content", first: true, predicate: ["pdfContent"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `<ng-content></ng-content><button (click)="export()">Export PDF</button>`, isInline: true });
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
            }], pageSize: [{
                type: Input
            }], orientation: [{
                type: Input
            }], filename: [{
                type: Input
            }], openInNewTab: [{
                type: Input
            }], pdfConfig: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { PDF_EXPORT_CONFIG, PdfExportComponent, PdfExportDirective, PdfExportService };
//# sourceMappingURL=codewithrajat-rm-ng-pdf-export.mjs.map
