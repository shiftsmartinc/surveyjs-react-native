import React from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {},
  image: {
    alignSelf: 'center',
    width: 176,
    height: 176,
  },
  buttons: {
    marginTop: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 14,
    marginHorizontal: 24,
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#1a71cf',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 14,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a71cf',
  },
});

export interface QuestionFileProps {
  imageHeight?: number;
  imageWidth?: number;
  isVideo?: boolean;
  maxSize?: number;
  onChange(value, comment?);
  showPreview?: boolean;
  storeDataAsText?: boolean;
  value?: any;
}

export default class QuestionFile extends React.Component<QuestionFileProps> {
  openPicker = async (method: 'openCamera' | 'openPicker') => {
    const { storeDataAsText = false, isVideo, maxSize, onChange } = this.props;
    const imageAction = ImagePicker[method];
    try {
      const response = await imageAction({
        includeBase64: storeDataAsText,
        mediaType: isVideo ? 'video' : 'photo',
        compressImageQuality: 0.5,
      });
      if (maxSize && response.size > maxSize) {
        Alert.alert('FileSize', 'Too Large FileSize', [{ text: 'OK' }]);
        return;
      }
      const value = storeDataAsText ? (response as any).base64 : response;
      onChange(value);
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        return;
      }
      if (error.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
        Alert.alert('Cannot open camera on simulator');
        return;
      }
      if (error.code === 'E_NO_LIBRARY_PERMISSION') {
        Alert.alert('Grant permissions to images');
      }
      Alert.alert('Error', error.message || error.code, [{ text: 'OK' }]);
    }
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <View style={styles.container}>
        {!value && (
          <Image
            style={styles.image}
            source={require('./images/file-placeholder.png')}
          />
        )}
        {value && value.path && (
          <Image style={styles.image} source={{ uri: value.path }} />
        )}
        {typeof value === 'string' && (
          <Image style={styles.image} source={{ uri: value }} />
        )}
        {value ? (
          <View style={styles.buttons}>
            <TouchableWithFeedback
              style={styles.button}
              onPress={() => onChange(null)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableWithFeedback>
          </View>
        ) : (
          <View style={styles.buttons}>
            <TouchableWithFeedback
              style={styles.button}
              onPress={() => this.openPicker('openPicker')}
            >
              <Text style={styles.buttonText}>Upload from Camera Roll</Text>
            </TouchableWithFeedback>
            <TouchableWithFeedback
              style={styles.button}
              onPress={() => this.openPicker('openCamera')}
            >
              <Text style={styles.buttonText}>Capture Now</Text>
            </TouchableWithFeedback>
          </View>
        )}
      </View>
    );
  }
}
