// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   PanResponder,
//   Animated,
//   Dimensions
// } from "react-native";

// const { width, height } = Dimensions.get("screen");
// export default class panResponderViewHeight extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       toBottom: true,
//       pan: new Animated.ValueXY(),
//       scale: new Animated.Value(1),
//       pan1: new Animated.Value(-height + height / 3)
//     };
//   }
//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,

//       onPanResponderGrant: (e, gestureState) => {
//         // this.state.pan.setOffset({
//         //   x: this.state.pan.x._value,
//         //   y: this.state.pan.y._value
//         // });
//         // this.state.pan.setValue({ x: 0, y: 0 });
//         // Animated.spring(this.state.scale, {
//         //   toValue: 1.1,
//         //   friction: 3
//         // }).start();

//         this.state.pan1.setOffset(this.state.pan1._value);
//         this.state.pan1.setValue(0);
//       },

//       //   onPanResponderMove: Animated.event([null, { dy: this.state.pan1 }]),
//       onPanResponderMove: (event, gestureState) => {
//         // this.state.pan1.setValue(gestureState.dy);
//         if (
//           (this.state.toBottom && gestureState.dy < 0) ||
//           (!this.state.toBottom && gestureState.dy > 0)
//         )
//           this.state.pan1.setValue(gestureState.dy);
//       },

//       onPanResponderRelease: (evt, gestureState) => {
//         this.state.pan.flattenOffset();

//         if (gestureState.dy < height / 2) {
//           this.setState({ toBottom: false });
//           Animated.spring(this.state.pan1, {
//             toValue: 30,
//             friction: 10
//           }).start();
//         } else {
//           this.setState({ toBottom: true });
//           Animated.spring(this.state.pan1, {
//             toValue: height - height / 3,
//             friction: 10
//           }).start();
//         }
//       }
//     });
//   }
//   render() {
//     let { pan1 } = this.state;

//     // let [translateX, translateY] = [pan.x, pan.y];

//     let circleStyle = {
//       transform: [{ translateY: pan1 }]
//     };

//     return (
//       <View style={styles.container}>
//         <Animated.View
//           style={[styles.circle, circleStyle]}
//           {...this._panResponder.panHandlers}
//         ></Animated.View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center"
//   },
//   circle: {
//     width: "100%",
//     height: height,

//     backgroundColor: "red"
//   }
// });

// import React, { Component } from "react";
// import {
//   StatusBar,
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   PanResponder,
//   TouchableOpacity,
//   Dimensions
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
//   const draggedDown = dy > 30;
//   const draggedUp = dy < -30;
//   const draggedLeft = dx < -30;
//   const draggedRight = dx > 30;
//   const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
//   const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
//   let dragDirection = "";

//   if (draggedDown || draggedUp) {
//     if (draggedDown) dragDirection += "dragged down ";
//     if (draggedUp) dragDirection += "dragged up ";
//   }

//   if (draggedLeft || draggedRight) {
//     if (draggedLeft) dragDirection += "dragged left ";
//     if (draggedRight) dragDirection += "dragged right ";
//   }

//   if (isRed) return `red ${dragDirection}`;
//   if (isBlue) return `blue ${dragDirection}`;
//   if (dragDirection) return dragDirection;
// };

// export default class App extends Component {
//   state = {
//     zone: "Still Touchable"
//   };
//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) =>
//         !!getDirectionAndColor(gestureState),
//       onPanResponderMove: (evt, gestureState) => {
//         const drag = getDirectionAndColor(gestureState);
//         this.setState({
//           zone: drag
//         });
//       },
//       onPanResponderTerminationRequest: (evt, gestureState) => true
//     });
//   }

//   onPress = () => {
//     this.setState({
//       zone: "I got touched with a parent pan responder"
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container} {...this._panResponder.panHandlers}>
//         <StatusBar hidden />
//         <View style={styles.zone1} />
//         <View style={styles.center}>
//           <TouchableOpacity onPress={this.onPress}>
//             <Text>{this.state.zone}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.zone2} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   zone1: {
//     top: 40,
//     left: 0,
//     right: 0,
//     height: 50,
//     position: "absolute",
//     backgroundColor: "red"
//   },
//   zone2: {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 50,
//     position: "absolute",
//     backgroundColor: "blue"
//   }
// });

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("screen");
export default class panResponder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (gestureState.y0 < 0 || gestureState.y0 > height) return false;
        else return true;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      //   onPanResponderMove: Animated.event([
      //     null,
      //     { dx: this.state.pan.x, dy: this.state.pan.y }
      //   ]),
      onPanResponderMove: (e, gestureState) => {
        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }])(
          e,
          gestureState
        );
      },

      onPanResponderRelease: (evt, gestureState) => {
        console.log("gestureState : ", gestureState);
        this.state.pan.flattenOffset();
        // Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
        // if (Math.abs(gestureState.dy) < height / 4)
        //   Animated.spring(this.state.pan, { toValue: 0, friction: 3 }).start();
        // else if (
        //   Math.abs(gestureState.dy) > height / 4 &&
        //   Math.abs(gestureState.dy) < height - height / 4
        // )
        //   Animated.spring(this.state.pan, {
        //     toValue: { x: 0, y: height - 50 },
        //     friction: 3
        //   }).start();
        // else
        //   Animated.spring(this.state.pan, {
        //     toValue: { x: 0, y: height - 50 },
        //     friction: 3
        //   }).start();
        if (gestureState.dy > 0 && gestureState.dy < height / 4)
          Animated.spring(this.state.pan, { toValue: 0, friction: 3 }).start();
        else if (gestureState.dy > 0 && gestureState.dy > height / 4)
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: height - 100 },
            friction: 3
          }).start();
        else if (gestureState.dy < 0 && Math.abs(gestureState.dy) > height / 4)
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 3
          }).start();
        else if (gestureState.dy < 0 && Math.abs(gestureState.dy) < height / 4)
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: height - 100 },
            friction: 3
          }).start();
      }
    });
  }
  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    let circleStyle = {
      transform: [{ translateX }, { translateY }]
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, circleStyle]}
          {...this._panResponder.panHandlers}
        ></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    // justifyContent: "center",
    // alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    backgroundColor: "red"
  }
});
