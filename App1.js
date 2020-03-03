/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated
} from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
export default class App extends React.Component {
  constructor() {
    super();
    this.translateX = new Animated.Value(0);
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX
          }
        }
      ],
      { useNativeDriver: true }
    );

    this.onHandlerStateChange = event => {
      if (event.nativeEvent.oldState == State.ACTIVE) {
        Animated.timing(this.translateX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }).start();
      }
    };
  }
  componentDidMount() {
    setInterval(() => {
      for (let index = 0; index < 5000; index++) {
        console.log("hello", index);
      }
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}
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
    height: 100,
    width: 100,
    backgroundColor: "red"
  }
});
