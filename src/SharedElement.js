import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  ImageStore
} from "react-native";

const images = [
  { colorName: "SILVER", colorHexCode: "#C0C0C0" },
  { colorName: "GRAY", colorHexCode: "#808080" },
  { colorName: "BLACK", colorHexCode: "#000000" },
  { colorName: "RED", colorHexCode: "#FF0000" },
  { colorName: "MAROON", colorHexCode: "#800000" },
  { colorName: "YELLOW", colorHexCode: "#FFFF00" },
  { colorName: "OLIVE", colorHexCode: "#808000" },
  { colorName: "LIME", colorHexCode: "#00FF00" },
  { colorName: "GREEN", colorHexCode: "#008000" },
  { colorName: "AQUA", colorHexCode: "#00FFFF" },
  { colorName: "TEAL", colorHexCode: "#008080" },
  { colorName: "BLUE", colorHexCode: "#0000FF" },
  { colorName: "NAVY", colorHexCode: "#000080" },
  { colorName: "FUCHSIA", colorHexCode: "#FF00FF" },
  { colorName: "PURPLE", colorHexCode: "#800080" }
];

export default class SharedElement extends Component {
  componentWillMount() {
    this._gridElements = {};
  }
  handleOpencImage = index => {};
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            {images.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={this.handleOpencImage(index)}
                  ref={image => this._gridElements[(index = image)]}
                  style={[
                    styles.elementStyle,
                    { backgroundColor: item.colorHexCode }
                  ]}
                >
                  <Text style={{ color: "white" }}>{item.colorName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeEvent ? "auto" : "none"}
        >
          <View>
            <Animated.View></Animated.View>
          </View>
          <Animated.View>
            <Text>
              Sint occaecat sint qui incididunt dolor enim cupidatat
              exercitation ullamco ad. Nisi ad aliqua voluptate mollit.
              Cupidatat ullamco excepteur proident ex id exercitation pariatur.
              Dolor velit adipisicing non duis minim officia ea adipisicing
              officia proident commodo incididunt. Quis anim consequat et
              pariatur deserunt exercitation magna anim dolor. Magna nisi esse
              quis qui quis dolore. Dolore Lorem cupidatat officia consequat
              mollit sunt quis. Non qui aute occaecat est quis sit duis eiusmod
              nulla aute fugiat exercitation proident. Non irure nostrud labore
              velit amet aliqua est dolore ullamco elit incididunt anim. Ea
              ullamco cupidatat mollit officia ex non cupidatat aliqua.
              Incididunt reprehenderit proident cillum esse qui sunt occaecat
              aliqua aute aute ea sint duis. Eiusmod aute do eiusmod ut Lorem.
              Dolore veniam voluptate excepteur aliquip amet dolore ex dolore
              proident. Exercitation laboris pariatur dolore anim dolor
              consequat commodo sint reprehenderit ad laboris officia id. Do
              eiusmod pariatur duis Lorem sunt non.
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  elementStyle: {
    width: "33.33%",
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
