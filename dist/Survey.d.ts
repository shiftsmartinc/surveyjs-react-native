/// <reference types="react" />
import React from 'react';
export interface Injected {
    isComplete?: boolean;
}
export interface Props {
}
export default class Survey extends React.Component<Injected & Props> {
    render(): JSX.Element;
}
