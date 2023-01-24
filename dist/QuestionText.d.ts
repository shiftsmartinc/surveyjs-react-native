import React from 'react';
export interface Props {
    isPreview?: boolean;
    placeholder?: string;
    inputType?: string;
    rows?: number;
    value: string;
    onChange(value: string): Function;
    autoComplete?: string;
    dataList?: [string];
}
export default class QuestionText extends React.Component<Props> {
    getKeyboardType: () => "default" | "numeric" | "email-address";
    state: {
        autocompleteModalVisible: boolean;
    };
    openAutocompleteModal: () => void;
    closeAutocompleteModal: () => void;
    renderAutoCompleteItem: ({ item }: {
        item: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
