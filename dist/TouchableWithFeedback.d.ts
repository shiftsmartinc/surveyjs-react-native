import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native';
interface Props extends TouchableWithoutFeedbackProps {
    isPreview?: boolean;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
export default class TouchableWithFeedback extends React.Component<Props> {
    render(): any;
}
export {};
