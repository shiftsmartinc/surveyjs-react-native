import React from 'react';
export interface Props {
    choices: any;
    hasOther?: boolean;
    minPanelCount?: number;
    maxPanelCount?: number;
    panelCount?: number;
    panelAddText?: string;
    panelRemoveText?: string;
    templateTitle?: string;
    confirmDelete?: boolean;
    confirmDeleteText?: string;
    templateElements: Array<any>;
    buildComponent: (json: any) => {};
}
export default class QuestionPanelDynamic extends React.Component<Props, any> {
    constructor(props: any);
    cnt: number;
    onPanelRemoveButtonClicked: (key: any) => void;
    onPanelRemove: (key: any) => void;
    onNewPanel: () => void;
    generatePanelKey: () => string;
    renderPanel(key: any): JSX.Element;
    render(): JSX.Element;
}
