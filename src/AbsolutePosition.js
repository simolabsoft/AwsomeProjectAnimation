import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class AbsolutePosition extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.Value(0)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 50,
      duration: 1000
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1000
      }).start();
    });
  };
  render() {
    const animatedStyle = {
      top: this.state.animation,
      left: this.state.animation
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
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
