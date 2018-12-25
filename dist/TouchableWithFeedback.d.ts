import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native';
interface Props extends TouchableWithoutFeedbackProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
export default class TouchableWithFeedback extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
