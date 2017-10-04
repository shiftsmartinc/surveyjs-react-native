# Survey JS React Native

## Installation

1. `npm install https://bitbucket.org/shiftsmart/surveyjs-react-native`
2. `npm install react-native-image-picker --save`
3. `react-native link`
4. Add the required permissions in AndroidManifest.xml:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
5. Add the required permissions in Info.plist:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string></string>
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSMicrophoneUsageDescription</key>
<string></string>
```

# Example

1. `cd example`
2. `npm run ios` or `npm run android`
