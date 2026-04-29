import React from 'react';
import { StyleSheet, Text, View, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WEBVIEW_POST_HEIGHT_SCRIPT } from './webViewHeightScript';
import { buildInlineHtmlDocument, computeWebViewLayout, getAndroidInitialWebViewHeight, webViewSourceForInlineHtml, } from './surveyWebViewHelpers';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        backgroundColor: 'transparent',
    },
});
const createInjectedStyles = (textStyle) => {
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
const containsHtml = (text) => {
    if (!text)
        return false;
    const htmlRegex = /<[^>]+>/;
    return htmlRegex.test(text);
};
class HtmlWebView extends React.Component {
    webViewRef = React.createRef();
    constructor(props) {
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
    _onMessage(e) {
        const raw = e?.nativeEvent?.data;
        const parsed = parseInt(String(raw), 10);
        const measured = Number.isFinite(parsed) ? parsed : 0;
        const layout = computeWebViewLayout(measured, {
            defaultHeight: this.props.defaultHeight || 1,
        });
        this.setState((prev) => prev.webViewHeight === layout.displayHeight &&
            prev.scrollInsideWebView === layout.scrollInsideWebView
            ? null
            : {
                webViewHeight: layout.displayHeight,
                scrollInsideWebView: layout.scrollInsideWebView,
            });
    }
    _onLoadEnd() {
        this.webViewRef.current?.injectJavaScript(WEBVIEW_POST_HEIGHT_SCRIPT);
    }
    _onNavigationStateChange(e) {
        if (this.props.onNavigationStateChange) {
            return this.props.onNavigationStateChange(e);
        }
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
        const documentHtml = buildInlineHtmlDocument(`${injectedMeta}${injectedStyles}`, html);
        const source = webViewSourceForInlineHtml(documentHtml);
        return (<WebView ref={this.webViewRef} originWhitelist={['*']} source={source} style={[
                styles.webView,
                style,
                { height: webViewHeight },
            ]} injectedJavaScript={WEBVIEW_POST_HEIGHT_SCRIPT} javaScriptEnabled={true} domStorageEnabled={Platform.OS === 'android'} onMessage={this._onMessage} onLoadEnd={this._onLoadEnd} onNavigationStateChange={this._onNavigationStateChange} scrollEnabled={scrollInsideWebView} automaticallyAdjustContentInsets={true} showsVerticalScrollIndicator={scrollInsideWebView} showsHorizontalScrollIndicator={false}/>);
    }
}
const sameStyle = (leftStyle, rightStyle) => {
    const left = StyleSheet.flatten(leftStyle) || {};
    const right = StyleSheet.flatten(rightStyle) || {};
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return Array.from(keys).every((key) => left[key] === right[key]);
};
export default class HtmlText extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (nextProps.children !== this.props.children ||
            !sameStyle(nextProps.style, this.props.style) ||
            !sameStyle(nextProps.textStyle, this.props.textStyle));
    }
    render() {
        const { children, style, textStyle } = this.props;
        if (!children) {
            return null;
        }
        if (!containsHtml(children)) {
            return (<View style={style}>
          <Text style={textStyle}>{children}</Text>
        </View>);
        }
        return (<View style={style} collapsable={false}>
        <HtmlWebView html={children} textStyle={textStyle} defaultHeight={1}/>
      </View>);
    }
}
