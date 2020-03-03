import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text
} from "react-native";
const radius = 50;
const shadowColor = "yellow";
const color = "blue";
const count = 3;

export default class ProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.circleScale = this.repeatElement(new Animated.Value(1), count);
  }
  repeatElement = (element, count) => {
    return Array(count).fill(element);
  };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.circleScale[0], {
        toValue: 3,
        duration: 2000
      }),
      {
        iterations: 50
      }
    ).start();
  }

  render() {
    const animatedStyle = this.circleScale[0].interpolate({
      inputRange: [0, 3],
      outputRange: ["0%", "100%"]
    });
    const animatedStyleColor = this.circleScale[0].interpolate({
      inputRange: [0, 3],
      outputRange: [1, 0]
    });
    const prStyleAnimated = {
      transform: [
        { scaleY: this.circleScale[0] },
        { scaleX: this.circleScale[0] }
      ],
      opacity: animatedStyleColor
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.outerCircle, prStyleAnimated]} />
        <Animated.View style={[styles.outerCircle, prStyleAnimated]} />
        <Animated.View style={[styles.outerCircle, prStyleAnimated]} />
        <Animated.View style={[styles.outerCircle, prStyleAnimated]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "green",
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  progressBarContainer: {
    width: "80%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    overflow: "hidden"
  },
  pbStyle: {
    backgroundColor: "red",
    height: 20
  },
  outerCircle: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: shadowColor,
    position: "absolute"
  }
});
