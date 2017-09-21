import * as React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import ImagePicker from 'react-native-image-picker';


interface Props {
  showPreview?: boolean;
  imageHeight?: number;
  imageWidth?: number;
  maxSize?: number;
}

const pickerOptions = {
  title: 'Select Your File',
};

export default class QuestionHtml extends React.Component<Props, any> {

  constructor(props) {
    super(props);
    this.state = {
      sourceUri: null,
    };
  }

  openPicker = () => {
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.error) {
        return;
      }

      if (this.props.maxSize && response.fileSize > this.props.maxSize) {
        Alert.alert(
          'FileSize',
          'Too Large FileSize',
          [
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: true }
        );
        return;
      }

      this.setState({
        sourceUri: response.uri,
      })
    });
  }
  render() {
    const {
      showPreview = false,
    } = this.props;
    const questionImageStyle = {
      height: this.props.imageHeight || 50,
      width: this.props.imageWidth || 50,
    };

    return (
      <View>
        <TouchableWithFeedback
          onPress={this.openPicker}
        >
          <Text>Select File</Text>
        </TouchableWithFeedback>
        {(showPreview && this.state.sourceUri) ?
          <Image
            style={questionImageStyle}
            source={{ uri: this.state.sourceUri }}
          /> : null
        }
      </View>
    );
  }
}
