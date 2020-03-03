import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text
} from "react-native";

export default class BackgroundColor extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.Value(0)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 3000
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 3000
      }).start();
    });
  };
  render() {
    const boxInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,91,71)", "rgb(99,71,255)"]
    });
    const boxAnimatedStyle = {
      backgroundColor: boxInterpolation
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, boxAnimatedStyle]}>
            <Animated.Text>hello world</Animated.Text>
          </Animated.View>
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

    width: 150,
    height: 150,

    backgroundColor: "red"
  }
});
