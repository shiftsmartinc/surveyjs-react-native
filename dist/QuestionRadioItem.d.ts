/// <reference types="react" />
import React from 'react';
export interface Props {
    text?: string;
    value: string;
    defaultChecked?: boolean;
    checked: boolean;
    onChange?: (string) => void;
}
export default class QuestionRadioItem extends React.Component<Props> {
    handlePress: () => void;
    render(): JSX.Element;
}
