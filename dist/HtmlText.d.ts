import React from 'react';
interface HtmlTextComponentProps {
    children: string;
    style?: any;
    textStyle?: any;
}
export default class HtmlText extends React.Component<HtmlTextComponentProps> {
    render(): JSX.Element;
}
export {};
