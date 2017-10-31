import React from 'react';
import { Dimensions, WebView, } from 'react-native';
const injectedStyles = `
  <style>
    body {
      font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
      font-size: 13;
      padding-right: 15;
    }
  </style>
`;
const injectedScript = `(function () {
  function getAndSendHeight() {
    let height = 0;
    if (document.documentElement.clientHeight > document.body.clientHeight) {
      height = document.documentElement.clientHeight
    }
    else {
      height = document.body.clientHeight
    }

    window.postMessage(height);
  }
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    }
    else {
      getAndSendHeight();
    }
  }
  setTimeout(waitForBridge, 50);
})();`;
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
    }
    _onMessage(e) {
        console.log('onMessage: ', e.nativeEvent.data);
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }
    render() {
        const _w = this.props.width || Dimensions.get('window').width;
        const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
        return (<WebView injectedJavaScript={injectedScript} scrollEnabled={this.props.scrollEnabled || false} onMessage={this._onMessage} javaScriptEnabled={true} automaticallyAdjustContentInsets={true} {...this.props} style={[{ width: _w }, this.props.style, { height: _h }]}/>);
    }
}
MyWebView.defaultProps = {
    autoHeight: true,
};
export default class QuestionHtml extends React.Component {
    render() {
        return (<MyWebView source={{
            html: `${injectedStyles}${this.props.html}`,
        }} defaultHeight={1} startInLoadingState={true} scrollEnabled={false} scalesPageToFit={true}/>);
    }
}
