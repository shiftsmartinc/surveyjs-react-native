import * as React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import ImagePicker, { Image as ImageInterface } from 'react-native-image-crop-picker';


import styles from './styles/questionFile';

interface Props {
  showPreview?: boolean;
  imageHeight?: number;
  imageWidth?: number;
  maxSize?: number;
  storeDataAsText?: boolean;
  value?: string;
  onChange(value, comment?);
}

export default class QuestionHtml extends React.Component<Props, any> {

  openPicker = () => {
    ImagePicker.openPicker({})
      .then((image) => {
        const response = image as ImageInterface;
        if (this.props.maxSize && response.size > this.props.maxSize) {
          Alert.alert(
            'FileSize',
            'Too Large FileSize',
            [
              { text: 'OK', onPress: () => { } },
            ],
            { cancelable: true }
          );
          return;
        }
        const value = this.props.storeDataAsText ?
          `data:${response.mime};base64,${response.data}` : response.path;
        this.props.onChange(value);
      }).catch(() => {
      });

  }
  render() {
    const {
      showPreview = false,
      value,
    } = this.props;
    const questionImageStyle = {
      height: this.props.imageHeight || 100,
      width: this.props.imageWidth || 100,
    };

    return (
      <View>
        <TouchableWithFeedback
          onPress={this.openPicker}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select File</Text>
          </View>
        </TouchableWithFeedback>
        {(showPreview && value) ?
          <Image
            style={[styles.image, questionImageStyle]}
            source={{ uri: value }}
          /> : null
        }
      </View>
    );
  }
}
