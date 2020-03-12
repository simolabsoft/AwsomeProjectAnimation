import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  PanResponder,
  ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
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
const SWIPE_THRESHOLD = width / 2;
export default class Animation_3D extends Component {
  constructor(props) {
    super(props);
    this.golobalAnimation = new Animated.Value(0);

    this.state = {
      pointer: "none",
      pan: new Animated.ValueXY(),
      open: false
    };
  }

  renderHomePage = () => {
    return (
      <View style={{ flex: 1 }}>
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

          <TouchableOpacity
            style={styles.bootBtn}
            onPress={this.startAnimation}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height / 2 + 120 }}>
          <ScrollView
            style={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            horizontal
          >
            {MovieData.map((movie, index) => {
              return (
                <View
                  style={{
                    // backgroundColor: "#666",
                    width: width,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View style={[styles.carStyle]}>
                    <Image
                      source={movie.image}
                      resizeMode={"cover"}
                      style={[{ height: 350, width: width - 80 }]}
                    ></Image>
                  </View>
                  <View style={[styles.titleContainer]}>
                    <Text style={[styles.movieTilteText]}>{movie.name}</Text>
                    <Text style={[styles.moviteCompanyText]}>
                      {movie.company}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };
  componentWillMount() {
    this._val = {
      x: 0,
      y: 0
    };
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: null
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.moveX < width - SWIPE_THRESHOLD) {
          Animated.event([null, { dx: this.state.pan.x, dy: null }])(
            e,
            gestureState
          );
        }

        // Animated.event([null, { dx: this.state.pan.x, dy: null }])(
        //   e,
        //   gestureState
        // );
      },
      onPanResponderRelease: (e, gesture) => {
        // if (this.isDropArea(gesture)) {
        //   Animated.timing(this.state.opacity, {
        //     toValue: 0,
        //     duration: 1000
        //   }).start(() =>
        //     this.setState({
        //       showDraggable: false
        //     })
        //   );
        // } else {
        //   Animated.parallel([
        //     Animated.spring(this.state.pan, {
        //       toValue: 0,
        //       // duration: 1000
        //       friction: 6
        //     }),
        //     Animated.spring(this.state.deleteOpacity, {
        //       toValue: 0,
        //       // duration: 1000
        //       friction: 6
        //     })
        //   ]).start();
        // }
        let velocity;

        if (gesture.dx >= 0) {
          velocity = 3;
        } else if (gesture.dx < 0) {
          velocity = -3;
        }

        if (Math.abs(this.state.pan.x._value) > width - SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: { x: velocity, y: gesture.vy },
            deceleration: 0.98
          }).start(this.startAnimation());
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  startAnimation = () => {
    Animated.spring(this.golobalAnimation, {
      toValue: this.state.open ? 0 : 1,

      friction: 6,

      tension: 200,

      useNativeDriver: true
    }).start(() => {
      if (!this.state.open) this.setState({ pointer: "auto", open: true });
      else this.setState({ pointer: "none", open: false });
      this.state.pan.setValue({ x: 0, y: 0 });
    });
  };
  render() {
    const fullScreenTransformX = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width / 2],
      extrapolate: "clamp"
    });
    const fullScreenTransformRotate = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-40deg"],
      extrapolate: "clamp"
    });
    const fullScreenTransformX1 = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width / 2],
      extrapolate: "clamp"
    });
    const overlayOpacity = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: "clamp"
    });
    const fullScreenScale = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
      extrapolate: "clamp"
    });
    const fullScreenBorderRadius = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
      extrapolate: "clamp"
    });
    const cardTranslatex = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0],
      extrapolate: "clamp"
    });
    const cardRotateOnTranslate = this.state.pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, SWIPE_THRESHOLD],
      outputRange: ["60deg", "-60deg"],
      extrapolate: "clamp"
    });
    const panStyle = {
      transform: [
        ...this.state.pan.getTranslateTransform(),
        { rotateY: cardRotateOnTranslate }
      ]
    };
    const cardRotate = this.golobalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "0deg"],
      extrapolate: "clamp"
    });

    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <View
          style={{ flex: 1, backgroundColor: "yellow", position: "absolute" }}
        ></View> */}
        <Animated.View
          style={[
            styles.container,
            {
              borderRadius: fullScreenBorderRadius,
              transform: [
                { translateX: fullScreenTransformX },
                { rotateY: fullScreenTransformRotate },
                { translateX: fullScreenTransformX1 },
                { scale: fullScreenScale }
              ]
            }
          ]}
        >
          {/* <TouchableOpacity style={styles.button} onPress={this.startAnimation}>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "white" }}>
              Click me
            </Text>
          </TouchableOpacity> */}
          {this.renderHomePage()}
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "black",
            position: "absolute",
            width: width,
            height: height,
            opacity: overlayOpacity
          }}
          pointerEvents={this.state.pointer}
        >
          {/* <TouchableOpacity style={{ flex: 1 }} onPress ={this.startAnimation()}></TouchableOpacity> */}
        </Animated.View>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.cardContainer,
            this.state.open
              ? panStyle
              : {
                  transform: [
                    { rotateY: cardRotate },
                    { translateX: cardTranslatex }
                  ]
                }

            // this.state.open
            //   ? panStyle
            //   : { transform: [{ translateX: cardTranslatex }] }
          ]}
        >
          <Image
            source={require("../assets/badboys.jpg")}
            style={styles.avatar}
            resizeMode={"cover"}
          ></Image>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5
              }}
            >
              Mohammed Labied
            </Text>
            <Text style={{ color: "#3D5974", fontSize: 12 }}>
              m.mohammed.labied@gmail.com
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "35%"
            }}
          >
            <Icon name="home" size={30} color="black" />
            <Text style={styles.iconText}>Home</Text>
          </View>
          <View
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              flexDirection: "row",
              width: "35%"
            }}
          >
            <Icon name="credit-card" size={30} color="black" />
            <Text style={styles.iconText}>Payments</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "35%"
            }}
          >
            <Icon name="reply" size={30} color="black" />
            <Text style={styles.iconText}>Logout</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotateY: "-30deg" }],
    height: height,
    width: width
  },
  button: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22
  },
  cardContainer: {
    paddingVertical: 20,
    width: width - 100,
    backgroundColor: "white",
    height: "70%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
    position: "absolute",
    // left: -width + 130,
    justifyContent: "space-around",
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10
  },
  iconText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",

    width: 100,
    marginLeft: 5
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
