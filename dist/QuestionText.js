var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
const styles = StyleSheet.create({
    input: {
        marginHorizontal: 24,
        paddingVertical: 0,
        paddingHorizontal: 16,
        fontSize: 15,
        height: 50,
        color: '#4471a0',
        backgroundColor: '#fff',
        shadowColor: '#e3e3e9',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    }
});
let QuestionText = class QuestionText extends React.Component {
    constructor() {
        super(...arguments);
        this.getKeyboardType = () => {
            const { inputType = 'text' } = this.props;
            switch (inputType) {
                case 'number':
                    return 'numeric';
                case 'email':
                    return 'email-address';
                default:
                    return 'default';
            }
        };
    }
    render() {
        const { isPreview, placeholder, value, onChange, rows = 1 } = this.props;
        const isMultiline = rows > 1;
        return (<TextInput style={[styles.input, isMultiline && { height: 19 * rows }]} multiline={isMultiline} placeholder={placeholder} value={value} onChangeText={onChange} numberOfLines={Number(rows)} placeholderTextColor="#4471a0" underlineColorAndroid={'transparent'} keyboardType={this.getKeyboardType()} editable={!isPreview}/>);
    }
};
QuestionText = __decorate([
    inject((store) => ({
        isPreview: store.model.isPreview,
    })),
    observer
], QuestionText);
export default QuestionText;
