# Survey JS React Native

## Installation

1. install `https://bitbucket.org/shiftsmart/surveyjs-react-native`

2. install peerDependencies:
  * `mobx`
  * `mobx-react`
  * `moment`
  * `react`
  * `react-native`
  * `react-native-image-picker`
  * `react-native-keyboard-aware-scroll-view`
  * `react-native-modal-datetime-picker`
  * `react-native-webview`

3. link native dependencies
  * `react-native link react-native-image-picker`
  * `react-native link react-native-webview`

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
2. install dependencies
3. run project
