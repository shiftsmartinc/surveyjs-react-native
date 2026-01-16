import React from 'react';
export interface QuestionFileProps {
    imageHeight?: number;
    imageWidth?: number;
    isVideo?: boolean;
    maxSize?: number;
    onChange(value: any, comment?: any): any;
    showPreview?: boolean;
    storeDataAsText?: boolean;
    allowMultiple?: boolean;
    value?: any;
}
export default class QuestionFile extends React.Component<QuestionFileProps> {
    parseValue: (value: any) => any[] | any;
    toCSV: (files: any[]) => string;
    getFileURI: (file: any) => string;
    openPicker: (method: 'openCamera' | 'openPicker') => Promise<void>;
    removeFile: (indexToRemove: number) => void;
    render(): JSX.Element;
}
