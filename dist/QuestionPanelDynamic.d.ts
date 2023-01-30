import React from 'react';
export interface QuestionPanelDynamicProps {
    buildComponent: (json: any) => {};
    choices: any;
    confirmDelete?: boolean;
    confirmDeleteText?: string;
    hasOther?: boolean;
    maxPanelCount?: number;
    minPanelCount?: number;
    panelAddText?: string;
    panelCount?: number;
    panelRemoveText?: string;
    templateElements: Array<any>;
    templateTitle?: string;
}
export default class QuestionPanelDynamic extends React.Component<QuestionPanelDynamicProps, any> {
    cnt: number;
    constructor(props: any);
    onPanelRemoveButtonClicked: (key: any) => void;
    onPanelRemove: (key: any) => void;
    onNewPanel: () => void;
    generatePanelKey: () => string;
    renderPanel(key: any): JSX.Element;
    render(): JSX.Element;
}
