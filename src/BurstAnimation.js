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
let yPos = 2;
let heigSecondViewLeft;
class BurstAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationScroll: new Animated.Value(0)
    };
  }
  getInerpolationColor = () => {
    const inputRange = [0, width];
    const outputRange = [width, 20];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  getInerpolationTop = () => {
    console.log("dakhl lfuction : ", -this.props.index * yPos);
    const inputRange = [0, width];
    const outputRange = [0, -this.props.index * yPos];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };

  getInterpolateHeigt = () => {
    const inputRange = [0, width];
    const outputRange = [Intial_Height, height - 40];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    this.xPos = x;
    (yPos = y), (this.viewWidth = width), (this.viewHeight = height);
    console.log("y : ", yPos);
    heigSecondViewLeft = {
      left: this.getInerpolationColor(),
      height: this.getInterpolateHeigt(),
      top: this.getInerpolationTop()
    };
    this.forceUpdate();
  }
  render() {
    heigSecondViewLeft = {
      left: this.getInerpolationColor(),
      height: this.getInterpolateHeigt(),
      top: this.getInerpolationTop()
    };
    return (
      <View
        style={{ height: Intial_Height }}
        onLayout={event => {
          this.find_dimesions(event.nativeEvent.layout);
        }}
      >
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
            style={[
              {
                width: width,
                backgroundColor: "yellow"
              }
            ]}
          >
            <Text>hello</Text>
          </Animated.View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            {
              backgroundColor: "gray",
              width: width - 40,
              marginTop: 5,
              position: "absolute",
              borderRadius: 30,
              marginRight: 20

              // overflow: "visible"
            },
            heigSecondViewLeft
          ]}
        ></Animated.View>
      </View>
    );
  }
}

export default class BurstAnimationContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BurstAnimation index={0}></BurstAnimation>
        <BurstAnimation index={1}></BurstAnimation>
        <BurstAnimation index={1}></BurstAnimation>
        <BurstAnimation index={1}></BurstAnimation>
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
