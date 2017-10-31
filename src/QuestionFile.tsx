import React from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import colors from './colors';
import ImagePicker from 'react-native-image-picker';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
  },
  button: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 3,
  },
  buttonText: {
    color: colors.primary,
    textAlign: 'center',
  },
  image: {
    marginTop: 5,
    alignSelf: 'center',
  },
});

export interface Props {
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
    ImagePicker.showImagePicker({ title: 'Select File', noData: !this.props.storeDataAsText }, (response) => {
      if (response.error) {
        Alert.alert( 'Error', response.error, [{ text: 'OK' }]);
        return;
      }
      if (response.didCancel) {
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
      const value = this.props.storeDataAsText ? response.data : response;
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
