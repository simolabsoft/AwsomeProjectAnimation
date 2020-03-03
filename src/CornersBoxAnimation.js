import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");

export default class CornerBoxAnimation extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.ValueXY()
  };
  startAnimation = () => {
    console.log(height);
    console.log(height - this._heigt);
    Animated.sequence([
      Animated.spring(this.state.animation.y, {
        toValue: height - this._heigt
      }),
      Animated.spring(this.state.animation.x, {
        toValue: width - this._width
      }),
      Animated.spring(this.state.animation.y, {
        toValue: 0
      }),
      Animated.spring(this.state.animation.x, {
        toValue: 0
      })
    ]).start();
  };
  saveDimensions = e => {
    this._width = e.nativeEvent.layout.width;
    this._heigt = e.nativeEvent.layout.height;
  };
  render() {
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform()
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View
            onLayout={this.saveDimensions}
            style={[styles.box, animatedStyle]}
          ></Animated.View>
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
  box: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: "red"
  }
});
