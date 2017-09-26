import * as React from 'react';

import AutoHeightWebView from 'react-native-webview-autoheight';


interface Props {
  html: string;
}

export default class QuestionHtml extends React.Component<Props, any> {
  render() {
    return (
      <AutoHeightWebView
        source={{
          html: this.props.html,
        }}
        scrollEnabled={false}
        scalesPageToFit={true}
      />
    );
  }
}
