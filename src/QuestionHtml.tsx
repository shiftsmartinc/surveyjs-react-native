import React from 'react';
import { StyleSheet, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WEBVIEW_POST_HEIGHT_SCRIPT } from './webViewHeightScript';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
});

const injectedStyles = `
  <style>
    body {
      margin: 0;
      background-color: #FAFAFA;
      color: #4471a0;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
      font-size: 16px;
      padding-right: 15px;
    }
  </style>
`;

const injectedMeta = `<meta name="viewport" content="width=device-width, initial-scale=1" />`;

// const injectedScript = `(function () {
//   function getAndSendHeight() {
//     let height = 0;
//     if (document.documentElement.clientHeight > document.body.clientHeight) {
//       height = document.documentElement.clientHeight
//     }
//     else {
//       height = document.body.clientHeight
//     }
//
//     window.postMessage(height);
//   }
//   function waitForBridge() {
//     if (window.postMessage.length !== 1) {
//       setTimeout(waitForBridge, 200);
//     }
//     else {
//       getAndSendHeight();
//     }
//   }
//   setTimeout(waitForBridge, 50);
// })();`;

class MyWebView extends React.Component<any, any> {
  private webViewRef = React.createRef<WebView>();

  static defaultProps = {
    autoHeight: true,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight,
    };

    this._onMessage = this._onMessage.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
  }

  _onMessage(e) {
    const raw = e?.nativeEvent?.data;
    const parsed = parseInt(String(raw), 10);
    const fallback = this.props.defaultHeight != null ? this.props.defaultHeight : 1;
    const next = Math.max(1, Number.isFinite(parsed) ? parsed : fallback);
    this.setState((prev) =>
      prev.webViewHeight === next ? null : { webViewHeight: next },
    );
  }

  _onLoadEnd() {
    this.webViewRef.current?.injectJavaScript(WEBVIEW_POST_HEIGHT_SCRIPT);
  }

  _onNavigationStateChange(e) {
    const regex = /^data:text\/html;.+href\=\"(https?\:\/\/.*?\.pdf)\".*$/im;
    const matches = e.url.match(regex);
    if (matches) {
      return false;
    } else if (e.url.indexOf('http') > -1) {
      return Linking.openURL(e.url);
    }
    return false;
  }

  render() {
    const { onLoadEnd } = this.props;
    const height = this.props.autoHeight
      ? this.state.webViewHeight
      : this.props.defaultHeight;

    return (
      <WebView
        {...this.props}
        ref={this.webViewRef}
        automaticallyAdjustContentInsets={true}
        injectedJavaScript={WEBVIEW_POST_HEIGHT_SCRIPT}
        javaScriptEnabled={true}
        onMessage={this._onMessage}
        onLoadEnd={(e) => {
          onLoadEnd?.(e);
          this._onLoadEnd();
        }}
        onNavigationStateChange={this._onNavigationStateChange}
        scrollEnabled={this.props.scrollEnabled || false}
        style={[
          styles.container,
          this.props.style,
          { height, opacity: Platform.OS === 'android' ? 0.99 : 1 },
        ]}
      />
    );
  }
}

export interface QuestionHtmlProps {
  html: string;
  isPreview?: boolean;
}

export default class QuestionHtml extends React.Component<QuestionHtmlProps> {
  render() {
    if (this.props.isPreview) {
      return null;
    }

    return (
      <MyWebView
        source={{
          html: `${injectedMeta}${injectedStyles}${this.props.html}`,
        }}
        defaultHeight={1}
        startInLoadingState={true}
        scrollEnabled={false}
      />
    );
  }
}
