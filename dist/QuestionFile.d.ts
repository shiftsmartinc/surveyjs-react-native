import React from 'react';
export interface QuestionFileProps {
    imageHeight?: number;
    imageWidth?: number;
    isVideo?: boolean;
    maxSize?: number;
    onChange(value: any, comment?: any): any;
    showPreview?: boolean;
    storeDataAsText?: boolean;
    value?: any;
}
export default class QuestionFile extends React.Component<QuestionFileProps> {
    openPicker: (method: 'openCamera' | 'openPicker') => Promise<void>;
    render(): JSX.Element;
}
