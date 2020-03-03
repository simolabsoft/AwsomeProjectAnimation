import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.Value(0)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1000
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 0
      }).start();
    });
  };
  render() {
    const animatedStyle = {
      transform: [{ translateY: this.state.animation }]
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
    width: 200,
    height: 200,
    backgroundColor: "red"
  }
});
