import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

export class TabBarAnimation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#c0392b",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    position: "absolute",
    top: -60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
    borderWidth: 3,
    borderColor: "white"
  },
  secondaryButton: {
    backgroundColor: "#c0392b",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  }
});
MainScreen = () => {
  return <View style={styles.container}></View>;
};

export class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonSize = new Animated.Value(1);
    this.mode = new Animated.Value(0);
  }
  handlePress = () => {
    console.log("hello");
    Animated.parallel([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 200
        // useNativeDriver: true
      }),
      //   Animated.timing(this.buttonSize, {
      //     toValue: 1,
      //     duration: 200
      //   }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
        duration: 200
      })
    ]).start(() =>
      Animated.timing(this.buttonSize, {
        toValue: 1,
        duration: 200
      }).start()
    );
  };
  render() {
    const buttonSizeStyle = {
      transform: [
        {
          scale: this.buttonSize
        }
      ]
    };
    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });
    const ambulanceX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, -100]
    });
    const ambulanceY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    });
    const MiddleX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, -20]
    });
    const MiddleY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -140]
    });
    const RightX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 55]
    });
    const RightY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    });
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            left: ambulanceX,
            top: ambulanceY
          }}
        >
          <View style={[styles.secondaryButton]}>
            <Icon name="ambulance" size={20} color="#FFF" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            left: MiddleX,
            top: MiddleY
          }}
        >
          <View style={[styles.secondaryButton]}>
            <Icon name="bitcoin" size={20} color="#FFF" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            left: RightX,
            top: RightY
          }}
        >
          <View style={[styles.secondaryButton]}>
            <Icon name="code" size={20} color="#FFF" />
          </View>
        </Animated.View>

        <Animated.View style={[styles.button, buttonSizeStyle]}>
          <TouchableOpacity
            onPress={this.handlePress}
            underlayColor="#c0392b"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Icon name="plus" size={30} color="#FFF" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    leftScreen: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="medkit" size={30} color="#CDCCCE" />
      }
    },
    middle1: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="stethoscope" size={30} color="#CDCCCE" />
      }
    },
    middle: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: <AddButton></AddButton>
      }
    },

    middle2: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="heart" size={30} color="#CDCCCE" />
      }
    },
    RightScreen: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="fire" size={30} color="#CDCCCE" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default createAppContainer(TabNavigator);
