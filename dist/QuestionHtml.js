import React from 'react';
import { StyleSheet, Linking, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { WEBVIEW_POST_HEIGHT_SCRIPT } from './webViewHeightScript';
import { buildInlineHtmlDocument, computeWebViewLayout, getAndroidInitialWebViewHeight, webViewSourceForInlineHtml, } from './surveyWebViewHelpers';
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
class MyWebView extends React.Component {
    webViewRef = React.createRef();
    static defaultProps = {
        autoHeight: true,
    };
    constructor(props) {
        super(props);
        const def = this.props.defaultHeight != null ? this.props.defaultHeight : 1;
        this.state =
            Platform.OS === 'android'
                ? {
                    webViewHeight: getAndroidInitialWebViewHeight(),
                    scrollInsideWebView: true,
                }
                : {
                    webViewHeight: def,
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
        const fallback = this.props.defaultHeight != null ? this.props.defaultHeight : 1;
        const layout = computeWebViewLayout(measured, { defaultHeight: fallback });
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
        const regex = /^data:text\/html;.+href\=\"(https?\:\/\/.*?\.pdf)\".*$/im;
        const matches = e.url.match(regex);
        if (matches) {
            return false;
        }
        else if (e.url.indexOf('http') > -1) {
            return Linking.openURL(e.url);
        }
        return false;
    }
    render() {
        const { onLoadEnd } = this.props;
        const { webViewHeight, scrollInsideWebView } = this.state;
        const height = this.props.autoHeight
            ? webViewHeight
            : this.props.defaultHeight;
        return (<WebView {...this.props} ref={this.webViewRef} originWhitelist={['*']} automaticallyAdjustContentInsets={true} injectedJavaScript={WEBVIEW_POST_HEIGHT_SCRIPT} javaScriptEnabled={true} domStorageEnabled={Platform.OS === 'android'} onMessage={this._onMessage} onLoadEnd={(e) => {
                onLoadEnd?.(e);
                this._onLoadEnd();
            }} onNavigationStateChange={this._onNavigationStateChange} scrollEnabled={scrollInsideWebView} showsVerticalScrollIndicator={scrollInsideWebView} style={[
                styles.container,
                this.props.style,
                { height },
            ]}/>);
    }
}
export default class QuestionHtml extends React.Component {
    render() {
        if (this.props.isPreview) {
            return null;
        }
        const documentHtml = buildInlineHtmlDocument(`${injectedMeta}${injectedStyles}`, this.props.html);
        return (<View collapsable={false}>
        <MyWebView source={webViewSourceForInlineHtml(documentHtml)} defaultHeight={1} startInLoadingState={true} scrollEnabled={false}/>
      </View>);
    }
}
