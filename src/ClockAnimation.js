import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;
export default class ClockAnimation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rotateSeconds = "0deg";
    const transformSeconds = {
      transform: [{ rotate: rotateSeconds }]
    };
    const rotateMinutes = "75deg";
    const transformMinutes = {
      transform: [{ rotate: rotateMinutes }]
    };
    const rotateHours = "100deg";
    const transformHours = {
      transform: [{ rotate: rotateHours }]
    };
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}></StatusBar>
        <View style={styles.BigQuadron}></View>
        <View style={styles.MediumQuadron}></View>

        <View style={[styles.mover, transformHours]}>
          <View style={styles.hours}></View>
        </View>
        <View style={[styles.mover, transformMinutes]}>
          <View style={styles.minutes}></View>
        </View>
        <View style={[styles.mover, transformSeconds]}>
          <View style={styles.seconds}></View>
        </View>
        <View style={styles.SmallQuadron}></View>
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
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    // backgroundColor: "red"
    justifyContent: "flex-start"
  },
  hours: {
    // position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    height: "35%",
    marginTop: "15%",
    width: 4,
    borderRadius: 4
  },
  minutes: {
    // position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "45%",
    marginTop: "5%",
    width: 3,
    borderRadius: 3
  },
  seconds: {
    position: "absolute",
    backgroundColor: "rgba(255,9,9,0.4)",
    height: "50%",

    width: 4,
    borderRadius: 4
  },
  BigQuadron: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: "rgba(200,200,200,0.2)",
    position: "absolute"
  },
  MediumQuadron: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: "rgba(200,200,200,0.4)",
    position: "absolute"
  },
  SmallQuadron: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    position: "absolute"
  }
});
