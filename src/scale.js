import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class Scale extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.Value(1)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1000
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 2000
      }).start();
    });
  };
  render() {
    const animatedStyle = {
      transform: [{ scaleY: this.state.animation }]
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
