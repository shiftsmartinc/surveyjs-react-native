import React from 'react';
export interface QuestionHtmlProps {
    html: string;
    isPreview?: boolean;
}
export default class QuestionHtml extends React.Component<QuestionHtmlProps> {
    render(): JSX.Element;
}
