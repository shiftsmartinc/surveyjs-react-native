/**
 * Android WebView often reports document.body.scrollHeight as 0 on the first
 * paint; a single immediate postMessage leaves the WebView at ~1px height.
 * Remeasure after timeouts and take the max of common height properties.
 *
 * Trailing `true` satisfies react-native-webview's Android requirement that the
 * injected script return a value.
 */
export const WEBVIEW_POST_HEIGHT_SCRIPT = `
(function () {
  function measureAndPost() {
    var b = document.body;
    var e = document.documentElement;
    var h = Math.max(
      b ? b.scrollHeight : 0,
      e ? e.scrollHeight : 0,
      b ? b.offsetHeight : 0,
      e ? e.offsetHeight : 0,
      b ? b.clientHeight : 0,
      e ? e.clientHeight : 0
    );
    window.ReactNativeWebView.postMessage(String(h));
  }
  measureAndPost();
  setTimeout(measureAndPost, 50);
  setTimeout(measureAndPost, 200);
  setTimeout(measureAndPost, 500);
})();
true;
`;
