import React from 'react';
export interface Props {
    showPreview?: boolean;
    isVideo?: boolean;
    imageHeight?: number;
    imageWidth?: number;
    maxSize?: number;
    storeDataAsText?: boolean;
    value?: any;
    onChange(value: any, comment?: any): any;
}
export default class QuestionFile extends React.Component<Props> {
    openPicker: (method: 'openCamera' | 'openPicker') => Promise<void>;
    render(): JSX.Element;
}
