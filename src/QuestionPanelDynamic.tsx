import React from 'react';
import { View, Text, Alert } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

export interface QuestionPanelDynamicProps {
  buildComponent: (json) => {};
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

export default class QuestionPanelDynamic extends React.Component<
  QuestionPanelDynamicProps,
  any
> {
  cnt: number;

  constructor(props) {
    super(props);

    this.cnt = 1;

    this.state = {
      panelCount: this.props.panelCount || 1,
      panelArrayKeys: Array(this.props.panelCount || 1)
        .fill(0)
        .map(() => this.generatePanelKey()),
    };
  }

  onPanelRemoveButtonClicked = (key) => {
    // TODO confirmation
    if (!this.props.confirmDelete) {
      this.onPanelRemove(key);
      return;
    }
    Alert.alert(
      'Confirmation',
      this.props.confirmDeleteText || 'Are you sure to remove it',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Remove', onPress: () => this.onPanelRemove(key) },
      ],
      { cancelable: true },
    );
  };

  onPanelRemove = (key) => {
    const { panelArrayKeys } = this.state;
    const idx = panelArrayKeys.indexOf(key);
    if (idx === -1) {
      return;
    }
    const newArray = [
      ...panelArrayKeys.slice(0, idx),
      ...panelArrayKeys.slice(idx + 1),
    ];
    this.setState({
      panelArrayKeys: newArray,
    });
  };

  onNewPanel = () => {
    const newKey = this.generatePanelKey();
    this.setState({
      panelArrayKeys: [...this.state.panelArrayKeys, newKey],
    });
  };

  generatePanelKey = () =>
    `${this.cnt++}-${Math.round(Math.random() * 1000000)}`;

  renderPanel(key) {
    const {
      templateTitle = null,
      panelRemoveText = 'Remove',
      minPanelCount = 0,
    } = this.props;
    const panelCount = this.state.panelArrayKeys.length;
    return (
      <View key={key}>
        {templateTitle && <Text>{templateTitle}</Text>}
        {this.props.templateElements.map((v) => this.props.buildComponent(v))}
        {panelCount > minPanelCount && (
          <TouchableWithFeedback
            onPress={() => this.onPanelRemoveButtonClicked(key)}
          >
            <Text>{panelRemoveText}</Text>
          </TouchableWithFeedback>
        )}
      </View>
    );
  }

  render() {
    const { panelAddText = 'Add new', maxPanelCount = 100 } = this.props;
    const panelCount = this.state.panelArrayKeys.length;
    return (
      <View>
        {this.state.panelArrayKeys.map((key) => this.renderPanel(key))}
        {maxPanelCount > panelCount && (
          <TouchableWithFeedback onPress={this.onNewPanel}>
            <Text>{panelAddText}</Text>
          </TouchableWithFeedback>
        )}
      </View>
    );
  }
}
