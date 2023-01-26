import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "./colors";
import TouchableWithFeedback from "./TouchableWithFeedback";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 0,
    alignSelf: "center",
    borderRadius: 5,
    overflow: "hidden"
  },
  rateItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 30,
    padding: 5,
    backgroundColor: colors.lightGray,
    borderRightWidth: 1,
    borderRightColor: colors.extraLightGray
  },
  rateItemText: {
    marginLeft: 3,
    marginRight: 3,
    fontWeight: "500",
    color: colors.darkGray
  },
  rateItemTextChecked: {
    color: colors.white
  },
  lastRateItem: {
    borderRightWidth: 0
  },
  checkedRateItem: {
    backgroundColor: colors.primary
  }
});

export interface QuestionRateProps {
  rateValues: Array<any>;
  minRateDescription?: string;
  maxRateDescription?: string;
  value?: any;
  onChange(value, comment?);
}

export default class QuestionRate extends React.Component<QuestionRateProps> {
  onItemChecked = (value) => {
    this.props.onChange(value);
  };

  render() {
    const {
      rateValues = [],
      minRateDescription = "",
      maxRateDescription = "",
      value
    } = this.props;

    const itemsMaxIdx = rateValues.length - 1;
    return (
      <View style={styles.container}>
        {rateValues.map((v, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === itemsMaxIdx;
          const checked = v.value === value;
          const textStyles = [
            styles.rateItemText,
            checked ? styles.rateItemTextChecked : null
          ];
          return (
            <TouchableWithFeedback
              key={v.value}
              onPress={() => this.onItemChecked(v.value)}
            >
              <View
                style={[
                  styles.rateItem,
                  isLast && styles.lastRateItem,
                  checked && styles.checkedRateItem
                ]}
              >
                {isFirst && (
                  <Text style={textStyles}>{minRateDescription}</Text>
                )}
                <Text style={textStyles}>{v.text}</Text>
                {isLast && <Text style={textStyles}>{maxRateDescription}</Text>}
              </View>
            </TouchableWithFeedback>
          );
        })}
      </View>
    );
  }
}
