# Survey JS React Native

## Installation

1. install `https://github.com/shiftsmartinc/surveyjs-react-native`

2. install peerDependencies:

- `mobx`
- `mobx-react`
- `moment`
- `react`
- `react-native`
- `react-native-image-picker`
- `react-native-keyboard-aware-scroll-view`
- `react-native-modal-datetime-picker`
- `react-native-webview`
- `@react-native-community/datetimepicker`

3. Add the required permissions in AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

4. Add the required permissions in Info.plist:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string></string>
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSMicrophoneUsageDescription</key>
<string></string>
```

## Example

1. `cd example`
2. install dependencies
3. run project
