import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView
} from "react-native";

const { width, height } = Dimensions.get("window");
const Intial_Height = height / 4;
export default class BurstAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationScroll: new Animated.Value(0)
    };
  }
  getInerpolationColor = i => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const outputRange = [20, 100, 200];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  render() {
    const heigSecondView = {
      height: this.getInerpolationColor(0)
    };
    return (
      <View style={styles.container}>
        <View style={{ height: Intial_Height }}>
          <Animated.ScrollView
            style={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            horizontal
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animationScroll
                  }
                }
              }
            ])}
          >
            <View style={{ width: width, backgroundColor: "green" }}>
              <Text>hello</Text>
            </View>
            <Animated.View
              style={
                ([
                  {
                    width: width,
                    backgroundColor: "yellow"
                  }
                ],
                heigSecondView)
              }
            >
              <Text>hello</Text>
            </Animated.View>
          </Animated.ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    backgroundColor: "red"
  },
  imageContainer: {
    width: width,
    backgroundColor: "green"
  }
});
