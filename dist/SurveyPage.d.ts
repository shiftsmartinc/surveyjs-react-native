import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export interface SurveyPageProps {
    curPageIndex?: any;
    currentPageProps?: any;
}
declare class SurveyPage extends React.Component<SurveyPageProps> {
    scrollView: KeyboardAwareScrollView;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
declare const _default: typeof SurveyPage & import("mobx-react").IWrappedComponent<{}>;
export default _default;
