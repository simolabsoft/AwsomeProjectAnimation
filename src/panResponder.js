import React, { Component } from "react";
import { Text, View, StyleSheet, PanResponder, Animated } from "react-native";
import Scale from "./scale";

export default class panResponder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }
  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    let circleStyle = {
      transform: [{ translateX }, { translateY }, { scale: this.state.scale }]
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, circleStyle]}
          {...this._panResponder.panHandlers}
        ></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red"
  }
});
