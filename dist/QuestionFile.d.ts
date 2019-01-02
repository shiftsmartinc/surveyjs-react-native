import React from 'react';
export interface Props {
    showPreview?: boolean;
    isVideo?: boolean;
    imageHeight?: number;
    imageWidth?: number;
    maxSize?: number;
    storeDataAsText?: boolean;
    value?: string;
    onChange(value: any, comment?: any): any;
}
export default class QuestionFile extends React.Component<Props> {
    openPicker: (method: "launchCamera" | "launchImageLibrary") => void;
    render(): JSX.Element;
}
