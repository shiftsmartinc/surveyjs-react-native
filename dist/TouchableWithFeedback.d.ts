import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native';
interface TouchableWithFeedbackProps extends TouchableWithoutFeedbackProps {
    isPreview?: boolean;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare class TouchableWithFeedback extends React.Component<TouchableWithFeedbackProps> {
    render(): JSX.Element;
}
declare const _default: typeof TouchableWithFeedback & import("mobx-react").IWrappedComponent<{}>;
export default _default;
