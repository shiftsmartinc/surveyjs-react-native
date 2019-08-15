import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import WebView from 'react-native-webview';
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
});
const injectedStyles = `
  <style>
    body {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
      font-size: 16;
      padding-right: 15;
      background-color: #FAFAFA;
      color: #4471a0;
    }
  </style>
`;
const injectedMeta = '<meta name="viewport" content="width=device-width, initial-scale=1" />';
const injectedScript = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)';
class MyWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webViewHeight: Number
        };
        this.state = {
            webViewHeight: this.props.defaultHeight
        };
        this._onMessage = this._onMessage.bind(this);
        this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    }
    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }
    _onNavigationStateChange(e) {
        const regex = /^data:text\/html;.+href\=\"(https?\:\/\/.*?\.pdf)\".*$/mi;
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
        const height = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
        return (<WebView injectedJavaScript={injectedScript} scrollEnabled={this.props.scrollEnabled || false} onNavigationStateChange={this._onNavigationStateChange} onMessage={this._onMessage} javaScriptEnabled={true} automaticallyAdjustContentInsets={true} {...this.props} style={[styles.container, this.props.style, { height }]}/>);
    }
}
MyWebView.defaultProps = {
    autoHeight: true,
};
export default class QuestionHtml extends React.Component {
    render() {
        return (<MyWebView source={{
            html: `${injectedMeta}${injectedStyles}${this.props.html}`,
        }} defaultHeight={1} startInLoadingState={true} scrollEnabled={false}/>);
    }
}
