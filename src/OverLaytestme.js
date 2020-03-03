import React, { Component } from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");
const PlusButtonSize = width / 6;

export default class OverlayTestMe extends Component {
  constructor(props) {
    super(props);
    this.oeverLeyValue = new Animated.Value(0);
  }
  startAnimation = () => {
    Animated.timing(this.oeverLeyValue, {
      toValue: this.oeverLeyValue._value === 0 ? 1 : 0,
      duration: 200
    }).start();
  };
  render() {
    const overleyStyleAnimation = this.oeverLeyValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height * 2],
      extrapolate: "clamp"
    });
    const plusRotation = this.oeverLeyValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
      extrapolate: "clamp"
    });
    const button1Y = this.oeverLeyValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
      extrapolate: "clamp"
    });
    const button2Y = this.oeverLeyValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 140],
      extrapolate: "clamp"
    });
    const button3Y = this.oeverLeyValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80],
      extrapolate: "clamp"
    });

    const PlusRotationStyle = {
      transform: [{ rotate: plusRotation }]
    };
    const overleystyle = {
      bottom: 0,
      right: 0,
      height: overleyStyleAnimation,
      width: overleyStyleAnimation,
      borderTopLeftRadius: overleyStyleAnimation
      //   borderTopRightRadius: Animated.divide(overleyStyleAnimation, 2)
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.overley, overleystyle]}></Animated.View>

        <View style={styles.buttonContainer}>
          <Animated.View
            style={[styles.button1, { bottom: button1Y }]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.button1,
              { backgroundColor: "green", bottom: button2Y }
            ]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.button1,
              { backgroundColor: "yellow", bottom: button3Y }
            ]}
          ></Animated.View>
        </View>
        <TouchableHighlight
          style={styles.PlusButton}
          onPress={this.startAnimation}
        >
          <Animated.View
            style={[
              { justifyContent: "center", alignItems: "center" },
              PlusRotationStyle
            ]}
          >
            <Text style={[styles.plustext]}>+</Text>
          </Animated.View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  PlusButton: {
    width: PlusButtonSize,
    height: PlusButtonSize,
    borderRadius: PlusButtonSize / 2,
    backgroundColor: "#2d132c",
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  plustext: {
    fontSize: PlusButtonSize / 2,
    color: "white"
  },
  overley: {
    width: PlusButtonSize,
    height: PlusButtonSize,
    backgroundColor: "#CBCBCB",
    position: "absolute",
    bottom: 10,
    right: 10
  },
  button1: {
    width: PlusButtonSize / 2,
    height: PlusButtonSize / 2,
    borderRadius: PlusButtonSize / 4,
    backgroundColor: "red",
    position: "absolute",

    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: PlusButtonSize,
    height: PlusButtonSize,
    borderRadius: PlusButtonSize / 2,

    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
