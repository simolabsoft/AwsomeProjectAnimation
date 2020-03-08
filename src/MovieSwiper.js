import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const MovieData = [
  {
    name: "MERCY",
    company: "PVR Sahara",
    image: require("../assets/justMercy.jpg"),
    backgroundColor: "#E3AC39"
  },
  {
    name: "BAD BOYS",
    company: "PVR Collection",
    image: require("../assets/badboys.jpg"),
    backgroundColor: "#69759A"
  },
  {
    name: "PANGA",
    company: "PVR Collection",
    image: require("../assets/panga.jpg"),
    backgroundColor: "#9A7F6B"
  }
];

const { width, height } = Dimensions.get("window");
let textTitleOpacity;
let cardRoation;
export default class MovieSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationScroll: new Animated.Value(0)
    };
  }
  getInerpolationColor = i => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const outputRange = [
      MovieData[0].backgroundColor,
      MovieData[1].backgroundColor,
      MovieData[2].backgroundColor
    ];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  getInerpolationTextOpacity = i => {
    const inputRange = [
      (i - 1) * width + width * 0.5,
      i * width,
      (i + 1) * width - width * 0.5
    ];
    const outputRange = [0, 1, 0];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  getInerpolationCardRotaion = i => {
    const inputRange = [
      (i - 1) * width + width * 0.5,
      i * width,
      (i + 1) * width - width * 0.5
    ];
    const outputRange = ["-20deg", "0deg", "0deg"];
    return this.state.animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };

  render() {
    const backgroundAnimation = this.getInerpolationColor(1);
    // textTitleOpacity = this.getInerpolationTextOpacity(0);
    // cardRoation = this.getInerpolationCardRotaion(0);
    return (
      <Animated.View
        style={[styles.contaier, { backgroundColor: backgroundAnimation }]}
      >
        <View style={styles.bottomCard}>
          <View style={{ height: "65%" }}></View>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "#ACB333",
              justifyContent: "space-between",
              marginHorizontal: 30
            }}
          >
            <Text style={styles.timeText}>Today</Text>
            <Text style={styles.timeText}>12:45</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "#ACB333",
              justifyContent: "space-between",
              marginHorizontal: 30
            }}
          >
            <Text
              style={[
                styles.timeText,
                { color: "#C0BEC0", fontSize: 16, marginLeft: 8 }
              ]}
            >
              Mon
            </Text>
            <Text
              style={[
                styles.timeText,
                { color: "#C0BEC0", fontSize: 16, marginRight: 5 }
              ]}
            >
              14:15
            </Text>
          </View>

          <TouchableOpacity style={styles.bootBtn}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height / 2 + 120 }}>
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
            {MovieData.map((movie, index) => {
              cardRoation = this.getInerpolationCardRotaion(index);
              textTitleOpacity = this.getInerpolationTextOpacity(index);

              return (
                <View
                  style={{
                    // backgroundColor: "#666",
                    width: width,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Animated.View
                    style={[
                      styles.carStyle,
                      {
                        // backgroundColor: "red",

                        transform: [{ rotate: cardRoation }]
                      }
                    ]}
                  >
                    <Animated.Image
                      source={movie.image}
                      resizeMode={"cover"}
                      style={[
                        { height: 350, width: width - 80 },
                        {
                          // backgroundColor: "red",

                          transform: [{ rotate: cardRoation }]
                        }
                      ]}
                    ></Animated.Image>
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.titleContainer,
                      { opacity: textTitleOpacity }
                    ]}
                  >
                    <Text style={[styles.movieTilteText]}>{movie.name}</Text>
                    <Text style={[styles.moviteCompanyText]}>
                      {movie.company}
                    </Text>
                  </Animated.View>
                </View>
              );
            })}
          </Animated.ScrollView>
        </View>
        {/* <View style={styles.bottomCard}></View> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  contaier: {
    flex: 1
    // backgroundColor: "green"
  },
  scrollContainer: {
    // flex: 1,
    // height: height / 2 + 200,
    // backgroundColor: "red"
    // width: width / 2
  },
  bottomCard: {
    height: height / 2 + 100,
    position: "absolute",
    backgroundColor: "white",
    // width: width - 50,
    right: 10,
    left: 10,
    bottom: 20,
    borderRadius: 10
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  bootBtn: {
    backgroundColor: "#FF5F3A",
    width: "90%",
    height: 60,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  posterCard: {
    height: "80%",
    width: "60%",
    borderRadius: 30
  },
  movieTilteText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  moviteCompanyText: {
    fontSize: 16,
    color: "#7C7A7C",
    textAlign: "center"
  },
  titleContainer: {
    marginTop: 10
  },
  carStyle: {
    width: width - 80,
    height: 350,
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
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
