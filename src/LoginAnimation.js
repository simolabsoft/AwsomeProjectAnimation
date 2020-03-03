import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  state = {
    isLogin: true
  };

  startAnimation = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));

    Animated.timing(this.animation, {
      toValue: this.animation._value === 0 ? 1 : 0,
      duration: 200
    }).start();
  };
  render() {
    const SignUpPositioning = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["85%", "0%"],
      extrapolate: "clamp"
    });
    const LoginPositioning = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["15%", "85%"],
      extrapolate: "clamp"
    });
    const SignUpPositioningStyle = {
      left: SignUpPositioning
    };
    const LoginPositioningStyle = {
      right: LoginPositioning
    };
    const LogoAnimatin = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["48%", "33%"],
      extrapolate: "clamp"
    });
    const logoAnimatedStyle = {
      right: LogoAnimatin
    };
    const BottomContainerAnimation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "15%"],
      extrapolate: "clamp"
    });
    const BottomContainerAnimationStyle = {
      left: BottomContainerAnimation
    };
    const singUpTextAnimation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["50%", "65%"],
      extrapolate: "clamp"
    });
    const singUpTextAnimationStyleY = {
      top: singUpTextAnimation
      // right: '1%',
      // transform: [{rotate: '-90deg'}],
    };
    const singUpTextAnimationX = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["1%", "28%"],
      extrapolate: "clamp"
    });
    const singUpTextAnimationStyleX = {
      right: singUpTextAnimationX
    };
    const singUpTextAnimationrotate = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["-90deg", "0deg"],
      extrapolate: "clamp"
    });
    const singUpTextAnimationStyleRotate = {
      transform: [{ rotate: singUpTextAnimationrotate }]
    };
    const singUpTextAnimationSize = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 30],
      extrapolate: "clamp"
    });
    const singUpTextAnimationStyleSize = {
      fontSize: singUpTextAnimationSize
    };
    /////////// login text

    const loginTextAnimation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["65%", "50%"],
      extrapolate: "clamp"
    });
    const loginTextAnimationStyleY = {
      top: loginTextAnimation
      // right: '1%',
      // transform: [{rotate: '-90deg'}],
    };
    const loginTextAnimationX = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["33%", "1%"],
      extrapolate: "clamp"
    });
    const loginTextAnimationStyleX = {
      left: loginTextAnimationX
    };
    const loginTextAnimationrotate = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-90deg"],
      extrapolate: "clamp"
    });
    const loginTextAnimationStyleRotate = {
      transform: [{ rotate: loginTextAnimationrotate }]
    };
    const loginTextAnimationSize = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 15],
      extrapolate: "clamp"
    });
    const loginTextAnimationStyleSize = {
      fontSize: loginTextAnimationSize
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.loginContainer, LoginPositioningStyle]}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder="Email"
            onChangeText={text => console.log(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.TextInputStyle}
            placeholder="Password"
            onChangeText={text => console.log(text)}
            placeholderTextColor={"white"}
          />
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: "white", marginBottom: 30 }}>
              Fogot password ?
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.signUpContainer, SignUpPositioningStyle]}>
          <TouchableOpacity
            style={[
              styles.signUpBntStyle,
              { backgroundColor: this.state.isLogin ? "#010A52" : "#29C67B" }
            ]}
            onPress={this.startAnimation}
          ></TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Email"
              onChangeText={text => console.log(text)}
              placeholderTextColor={"white"}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Password"
              onChangeText={text => console.log(text)}
              placeholderTextColor={"white"}
            />
            <TextInput
              style={[styles.TextInputStyle, { marginBottom: 60 }]}
              placeholder="Confirm Password"
              onChangeText={text => console.log(text)}
              placeholderTextColor={"white"}
            />
          </View>
        </Animated.View>
        <Animated.View style={[styles.logo, logoAnimatedStyle]}>
          <Icon
            name="facebook"
            size={60}
            color={this.state.isLogin ? "#010A52" : "#29C67B"}
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              width: "85%",
              height: "20%",
              position: "absolute",
              bottom: "1%",
              justifyContent: "space-around",
              padding: 30,

              alignItems: "center"
            },
            BottomContainerAnimationStyle
          ]}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="facebook"
              size={40}
              color={this.state.isLogin ? "#010A52" : "#29C67B"}
            />
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="linkedin"
              size={40}
              color={this.state.isLogin ? "#010A52" : "#29C67B"}
            />
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="twitter"
              size={40}
              color={this.state.isLogin ? "#010A52" : "#29C67B"}
            />
          </View>
        </Animated.View>
        <Animated.Text
          style={[
            styles.mainTextStyleSignUp,
            singUpTextAnimationStyleY,
            singUpTextAnimationStyleX,
            singUpTextAnimationStyleRotate,
            singUpTextAnimationStyleSize
          ]}
        >
          Sign up
        </Animated.Text>
        <Animated.Text
          style={[
            styles.mainTextStyleLogin,
            loginTextAnimationStyleY,
            loginTextAnimationStyleX,
            loginTextAnimationStyleRotate,
            loginTextAnimationStyleSize
          ]}
        >
          Login
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    position: "relative"
  },
  loginContainer: {
    backgroundColor: "#29C67B",

    position: "absolute",
    height: "100%",
    width: "85%",
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
    // right: "15%"
  },
  signUpContainer: {
    backgroundColor: "#010A52",
    height: "100%",
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: "row"
  },
  signUpBntStyle: {
    width: "15%"
  },
  logo: {
    width: "15%",
    height: "15%",
    position: "absolute",
    top: "2%"
  },
  iconBottom: {
    width: "20%",
    height: "20%"
  },
  mainTextStyleSignUp: {
    color: "white",
    position: "absolute"
    // top: '50%',
    // right: '1%',
    // transform: [{rotate: '-90deg'}],
  },
  mainTextStyleLogin: {
    color: "white",
    position: "absolute",
    top: "65%"
  },
  TextInputStyle: {
    height: 50,
    width: "70%",
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "blue",
    fontSize: 15,
    marginBottom: 15
  }
});
