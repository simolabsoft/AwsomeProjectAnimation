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
  constructor(props) {
    super(props);
    this.fullAnimation = new Animated.Value(0);
  }

  startAnimation = () => {
    Animated.timing(this.fullAnimation, {
      toValue: this.fullAnimation._value == 0 ? 1 : 0,
      timing: 1000
    }).start();
  };
  render() {
    const containerBackgroundColor = this.fullAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#BEE5E9", "#201F20"]
    });
    const opicityPlayer = this.fullAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const diskRotation = this.fullAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <Animated.View
        style={[styles.conainer, { backgroundColor: containerBackgroundColor }]}
      >
        <View style={styles.playerContainerBack}></View>
        <Animated.View
          style={[styles.playerContainer, { opacity: opicityPlayer }]}
        >
          <View>
            <TouchableOpacity
              style={[
                styles.diskContainer,
                { position: "absolute", transform: [{ rotate: diskRotation }] }
              ]}
              onPress={this.startAnimation}
            >
              <Animated.Image
                source={require("../assets/badboys.jpg")}
                style={[styles.disk]}
              ></Animated.Image>
              <View style={[styles.blackHole]}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.diskContainer]}
              onPress={this.startAnimation}
            >
              <Animated.Image
                source={require("../assets/badboys.jpg")}
                style={[styles.disk]}
              ></Animated.Image>
              <View style={[styles.blackHole]}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={([styles.diskContainer], { position: "absolute" })}
              onPress={this.startAnimation}
            >
              <Animated.Image
                source={require("../assets/badboys.jpg")}
                style={[styles.disk]}
              ></Animated.Image>
              <View style={[styles.blackHole]}></View>
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 5 }}>
                <Text>Tame Impala</Text>
                <Text>Lost In Yesterday</Text>
              </View>
              <Image
                source={require("../assets/more.png")}
                resizeMode={"contain"}
                style={{ width: 20, height: 20, tintColor: "#A2A0A2" }}
              ></Image>
            </View>
            <View
              style={{ width: "100%", height: 3, backgroundColor: "#A2A0A2" }}
            >
              <View
                style={{ width: "60%", height: 3, backgroundColor: "#1AB5E5" }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10
              }}
            >
              <Text style={{ fontSize: 10, color: "#A2A0A2" }}>1:45</Text>
              <Text style={{ fontSize: 10, color: "#A2A0A2" }}>4:30</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    width: height * 0.16,
    height: height * 0.16,
    borderRadius: (height * 0.16) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  details: {
    // backgroundColor: "red",
    justifyContent: "space-between",
    height: "70%",
    marginLeft: 3
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
  },
  playerContainerBack: {
    backgroundColor: "#272627",
    width: width * 0.7,

    height: height * 0.2,
    borderTopLeftRadius: (height * 0.2) / 2,
    borderBottomLeftRadius: (height * 0.2) / 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: "absolute"
  }
});
