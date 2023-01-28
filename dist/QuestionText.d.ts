import React from 'react';
export interface QuestionTextProps {
    autoComplete?: string;
    dataList?: [string];
    inputType?: string;
    isPreview?: boolean;
    onChange(value: string): void;
    placeholder?: string;
    rows?: number;
    value: string;
}
declare class QuestionText extends React.Component<QuestionTextProps> {
    state: {
        autocompleteModalVisible: boolean;
    };
    getKeyboardType: () => "default" | "numeric" | "email-address";
    openAutocompleteModal: () => void;
    closeAutocompleteModal: () => void;
    renderAutoCompleteItem: ({ item }: {
        item: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
declare const _default: typeof QuestionText & import("mobx-react").IWrappedComponent<{}>;
export default _default;
