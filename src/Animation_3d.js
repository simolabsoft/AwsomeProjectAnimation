import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  PanResponder
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
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
        // if (gestureState.dx > 0) {

        // }

        Animated.event([null, { dx: this.state.pan.x, dy: null }])(
          e,
          gestureState
        );
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
      }
    });
  }

  startAnimation = () => {
    Animated.spring(this.golobalAnimation, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start(() => {
      this.setState({ pointer: "auto", open: true });
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
      outputRange: [-width + 100, width - 100 + width / 2 - (width - 100) / 2],
      extrapolate: "clamp"
    });
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

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
          <TouchableOpacity style={styles.button} onPress={this.startAnimation}>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "white" }}>
              Click me
            </Text>
          </TouchableOpacity>
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
        ></Animated.View>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.cardContainer,
            { transform: [{ translateX: cardTranslatex }] }

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
    left: -width + 100,
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
  }
});
