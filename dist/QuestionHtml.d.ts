/// <reference types="react" />
import React from 'react';
export interface Props {
    html: string;
}
export default class QuestionHtml extends React.Component<Props, any> {
    render(): JSX.Element;
}