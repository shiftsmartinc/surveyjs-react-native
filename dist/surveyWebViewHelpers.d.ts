export declare const SURVEY_HTML_ROOT_ID = "survey-html-root";
export declare const ANDROID_HTML_BASE_URL = "https://surveyjs.invalid/";
export declare function getMaxWebViewHeight(): number;
export declare function buildInlineHtmlDocument(headTags: string, bodyHtml: string): string;
export declare function webViewSourceForInlineHtml(html: string): {
    html: string;
    baseUrl: string;
} | {
    html: string;
    baseUrl?: undefined;
};
export declare function getAndroidInitialWebViewHeight(): number;
type HeightCompute = {
    displayHeight: number;
    scrollInsideWebView: boolean;
};
export declare function computeWebViewLayout(measured: number, options?: {
    defaultHeight?: number;
}): HeightCompute;
export {};
