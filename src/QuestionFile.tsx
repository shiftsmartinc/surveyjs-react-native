import React from 'react';
import { StyleSheet, View, Text, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {},
  image: {
    alignSelf: 'center',
    width: 176,
    height: 176,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  imageWrapper: {
    marginBottom: 16,
    position: 'relative',
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
  removeButton: {
    marginTop: 8,
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
  allowMultiple?: boolean;
  value?: any;
}

export default class QuestionFile extends React.Component<QuestionFileProps> {
  // Parse value: if it's a CSV string, convert to array; otherwise return as-is
  parseValue = (value: any): any[] | any => {
    if (!value) return null;
    if (this.props.allowMultiple && typeof value === 'string') {
      // Check if it's a CSV string (contains commas)
      if (value.includes(',')) {
        // Split by comma and filter out empty strings
        return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
      }
      // Single value string in multiple mode
      return [value];
    }
    return value;
  };

  // Convert array of file URIs/strings to CSV string
  toCSV = (files: any[]): string => {
    return files.map(file => {
      if (typeof file === 'string') {
        // Already a string (URI or base64)
        return file;
      }
      // Extract URI from file object
      return file.uri || file.path || '';
    }).filter(item => item.length > 0).join(',');
  };

  // Get file URI from file object or string
  getFileURI = (file: any): string => {
    if (typeof file === 'string') {
      return file;
    }
    return file.uri || file.path || '';
  };

  openPicker = async (method: 'openCamera' | 'openPicker') => {
    const { storeDataAsText = false, isVideo, maxSize, onChange, allowMultiple = false } = this.props;
    const imageAction = ImagePicker[method];
    try {
      const pickerOptions: any = {
        includeBase64: storeDataAsText,
        mediaType: isVideo ? 'video' : 'photo',
        compressImageQuality: 0.5,
        includeExif: true,
      };

      // For multiple selection, only openPicker supports multiple
      if (allowMultiple && method === 'openPicker') {
        pickerOptions.multiple = true;
      }

      const response = await imageAction(pickerOptions);
      
      // Handle array of responses (multiple selection)
      const responses = Array.isArray(response) ? response : [response];
      
      // Check file sizes
      for (const res of responses) {
        if (maxSize && res.size > maxSize) {
          Alert.alert('FileSize', 'Too Large FileSize', [{ text: 'OK' }]);
          return;
        }
      }

      if (allowMultiple) {
        // Get current files
        const currentValue = this.parseValue(this.props.value);
        const currentFiles = Array.isArray(currentValue) ? currentValue : (currentValue ? [currentValue] : []);
        
        // Add new files
        const newFiles = responses.map(res => {
          if (storeDataAsText) {
            // For base64, store the base64 string directly
            return (res as any).base64;
          } else {
            // For file objects, extract URI
            return this.getFileURI(res);
          }
        });
        
        // Combine and store as CSV
        const allFiles = [...currentFiles, ...newFiles];
        const csvValue = this.toCSV(allFiles);
        onChange(csvValue);
      } else {
        // Single file mode - keep existing behavior
        const value = storeDataAsText ? (response as any).base64 : response;
        onChange(value);
      }
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

  removeFile = (indexToRemove: number) => {
    const { onChange, allowMultiple } = this.props;
    if (!allowMultiple) {
      onChange(null);
      return;
    }

    const currentValue = this.parseValue(this.props.value);
    if (Array.isArray(currentValue)) {
      const updatedFiles = currentValue.filter((_, index) => index !== indexToRemove);
      if (updatedFiles.length === 0) {
        onChange(null);
      } else {
        const csvValue = this.toCSV(updatedFiles);
        onChange(csvValue);
      }
    }
  };

  render() {
    const { value, onChange, allowMultiple = false } = this.props;
    const parsedValue = this.parseValue(value);
    const isMultiple = allowMultiple && Array.isArray(parsedValue);
    const hasFiles = isMultiple ? parsedValue.length > 0 : !!parsedValue;

    return (
      <View style={styles.container}>
        {!hasFiles && (
          <Image
            style={styles.image}
            source={require('./images/file-placeholder.png')}
          />
        )}
        
        {isMultiple && (
          <ScrollView style={styles.imagesContainer}>
            {parsedValue.map((fileValue: string, index: number) => {
              // For base64 strings, create data URI; for regular URIs, use as-is
              const imageUri = this.props.storeDataAsText && !fileValue.startsWith('http') && !fileValue.startsWith('file://')
                ? `data:image/jpeg;base64,${fileValue}`
                : fileValue;
              
              return (
                <View key={index} style={styles.imageWrapper}>
                  <Image style={styles.image} source={{ uri: imageUri }} />
                  <TouchableWithFeedback
                    style={[styles.button, styles.removeButton]}
                    onPress={() => this.removeFile(index)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableWithFeedback>
                </View>
              );
            })}
          </ScrollView>
        )}

        {!isMultiple && parsedValue && parsedValue.path && (
          <Image style={styles.image} source={{ uri: parsedValue.path }} />
        )}
        {!isMultiple && typeof parsedValue === 'string' && (
          <Image style={styles.image} source={{ uri: parsedValue }} />
        )}

        {hasFiles && !isMultiple && (
          <View style={styles.buttons}>
            <TouchableWithFeedback
              style={styles.button}
              onPress={() => onChange(null)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableWithFeedback>
          </View>
        )}

        {(isMultiple || !hasFiles) && (
          <View style={styles.buttons}>
            <TouchableWithFeedback
              style={styles.button}
              onPress={() => this.openPicker('openPicker')}
            >
              <Text style={styles.buttonText}>
                {isMultiple ? 'Add Files from Camera Roll' : 'Upload from Camera Roll'}
              </Text>
            </TouchableWithFeedback>
            {!isMultiple && (
              <TouchableWithFeedback
                style={styles.button}
                onPress={() => this.openPicker('openCamera')}
              >
                <Text style={styles.buttonText}>Capture Now</Text>
              </TouchableWithFeedback>
            )}
          </View>
        )}
      </View>
    );
  }
}
