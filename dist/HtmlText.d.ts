import React from 'react';
interface HtmlTextComponentProps {
    children: string;
    style?: any;
    textStyle?: any;
}
export default class HtmlText extends React.Component<HtmlTextComponentProps> {
    shouldComponentUpdate(nextProps: HtmlTextComponentProps): boolean;
    render(): JSX.Element;
}
export {};
