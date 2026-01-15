import React from 'react';
import { StyleSheet, Text, View, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';
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
const injectedScript = `window.ReactNativeWebView.postMessage(document.body.scrollHeight)`;
const containsHtml = (text) => {
    if (!text)
        return false;
    const htmlRegex = /<[^>]+>/;
    return htmlRegex.test(text);
};
class HtmlWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webViewHeight: props.defaultHeight || 1,
        };
        this._onMessage = this._onMessage.bind(this);
        this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    }
    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data, 10) || this.props.defaultHeight || 1,
        });
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
        const { html, style, textStyle, defaultHeight = 1 } = this.props;
        const { webViewHeight } = this.state;
        const injectedStyles = createInjectedStyles(textStyle);
        return (<WebView source={{
                html: `${injectedMeta}${injectedStyles}${html}`,
            }} style={[
                styles.webView,
                style,
                { height: webViewHeight, opacity: Platform.OS === 'android' ? 0.99 : 1 },
            ]} injectedJavaScript={injectedScript} javaScriptEnabled={true} onMessage={this._onMessage} onNavigationStateChange={this._onNavigationStateChange} scrollEnabled={false} automaticallyAdjustContentInsets={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}/>);
    }
}
export default class HtmlText extends React.Component {
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
        return (<View style={style}>
        <HtmlWebView html={children} textStyle={textStyle} defaultHeight={1}/>
      </View>);
    }
}
