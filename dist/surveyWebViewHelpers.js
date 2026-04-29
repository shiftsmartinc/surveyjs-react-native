import { Dimensions, Platform } from 'react-native';
export const SURVEY_HTML_ROOT_ID = 'survey-html-root';
export const ANDROID_HTML_BASE_URL = 'https://surveyjs.invalid/';
export function getMaxWebViewHeight() {
    return Math.round(Dimensions.get('window').height * 0.78);
}
export function buildInlineHtmlDocument(headTags, bodyHtml) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8">${headTags}</head><body><div id="${SURVEY_HTML_ROOT_ID}">${bodyHtml}</div></body></html>`;
}
export function webViewSourceForInlineHtml(html) {
    if (Platform.OS === 'android') {
        return { html, baseUrl: ANDROID_HTML_BASE_URL };
    }
    return { html };
}
const ANDROID_MIN_DISPLAY = 200;
const ANDROID_FALLBACK_WHEN_UNMEASURED = 380;
export function getAndroidInitialWebViewHeight() {
    return Math.min(280, getMaxWebViewHeight());
}
export function computeWebViewLayout(measured, options) {
    const defaultHeight = options?.defaultHeight ?? 1;
    const maxH = getMaxWebViewHeight();
    if (Platform.OS !== 'android') {
        const displayHeight = Math.max(1, Number.isFinite(measured) && measured > 0 ? measured : defaultHeight);
        return { displayHeight, scrollInsideWebView: false };
    }
    const raw = Number.isFinite(measured) && measured > 0 ? measured : 0;
    if (raw === 0) {
        const displayHeight = Math.min(ANDROID_FALLBACK_WHEN_UNMEASURED, maxH);
        return {
            displayHeight: Math.max(ANDROID_MIN_DISPLAY, displayHeight),
            scrollInsideWebView: true,
        };
    }
    const displayHeight = Math.min(Math.max(raw, ANDROID_MIN_DISPLAY), maxH);
    const scrollInsideWebView = raw > displayHeight + 2;
    return { displayHeight, scrollInsideWebView };
}
