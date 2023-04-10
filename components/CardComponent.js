import { View, StyleSheet } from "react-native";
import React from "react";
import Color from "./Color";

export default function CardComponent(props) {
  return <View style={styles.body}>{props.children}</View>;
};
const styles = StyleSheet.create({
    body: {
      backgroundColor: 'rgb(220,220,220)',
      marginVertical: 10,
      marginHorizontal: 30,
      padding: 25,
      borderRadius: 10,
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
});
