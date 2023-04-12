import React from 'react';
import { StyleSheet, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
});

const injectedStyles = `
  <style>
    body {
      background-color: #FAFAFA;
      color: #4471a0;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
      font-size: 16;
      padding-right: 15;
    }
  </style>
`;

const injectedMeta = `<meta name="viewport" content="width=device-width, initial-scale=1" />`;

/* Use an updated injectedScript to handle new react-native-webview [Pavan 2019-08-15] */
const injectedScript = `window.ReactNativeWebView.postMessage(document.body.scrollHeight)`;

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
  state = {
    webViewHeight: Number,
  };

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
  }

  _onMessage(e) {
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data),
    });
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
    // const width = this.props.width || Dimensions.get('window').width;
    const height = this.props.autoHeight
      ? this.state.webViewHeight
      : this.props.defaultHeight;

    return (
      <WebView
        {...this.props}
        automaticallyAdjustContentInsets={true}
        injectedJavaScript={injectedScript}
        javaScriptEnabled={true}
        onMessage={this._onMessage}
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
