import { Dimensions, Platform } from 'react-native';

/** Root wrapper id — must match `WEBVIEW_POST_HEIGHT_SCRIPT` measurement. */
export const SURVEY_HTML_ROOT_ID = 'survey-html-root';

/** Android `loadDataWithBaseURL` often paints incorrectly with default base; use a stable https origin. */
export const ANDROID_HTML_BASE_URL = 'https://surveyjs.invalid/';

export function getMaxWebViewHeight(): number {
  return Math.round(Dimensions.get('window').height * 0.78);
}

/**
 * Wrap fragment HTML in a full document so Android WebKit lays out and measures reliably.
 */
export function buildInlineHtmlDocument(headTags: string, bodyHtml: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${headTags}</head><body><div id="${SURVEY_HTML_ROOT_ID}">${bodyHtml}</div></body></html>`;
}

export function webViewSourceForInlineHtml(html: string) {
  if (Platform.OS === 'android') {
    return { html, baseUrl: ANDROID_HTML_BASE_URL };
  }
  return { html };
}

const ANDROID_MIN_DISPLAY = 200;
const ANDROID_FALLBACK_WHEN_UNMEASURED = 380;

/** First paint: tall enough to layout, smaller than full fallback to avoid huge empty chrome. */
export function getAndroidInitialWebViewHeight(): number {
  return Math.min(280, getMaxWebViewHeight());
}

type HeightCompute = {
  displayHeight: number;
  scrollInsideWebView: boolean;
};

/**
 * Android: never trust a 1px-tall WebView at first paint — use a minimum display height and
 * enable in-WebView scrolling when content is taller than the capped display height.
 */
export function computeWebViewLayout(
  measured: number,
  options?: { defaultHeight?: number },
): HeightCompute {
  const defaultHeight = options?.defaultHeight ?? 1;
  const maxH = getMaxWebViewHeight();

  if (Platform.OS !== 'android') {
    const displayHeight = Math.max(
      1,
      Number.isFinite(measured) && measured > 0 ? measured : defaultHeight,
    );
    return { displayHeight, scrollInsideWebView: false };
  }

  const raw =
    Number.isFinite(measured) && measured > 0 ? measured : 0;

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
