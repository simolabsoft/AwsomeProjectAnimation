import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from "react-native";

export default class ScrollEvent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    animation: new Animated.Value(0)
  };

  render() {
    const backgroundColorInterpolation = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,91,71)", "rgb(99,71,255)"]
    });

    const backgroundColorCardInterpolation = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(231,76,60)", "rgb(46,204,113)"]
    });
    const backGroundStyle = {
      backgroundColor: backgroundColorInterpolation
    };
    const backGroundCardStyle = {
      backgroundColor: backgroundColorCardInterpolation
    };
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={1}
          onScroll={
            // e => {
            //   this.state.animation.setValue(e.nativeEvent.contentOffset.y);
            //   console.log(e.nativeEvent);
            // }
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.animation
                  }
                }
              }
            ])
          }
        >
          <Animated.View style={[styles.content, backGroundStyle]}>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
            <Animated.View
              style={[styles.cardStyle, backGroundCardStyle]}
            ></Animated.View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: 3000,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between"
  },
  cardStyle: {
    width: "60%",
    height: 200
  }
});
