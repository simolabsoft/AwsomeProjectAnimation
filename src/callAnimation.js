import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated } from "react-native";

const arr = [];
for (var i = 0; i < 10; i++) {
  arr.push(i);
}

export default class CallAnimation extends Component {
  constructor() {
    super();
    this.animatedValue = [];
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(1);
    });
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const animations = arr.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: 3,
        duration: 1000
      });
    });
    Animated.loop(Animated.stagger(200, animations), {
      toValue: -100,
      duration: 3000
      //   iterations: 50
    }).start();
  }

  render() {
    // const animatedStyle = this.circleScale[0].interpolate({
    //   inputRange: [0, 3],
    //   outputRange: ["0%", "100%"]
    // });
    const animatedStyleColor = arr.map(item => {
      return this.animatedValue[item].interpolate({
        inputRange: [0, 3],
        outputRange: [1, 0]
      });
    });
    const prStyleAnimated = arr.map(item => {
      return {
        transform: [
          { scaleY: this.animatedValue[item] },
          { scaleX: this.animatedValue[item] }
        ],
        opacity: animatedStyleColor[item]
      };
    });
    const animations = arr.map((a, i) => {
      return (
        <Animated.View
          key={i}
          style={[
            {
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: "#e74c3c",
              position: "absolute"
            },
            prStyleAnimated[a]
          ]}
        />
      );
    });
    return (
      <View style={styles.container}>
        {animations}
        <Text
          style={{
            position: "absolute",

            color: "white",
            fontSize: 20
          }}
        >
          Calling !!!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34495e"
  }
});
