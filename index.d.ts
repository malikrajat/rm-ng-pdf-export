import * as i0 from '@angular/core';
import { InjectionToken, ElementRef, AfterContentInit } from '@angular/core';

interface PdfExportConfig {
    pageSize?: string;
    orientation?: 'portrait' | 'landscape';
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
    private config;
    private platformId;
    constructor(config: PdfExportConfig, platformId: object);
    exportHtml(element: HTMLElement, overrideConfig?: PdfExportConfig): Promise<void>;
    private _triggerDownload;
    private _widthPxToPt;
    private _heightPxToPt;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PdfExportService>;
}

declare class PdfExportDirective {
    private el;
    private svc;
    pdfConfig?: PdfExportConfig;
    constructor(el: ElementRef, svc: PdfExportService);
    onClick(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PdfExportDirective, "[rmPdfExport]", never, { "pdfConfig": { "alias": "pdfConfig"; "required": false; }; }, {}, never, never, true, never>;
}

declare class PdfExportComponent implements AfterContentInit {
    private svc;
    content: ElementRef;
    constructor(svc: PdfExportService);
    ngAfterContentInit(): void;
    export(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdfExportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdfExportComponent, "rm-pdf-export", never, {}, {}, ["content"], ["*"], true, never>;
}

export { PDF_EXPORT_CONFIG, PdfExportComponent, PdfExportDirective, PdfExportService };
export type { PdfExportConfig };
