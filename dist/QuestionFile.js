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
export default class QuestionFile extends React.Component {
    parseValue = (value) => {
        if (!value)
            return null;
        if (this.props.allowMultiple && typeof value === 'string') {
            if (value.includes(',')) {
                return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
            }
            return [value];
        }
        return value;
    };
    openPicker = async (method) => {
        const { storeDataAsText = false, isVideo, onChange, allowMultiple = false } = this.props;
        const imageAction = ImagePicker[method];
        try {
            const pickerOptions = {
                includeBase64: storeDataAsText,
                mediaType: isVideo ? 'video' : 'photo',
                compressImageQuality: 0.5,
                includeExif: true,
            };
            if (allowMultiple && method === 'openPicker') {
                pickerOptions.multiple = true;
                pickerOptions.includeBase64 = false;
            }
            const response = await imageAction(pickerOptions);
            if (allowMultiple) {
                const responses = Array.isArray(response) ? response : [response];
                onChange({ images: responses });
            }
            else {
                const value = storeDataAsText ? response.base64 : response;
                onChange(value);
            }
        }
        catch (error) {
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
    removeFile = () => {
        const { onChange, allowMultiple } = this.props;
        if (!allowMultiple) {
            onChange(null);
            return;
        }
        onChange({ removeAll: true });
    };
    render() {
        const { value, allowMultiple = false } = this.props;
        const parsedValue = this.parseValue(value);
        const isMultiple = allowMultiple;
        const hasFiles = isMultiple ? (Array.isArray(parsedValue) ? parsedValue.length > 0 : !!parsedValue?.images) : !!parsedValue;
        return (<View style={styles.container}>
        {!hasFiles && (<Image style={styles.image} source={require('./images/file-placeholder.png')}/>)}
        
        {isMultiple && hasFiles && (<ScrollView style={styles.imagesContainer}>
        {Array.isArray(parsedValue) ? parsedValue.map((imageURL, index) => {
                    return (<View key={index} style={styles.imageWrapper}>
            <Image style={styles.image} source={{ uri: imageURL }}/>
          </View>);
                }) : ((parsedValue?.images ?? []).map((imageInfo, index) => {
                    const imageURL = typeof imageInfo === 'string' ? imageInfo : imageInfo.path;
                    return (<View key={index} style={styles.imageWrapper}>
              <Image style={styles.image} source={{ uri: imageURL }}/>
            </View>);
                }))}
      </ScrollView>)}

        {!isMultiple && parsedValue && parsedValue.path && (<Image style={styles.image} source={{ uri: parsedValue.path }}/>)}
        {!isMultiple && typeof parsedValue === 'string' && (<Image style={styles.image} source={{ uri: parsedValue }}/>)}

       {hasFiles && (<View style={styles.buttons}>
        <TouchableWithFeedback style={styles.button} onPress={() => this.removeFile()}>
          <Text style={styles.buttonText}>{isMultiple ? 'Remove All' : 'Remove'}</Text>
        </TouchableWithFeedback>
      </View>)}

      {!hasFiles && (<View style={styles.buttons}>
        <TouchableWithFeedback style={styles.button} onPress={() => this.openPicker('openPicker')}>
          <Text style={styles.buttonText}>
            {isMultiple ? 'Add Files from Camera Roll' : 'Upload from Camera Roll'}
          </Text>
        </TouchableWithFeedback>
        {!isMultiple && (<TouchableWithFeedback style={styles.button} onPress={() => this.openPicker('openCamera')}>
          <Text style={styles.buttonText}>Capture Now</Text>
        </TouchableWithFeedback>)}
      </View>)}
      </View>);
    }
}
