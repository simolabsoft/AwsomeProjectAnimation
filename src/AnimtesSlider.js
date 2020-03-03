// import React from "react";
// import { Dimensions, StyleSheet, View } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, { Value } from "react-native-reanimated";

// const { width } = Dimensions.get("window");
// const SLIDER_WIDTH = width - 100;
// const SLIDER_HEIGHT = 50;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#a9cbee"
//   }
// });

// export default () => {
//   const state = new Value(State.UNDETERMINED);
//   const translationX = new Value(0);
//   const gestureHandler = Animated.event(
//     [{ nativeEvent: { x: translationX } }],
//     { useNativeDriver: true }
//   );
//   return (
//     <View style={styles.container}>
//       <View>
//         <PanGestureHandler onGestureEvent={gestureHandler}>
//           <Animated.View>
//             <Knobe {...{ state }} />
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     </View>
//   );
// };
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("screen");

const BAR_WITH = width - 100;
const BAR_HEIGHT = 20;
const RADIUS = BAR_WITH / 2;
let barContainerWidth;
let barContainerX;
export default class panResponder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      percentage: 0,
      showPercentage: false,
      coloredWidth: 0
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        // if (gestureState.y0 < 0 || gestureState.y0 > height) return false;
        // else return true;
        return true;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.setState({ showPercentage: true });
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: null
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      //   onPanResponderMove: Animated.event([
      //     null,
      //     { dx: this.state.pan.x, dy: this.state.pan.y }
      //   ]),
      onPanResponderMove: (e, gestureState) => {
        if (
          gestureState.moveX > barContainerX + 15 &&
          gestureState.moveX < barContainerX + barContainerWidth - 15
        ) {
          Animated.event([null, { dx: this.state.pan.x, dy: null }])(
            e,
            gestureState
          );
          console.log("movx : ", gestureState.moveX);
          console.log("barcontainerx : ", barContainerX);
          this.setState({
            percentage: Math.floor(
              ((gestureState.moveX - 15 - barContainerX) * 100) /
                (barContainerWidth - 15)
            ),
            coloredWidth: (this.state.percentage * barContainerWidth) / 100 + 15
          });
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ showPercentage: false });
        console.log("gestureState : ", gestureState);
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }

  render() {
    console.log("bar with : ", barContainerWidth);
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    let circleStyle = {
      transform: [{ translateX }, { scale: this.state.scale }]
    };

    return (
      <View style={styles.container}>
        <View
          style={styles.barContainer}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            barContainerWidth = layout.width;
            barContainerX = layout.x;
            console.log("width:", layout.width);
            console.log("x:", layout.x);
          }}
        >
          <View
            style={[styles.colordProgess, { width: this.state.coloredWidth }]}
          ></View>
          <Animated.View
            style={[styles.circle, circleStyle]}
            {...this._panResponder.panHandlers}
          >
            {this.state.showPercentage && (
              <View style={styles.topIndicator}>
                <Text style={{ fontSize: 12, color: "black" }}>
                  {this.state.percentage}%
                </Text>
              </View>
            )}
          </Animated.View>
        </View>
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
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#80D4FA",
    justifyContent: "center",
    alignItems: "center"
  },
  barContainer: {
    width: BAR_WITH,
    height: BAR_HEIGHT,
    backgroundColor: "gray",
    borderRadius: RADIUS,
    justifyContent: "center"
  },
  topIndicator: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: "#03A9F5",
    borderRadius: 25,
    position: "absolute",
    top: -60,
    justifyContent: "center",
    alignItems: "center"
  },
  colordProgess: {
    position: "absolute",
    backgroundColor: "#03A9F5",
    height: BAR_HEIGHT,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25
  }
});
