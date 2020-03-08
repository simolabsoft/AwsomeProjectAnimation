/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import SplashScreen from "react-native-splash-screen";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import Animated from "react-native-reanimated";
const {
  set,
  cond,
  eq,
  spring,
  startClock,
  stopClock,
  clockRunning,
  defined,
  Value,
  Clock,
  event
} = Animated;

function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0)
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ];
}

import { PanGestureHandler, State } from "react-native-gesture-handler";
export default class App extends React.Component {
  constructor() {
    super();

    this.translateX = new Value(0);
    const dragX = new Value(0);
    const state = new Value(-1);
    const clock = new Clock();
    const dragVx = new Value(0);
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: dragX,
            velocityX: dragVx,
            state: state
          }
        }
      ]
      // { useNativeDriver: true }
    );
    const transX = new Value();
    this.translateX = cond(
      eq(state, State.ACTIVE),
      [stopClock(clock), set(transX, dragX), transX],
      [
        set(
          transX,
          cond(defined(transX), runSpring(clock, transX, dragVx, 0), 0)
        ),
        transX
      ]
    );

    this.onHandlerStateChange = event => {
      // if (event.nativeEvent.oldState == State.ACTIVE) {
      //   Animated.timing(this.translateX, {
      //     toValue: 0,
      //     duration: 1000,
      //     useNativeDriver: true
      //   }).start();
      // }
    };
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  {
                    translateX: this.translateX
                  }
                ]
              }
            ]}
          ></Animated.View>
        </PanGestureHandler>
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
    height: 50,
    width: 50,
    backgroundColor: "red"
  }
});
