import React from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
  },
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

export interface Props {
  showPreview?: boolean;
  isVideo?: boolean;
  imageHeight?: number;
  imageWidth?: number;
  maxSize?: number;
  storeDataAsText?: boolean;
  value?: string;
  onChange(value, comment?);
}

export default class QuestionFile extends React.Component<Props> {
  openPicker = (method: 'launchCamera' | 'launchImageLibrary') => {
    const { storeDataAsText, isVideo, maxSize, onChange } = this.props;
    ImagePicker[method]({
      noData: !storeDataAsText,
      mediaType: isVideo ? 'video' : 'mixed',
      quality: 0.5,
      videoQuality: 'low',
      }, (response) => {
      if (response.error) {
        Alert.alert( 'Error', response.error, [{ text: 'OK' }]);
        return;
      }
      if (response.didCancel) {
        return;
      }
      if (maxSize && response.fileSize > maxSize) {
        Alert.alert(
          'FileSize',
          'Too Large FileSize',
          [{ text: 'OK' }],
        );
        return;
      }
      const value = storeDataAsText ? response.data : response;
      onChange(value);
    });
  }
  render() {
    const { value, onChange } = this.props;
    return (
      <View style={styles.container}>
        {!value &&
          <Image style={styles.image} source={require('./images/file-placeholder.png')} />
        }
        {value &&
          <Image style={styles.image} source={{ uri: value }} />
        }
        {value
          ? (
            <View style={styles.buttons}>
              <TouchableWithFeedback style={styles.button} onPress={() => onChange(null)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableWithFeedback>
            </View>
          )
          : (
            <View style={styles.buttons}>
              <TouchableWithFeedback style={styles.button} onPress={() => this.openPicker('launchImageLibrary')}>
                <Text style={styles.buttonText}>Upload from Camera Roll</Text>
              </TouchableWithFeedback>
              <TouchableWithFeedback style={styles.button} onPress={() => this.openPicker('launchCamera')}>
                <Text style={styles.buttonText}>Capture Now</Text>
              </TouchableWithFeedback>
            </View>
          )
        }
      </View>
    );
  }
}
