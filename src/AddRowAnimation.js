import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";
const { height, width } = Dimensions.get("window");
let animatedStyle;
export default class AddRowAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfrow: 0
    };
    this.animation = new Animated.ValueXY({ x: 0, y: 0 });
  }
  startAnimation = () => {
    Animated.spring(this.animation, {
      toValue: { x: 1, y: 1 },
      duration: 50,
      useNativeDriver: true
    }).start(() => {});
  };
  renderRow = () => {
    return Array.from(Array(this.state.numberOfrow)).map((x, index) => (
      <Animated.View
        style={[
          styles.rowStyle,
          this.state.numberOfrow - 1 == index ? animatedStyle : null
        ]}
        key={index}
      >
        <Text>hello world {index}</Text>
      </Animated.View>
    ));
  };
  addNewArrow = () => {
    this.startAnimation();

    this.setState(
      (prevState, props) => {
        return { numberOfrow: prevState.numberOfrow + 1 };
      },
      () => (this.animation = new Animated.ValueXY({ x: 0, y: 0 }))
    );
  };
  render() {
    animatedStyle = {
      transform: [{ scaleY: this.animation.y }, { scaleX: this.animation.x }]
    };
    return (
      <View style={styles.conatiner}>
        <ScrollView style={{ flex: 1, backgroundColor: "#CDCDCD" }}>
          {this.renderRow()}
        </ScrollView>
        <TouchableOpacity style={styles.plusButton} onPress={this.addNewArrow}>
          <Text style={{ fontSize: 20, color: "white" }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1
    // alignItems: "center"
  },
  rowStyle: {
    // flex: 1,
    backgroundColor: "red",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    padding: 10
  },
  plusButton: {
    position: "absolute",
    top: height - 80,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  }
});
