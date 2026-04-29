import React from 'react';
import { StyleSheet, Text, View, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WEBVIEW_POST_HEIGHT_SCRIPT } from './webViewHeightScript';
import {
  buildInlineHtmlDocument,
  computeWebViewLayout,
  getAndroidInitialWebViewHeight,
  webViewSourceForInlineHtml,
} from './surveyWebViewHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    backgroundColor: 'transparent',
  },
});

const createInjectedStyles = (textStyle?: any): string => {
  const color = textStyle?.color || '#000';
  const fontSize = textStyle?.fontSize || 14;
  const fontWeight = textStyle?.fontWeight || 'normal';
  const fontFamily = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu';
  
  return `
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: transparent;
        color: ${color};
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
      }
    </style>
  `;
};

const injectedMeta = `<meta name="viewport" content="width=device-width, initial-scale=1" />`;

// Simple check to see if string contains HTML tags
const containsHtml = (text: string): boolean => {
  if (!text) return false;
  const htmlRegex = /<[^>]+>/;
  return htmlRegex.test(text);
};

interface HtmlTextProps {
  html: string;
  style?: any;
  textStyle?: any;
  onNavigationStateChange?: (e: any) => boolean;
  defaultHeight?: number;
}

class HtmlWebView extends React.Component<
  HtmlTextProps,
  { webViewHeight: number; scrollInsideWebView: boolean }
> {
  private webViewRef = React.createRef<WebView>();

  constructor(props: HtmlTextProps) {
    super(props);
    this.state =
      Platform.OS === 'android'
        ? {
            webViewHeight: getAndroidInitialWebViewHeight(),
            scrollInsideWebView: true,
          }
        : {
            webViewHeight: props.defaultHeight || 1,
            scrollInsideWebView: false,
          };
    this._onMessage = this._onMessage.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
  }

  _onMessage(e: any) {
    const raw = e?.nativeEvent?.data;
    const parsed = parseInt(String(raw), 10);
    const measured = Number.isFinite(parsed) ? parsed : 0;
    const layout = computeWebViewLayout(measured, {
      defaultHeight: this.props.defaultHeight || 1,
    });
    this.setState((prev) =>
      prev.webViewHeight === layout.displayHeight &&
      prev.scrollInsideWebView === layout.scrollInsideWebView
        ? null
        : {
            webViewHeight: layout.displayHeight,
            scrollInsideWebView: layout.scrollInsideWebView,
          },
    );
  }

  _onLoadEnd() {
    this.webViewRef.current?.injectJavaScript(WEBVIEW_POST_HEIGHT_SCRIPT);
  }

  _onNavigationStateChange(e: any) {
    if (this.props.onNavigationStateChange) {
      return this.props.onNavigationStateChange(e);
    }
    // Default behavior: open external links
    if (e.url.indexOf('http') > -1 && e.url.indexOf('data:text/html') === -1) {
      Linking.openURL(e.url);
      return false;
    }
    return false;
  }

  render() {
    const { html, style, textStyle } = this.props;
    const { webViewHeight, scrollInsideWebView } = this.state;
    const injectedStyles = createInjectedStyles(textStyle);
    const documentHtml = buildInlineHtmlDocument(
      `${injectedMeta}${injectedStyles}`,
      html,
    );
    const source = webViewSourceForInlineHtml(documentHtml);

    return (
      <WebView
        ref={this.webViewRef}
        originWhitelist={['*']}
        source={source}
        style={[
          styles.webView,
          style,
          { height: webViewHeight },
        ]}
        injectedJavaScript={WEBVIEW_POST_HEIGHT_SCRIPT}
        javaScriptEnabled={true}
        domStorageEnabled={Platform.OS === 'android'}
        onMessage={this._onMessage}
        onLoadEnd={this._onLoadEnd}
        onNavigationStateChange={this._onNavigationStateChange}
        scrollEnabled={scrollInsideWebView}
        automaticallyAdjustContentInsets={true}
        showsVerticalScrollIndicator={scrollInsideWebView}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

interface HtmlTextComponentProps {
  children: string;
  style?: any;
  textStyle?: any;
}

/**
 * Skip re-renders when only unrelated props change: parents often pass a new `textStyle` array
 * each render, but `children` (HTML) is stable while the user types in another field — reloading
 * WebViews every keystroke is a common Android crash/OOM trigger.
 */
const sameStyle = (leftStyle?: any, rightStyle?: any) => {
  const left = StyleSheet.flatten(leftStyle) || {};
  const right = StyleSheet.flatten(rightStyle) || {};
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  return Array.from(keys).every((key) => left[key] === right[key]);
};

export default class HtmlText extends React.Component<HtmlTextComponentProps> {
  shouldComponentUpdate(nextProps: HtmlTextComponentProps) {
    return (
      nextProps.children !== this.props.children ||
      !sameStyle(nextProps.style, this.props.style) ||
      !sameStyle(nextProps.textStyle, this.props.textStyle)
    );
  }

  render() {
    const { children, style, textStyle } = this.props;

    if (!children) {
      return null;
    }

    // If content doesn't contain HTML, use regular Text component for better performance
    if (!containsHtml(children)) {
      return (
        <View style={style}>
          <Text style={textStyle}>{children}</Text>
        </View>
      );
    }

    // If content contains HTML, use WebView
    return (
      <View style={style} collapsable={false}>
        <HtmlWebView
          html={children}
          textStyle={textStyle}
          defaultHeight={1}
        />
      </View>
    );
  }
}

