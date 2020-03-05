import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Easing,
  Image
} from "react-native";
const { width, height } = Dimensions.get("window");

const BUTTON_WIDTH = width - 100;
const BUTTON_HEIGHT = 60;
const BORDER_RADIUS = 10;
export default class uploadAnimation extends Component {
  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.scalContainer = new Animated.Value(1);
    this.upladBtnHeighAnimation = new Animated.Value(BUTTON_HEIGHT - 10);
    this.upladBtnWidthAnimation = new Animated.Value(BUTTON_WIDTH / 3);
    this.uploadingTextAnimation = new Animated.Value(-30);
    this.completedText = new Animated.Value(-30);
    this.progressBarAnimation = new Animated.Value(0);
    this.progressBarHeightAnimation = new Animated.Value(8);
  }
  startAnimtion = () => {
    Animated.sequence([
      Animated.spring(this.scalContainer, {
        toValue: 0.95,
        friction: 4
      }),
      Animated.timing(this.upladBtnHeighAnimation, {
        toValue: BUTTON_HEIGHT,
        duration: 500
      }),
      Animated.timing(this.upladBtnWidthAnimation, {
        toValue: BUTTON_WIDTH,
        duration: 500
      }),
      Animated.timing(this.uploadingTextAnimation, {
        toValue: BUTTON_HEIGHT / 4,
        duration: 500
      }),
      Animated.timing(this.progressBarAnimation, {
        toValue: BUTTON_WIDTH,
        duration: 1000,
        easing: Easing.inout
      }),
      Animated.timing(this.progressBarHeightAnimation, {
        toValue: BUTTON_HEIGHT,
        duration: 1000,
        easing: Easing.exp
      }),
      Animated.timing(this.completedText, {
        toValue: BUTTON_HEIGHT / 4,
        duration: 500
      })
    ]).start(() => {
      // Animated.spring(this.scalContainer, {
      //   toValue: 1,
      //   friction: 4
      // });
      // this.Animation.setValue(0);
      // // this.scalContainer.setValue(1),
      // this.upladBtnHeighAnimation.setValue(BUTTON_HEIGHT - 10);
      // this.upladBtnWidthAnimation.setValue(BUTTON_WIDTH / 3);
      // this.uploadingTextAnimation.setValue(-30);
      // this.completedText.setValue(-30);
      // this.progressBarAnimation.setValue(0);
      // // this.progressBarHeightAnimation.setValue(8);

      // Animated.spring(this.scalContainer, {
      //   toValue: 1,
      //   friction: 4
      // }).start();
      setTimeout(() => {
        this.Animation.setValue(0);
        // this.scalContainer.setValue(1),
        this.upladBtnHeighAnimation.setValue(BUTTON_HEIGHT - 10);
        this.upladBtnWidthAnimation.setValue(BUTTON_WIDTH / 3);
        this.uploadingTextAnimation.setValue(-30);
        this.completedText.setValue(-30);
        this.progressBarAnimation.setValue(0);
        // this.progressBarHeightAnimation.setValue(8);

        Animated.spring(this.scalContainer, {
          toValue: 1,
          friction: 4
        }).start();
      }, 1000);
    });
  };
  render() {
    const ScaeConitainerStyle = {
      transform: [
        {
          scale: this.scalContainer
        }
      ]
    };

    const marginUploadBtn = this.upladBtnHeighAnimation.interpolate({
      inputRange: [BUTTON_HEIGHT - 10, BUTTON_HEIGHT],
      outputRange: [5, 0]
    });
    const upladBtnStyle = {
      height: this.upladBtnHeighAnimation,
      margin: marginUploadBtn
    };
    const opacityAndPositionText = this.upladBtnWidthAnimation.interpolate({
      inputRange: [BUTTON_WIDTH / 3, BUTTON_WIDTH],
      outputRange: [1, 0]
    });
    const uploadWidth = {
      width: this.upladBtnWidthAnimation
    };
    const textAnimationStyle = {
      opacity: opacityAndPositionText
    };
    const uploadOpacity = this.uploadingTextAnimation.interpolate({
      inputRange: [-30, BUTTON_HEIGHT / 4],
      outputRange: [0, 1]
    });
    const uploadingStyle = {
      bottom: this.uploadingTextAnimation,
      opacity: uploadOpacity
    };
    const progressBarAnimationStyle = {
      width: this.progressBarAnimation,
      height: this.progressBarHeightAnimation
    };
    const completedTextStyle = {
      bottom: this.completedText,
      opacity: uploadOpacity
    };
    const compltedIcon = this.completedText.interpolate({
      inputRange: [-30, BUTTON_HEIGHT / 4],
      outputRange: [0, 1]
    });
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.buttonContainer, ScaeConitainerStyle]}>
          <Animated.View
            style={[styles.titleContainer, { opacity: marginUploadBtn }]}
          >
            <Image
              source={require("../assets/attach.png")}
              style={[styles.iconStyle]}
            ></Image>
            <Text style={[styles.documentTitle]}>Document.pdf</Text>
          </Animated.View>

          <Animated.View style={[styles.uploadBtn, upladBtnStyle, uploadWidth]}>
            <TouchableOpacity
              onPress={this.startAnimtion}
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Animated.Text style={[styles.textUpload, textAnimationStyle]}>
                Upload
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text style={[styles.uploadingText, uploadingStyle]}>
            Uploading ...
          </Animated.Text>
          <Animated.View
            style={[styles.progressBar, progressBarAnimationStyle]}
          ></Animated.View>
          <Animated.Image
            source={require("../assets/correct.png")}
            style={[styles.iconStyleCorrect, { opacity: compltedIcon }]}
          ></Animated.Image>
          <Animated.Text style={[styles.uploadingText, completedTextStyle]}>
            Completed
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE3BA",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden"
  },
  uploadBtn: {
    // width: BUTTON_WIDTH / 3,
    // height: BUTTON_HEIGHT - 10,
    margin: 5,
    backgroundColor: "#F69264",
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0
  },
  textUpload: {
    fontSize: 16,
    color: "white",
    position: "absolute"
  },
  documentTitle: {
    fontSize: 16,
    color: "black"
  },
  titleContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute"
  },
  iconStyle: {
    width: 24,
    height: 24
  },
  uploadingText: {
    fontSize: 18,
    color: "white",
    position: "absolute",
    // backgroundColor: "red",

    right: 0,
    left: 0,
    textAlign: "center"
  },
  progressBar: {
    backgroundColor: "#2C314C",

    position: "absolute",
    opacity: 1,
    bottom: 0
  },
  iconStyleCorrect: {
    marginLeft: 50,
    tintColor: "white"
  }
});
