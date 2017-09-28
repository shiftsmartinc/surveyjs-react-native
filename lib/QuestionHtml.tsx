import * as React from 'react';

import AutoHeightWebView from 'react-native-webview-autoheight';


interface Props {
  html: string;
}

const injectedStyles = `
  <style>
    body {
      font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
      font-size: 13;
      padding-right: 15;
    }
  </style>
`;

export default class QuestionHtml extends React.Component<Props, any> {
  render() {
    return (
      <AutoHeightWebView
        source={{
          html: `${injectedStyles}${this.props.html}`,
        }}
        scrollEnabled={false}
        scalesPageToFit={true}
      />
    );
  }
}
