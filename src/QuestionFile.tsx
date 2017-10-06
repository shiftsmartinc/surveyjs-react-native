import * as React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import ImagePicker from 'react-native-image-picker';


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

export default class QuestionFile extends React.Component<Props, any> {

  openPicker = () => {
    ImagePicker.showImagePicker({ title: 'Select File' }, (response) => {
      console.log(response)
      if (response.error) {
        Alert.alert( 'Error', response.error, [{ text: 'OK' }]);
        return;
      }
      if (this.props.maxSize && response.fileSize > this.props.maxSize) {
        Alert.alert(
          'FileSize',
          'Too Large FileSize',
          [{ text: 'OK' }],
        );
        return;
      }
      const value = this.props.storeDataAsText ? response.data : response.uri;
      this.props.onChange(value);
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
