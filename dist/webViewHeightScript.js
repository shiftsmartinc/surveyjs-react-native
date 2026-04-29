export const WEBVIEW_POST_HEIGHT_SCRIPT = `
(function () {
  var ROOT_ID = 'survey-html-root';
  function measureAndPost() {
    var root = document.getElementById(ROOT_ID);
    var b = document.body;
    var e = document.documentElement;
    var fromRoot = 0;
    if (root) {
      fromRoot = Math.max(
        root.scrollHeight,
        root.offsetHeight,
        root.getBoundingClientRect ? root.getBoundingClientRect().height : 0
      );
    }
    var h = Math.max(
      fromRoot,
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
  setTimeout(measureAndPost, 1200);
})();
true;
`;
