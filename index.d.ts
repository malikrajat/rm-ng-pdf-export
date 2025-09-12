import * as i0 from '@angular/core';
import { InjectionToken, ElementRef } from '@angular/core';

type PageSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'Executive' | 'B4' | 'B5';
type PageOrientation = 'portrait' | 'landscape';
interface PdfExportConfig {
    pageSize?: PageSize;
    orientation?: PageOrientation;
    margins?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    filename?: string;
    metadata?: {
        title?: string;
        author?: string;
        subject?: string;
    };
    openInNewTab?: boolean;
}
declare const PDF_EXPORT_CONFIG: InjectionToken<PdfExportConfig>;

declare class PdfExportService {
    private readonly config;
    private readonly platformId;
    private readonly PAGE_SIZES;
    constructor(config: PdfExportConfig, platformId: object);
    exportHtml(element: HTMLElement, overrideConfig?: PdfExportConfig): Promise<void>;
    private _triggerDownload;
    private _widthPxToPt;
    private _heightPxToPt;
    /**
     * Get page dimensions based on page size and orientation
     */
    private _getPageDimensions;
    /**
     * Get available page sizes
     */
    getAvailablePageSizes(): string[];
    /**
     * Calculate the scale factor to fit content width to page width
     */
    private _calculateScaleFactor;
    /**
     * Calculate how many pages are needed for the given content height
     */
    private _calculateRequiredPages;
    /**
     * Detect optimal content break points by analyzing element boundaries
     */
    private _detectContentBreakPoints;
    /**
     * Calculate smart page breaks that respect content boundaries
     */
    private _calculateSmartPageBreaks;
    /**
     * Create a canvas section for a specific page with smart boundaries
     */
    private _createSmartPageCanvas;
    /**
     * Create a canvas section for a specific page
     */
    private _createPageCanvas;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PdfExportService>;
}

declare class PdfExportDirective {
    private readonly el;
    private readonly svc;
    pageSize?: PageSize;
    orientation?: PageOrientation;
    filename?: string;
    openInNewTab?: boolean;
    pdfConfig?: PdfExportConfig;
    constructor(el: ElementRef, svc: PdfExportService);
    onClick(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PdfExportDirective, "[rmPdfExport]", never, { "pageSize": { "alias": "pageSize"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "filename": { "alias": "filename"; "required": false; }; "openInNewTab": { "alias": "openInNewTab"; "required": false; }; "pdfConfig": { "alias": "pdfConfig"; "required": false; }; }, {}, never, never, true, never>;
}

declare class PdfExportComponent {
    private readonly svc;
    content: ElementRef;
    pageSize?: PageSize;
    orientation?: PageOrientation;
    filename?: string;
    openInNewTab?: boolean;
    pdfConfig?: PdfExportConfig;
    constructor(svc: PdfExportService);
    export(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdfExportComponent, "rm-pdf-export", never, { "pageSize": { "alias": "pageSize"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "filename": { "alias": "filename"; "required": false; }; "openInNewTab": { "alias": "openInNewTab"; "required": false; }; "pdfConfig": { "alias": "pdfConfig"; "required": false; }; }, {}, ["content"], ["*"], true, never>;
}

export { PDF_EXPORT_CONFIG, PdfExportComponent, PdfExportDirective, PdfExportService };
export type { PageOrientation, PageSize, PdfExportConfig };
