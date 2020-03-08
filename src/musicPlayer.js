import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");
export default class musicPlayer extends Component {
  render() {
    return (
      <View style={styles.conainer}>
        <View style={styles.playerContainer}>
          <View style={[styles.diskContainer]}>
            <Animated.Image
              source={require("../assets/badboys.jpg")}
              style={[styles.disk]}
            ></Animated.Image>
            <View style={[styles.blackHole]}></View>
          </View>
          <View style={styles.details}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BEE5E9"
  },
  playerContainer: {
    width: width * 0.7,
    backgroundColor: "#FFFFFF",
    height: height * 0.2,
    borderTopLeftRadius: (height * 0.2) / 2,
    borderBottomLeftRadius: (height * 0.2) / 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    flexDirection: "row"
  },
  disk: {
    width: height * 0.17,
    height: height * 0.17,
    borderRadius: (height * 0.17) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  details: {
    backgroundColor: "red"
  },
  blackHole: {
    position: "absolute",

    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "black",
    alignSelf: "center"
  },
  diskContainer: {
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22
  }
});
