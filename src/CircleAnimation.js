import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");
const WIDTH_CIRCLE = 200;
const HEIGHT_CIRCLE = 200;
export default class CircleAnimation extends Component {
  constructor(props) {
    super(props);
    this.animtion = new Animated.Value(0);
    this.animationBottom = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.animtion, {
      toValue: 2,
      duration: 5000
    }).start();
  }
  render() {
    const topCircleAnimation = this.animtion.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
      extrapolate: "clamp"
    });
    const rotateTopCircle = {
      transform: [
        { translateY: WIDTH_CIRCLE / 4 },
        {
          rotateZ: topCircleAnimation
        },
        { translateY: -WIDTH_CIRCLE / 4 }
      ]
    };

    const BottomCircleAnimation = this.animtion.interpolate({
      inputRange: [1, 2],
      outputRange: ["0deg", "180deg"],
      extrapolate: "clamp"
    });
    const rotateBottomCircle = {
      transform: [
        { translateY: -WIDTH_CIRCLE / 4 },
        {
          rotateZ: BottomCircleAnimation
        },
        { translateY: WIDTH_CIRCLE / 4 }
      ]
    };
    return (
      <View style={styles.container}>
        <View style={styles.circlContainer}>
          <View style={styles.bgCircle}>
            <Animated.View
              style={[
                styles.topDemiCircle,
                rotateTopCircle
                //   { opacity: circleOp }
              ]}
            ></Animated.View>
          </View>
          <View style={styles.bgCircleBottom}>
            <Animated.View
              style={[styles.BottomDemiCircle, rotateBottomCircle]}
            ></Animated.View>
          </View>
          <View style={styles.centerView}></View>
        </View>
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
  bgCircle: {
    width: WIDTH_CIRCLE,
    height: HEIGHT_CIRCLE / 2,
    backgroundColor: "tomato",
    borderTopLeftRadius: WIDTH_CIRCLE / 2,
    borderTopRightRadius: WIDTH_CIRCLE / 2,
    // justifyContent: "center",
    // alignItems: "center",
    overflow: "hidden"
  },
  topDemiCircle: {
    width: WIDTH_CIRCLE,
    height: HEIGHT_CIRCLE / 2,
    backgroundColor: "green",
    borderTopLeftRadius: WIDTH_CIRCLE / 2,
    borderTopRightRadius: WIDTH_CIRCLE / 2
  },
  bgCircleBottom: {
    width: WIDTH_CIRCLE,
    height: HEIGHT_CIRCLE / 2,
    backgroundColor: "tomato",
    borderBottomLeftRadius: WIDTH_CIRCLE / 2,
    borderBottomRightRadius: WIDTH_CIRCLE / 2,
    // justifyContent: "center",
    // alignItems: "center",
    overflow: "hidden"
  },
  BottomDemiCircle: {
    width: WIDTH_CIRCLE,
    height: HEIGHT_CIRCLE / 2,
    transform: [{ rotate: "90deg" }],
    backgroundColor: "green",
    borderBottomRightRadius: WIDTH_CIRCLE / 2,
    borderBottomLeftRadius: WIDTH_CIRCLE / 2
  },
  circlContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  centerView: {
    backgroundColor: "white",
    position: "absolute",
    height: HEIGHT_CIRCLE - 10,
    width: WIDTH_CIRCLE - 10,
    borderRadius: (WIDTH_CIRCLE - 10) / 2
  }
});
