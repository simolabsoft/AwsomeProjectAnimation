import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text
} from "react-native";

export default class Progressbar extends Component {
  constructor(props) {
    super(props);
    this.pbWith = new Animated.Value(0);
    this.state = {
      percentage: 0
    };
    this.pbWith.addListener(progress => {
      this.setState({ percentage: Math.floor(progress.value * 100) });
    });
  }

  startAnimation = () => {
    Animated.timing(this.pbWith, {
      toValue: 1,
      duration: 5000
    }).start();
  };
  render() {
    const animatedStyle = this.pbWith.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    });
    const animatedStyleColor = this.pbWith.interpolate({
      inputRange: [0, 1],
      outputRange: ["red", "green"]
    });
    const perc = this.pbWith.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    const prStyleAnimated = {
      width: animatedStyle,
      backgroundColor: animatedStyleColor
    };
    return (
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.pbStyle, prStyleAnimated]}
          ></Animated.View>
        </View>
        <Text>{this.state.percentage}%</Text>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <View style={styles.circle}>
            <Text style={{ fontSize: 12, color: "white" }}>
              Start Animation
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
  }
});
