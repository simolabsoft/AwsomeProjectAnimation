// import React, { Component } from "react";
// import { Text, View, StyleSheet, Animated, Alert } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";

// export default class Cuberto extends Component {
//   constructor(props) {
//     super(props);
//   }
//   translateX = new Animated.Value(500);
//   // translateY = new Animated.Value(0);
//   gestureState = new Animated.Value(-1);
//   offsetX = new Animated.Value(0);
//   offsetY = new Animated.Value(0);
//   _handleStateChange = ({ nativeEvent }) => {
//     if (nativeEvent.state === State.ACTIVE) {
//       // this.translateX = Animated.add(this.translateX, this.offsetX);
//       // //         this.pan.setValue({ x: 0, y: 0 });
//       this.translateX.setOffset(this.offsetX._value);

//       console.log("active : ", this.translateX);
//     } else {
//       // this.offsetX.setValue(Animated.add(this.translateX, this.offsetX));
//       console.log("not active  : ", this.translateX);
//       this.offsetX.setValue(this.translateX._value + this.offsetX._value);
//     }
//   };
//   handleGesture = Animated.event([
//     {
//       nativeEvent: {
//         // translationX: this.translateX,
//         translationY: this.translateX,
//         state: this.gestureState
//       }
//     }
//   ]);
//   render() {
//     console.log(this.translateX);
//     let topBoxTransformation;
//     topBoxTransformation = {
//       height: this.translateX
//     };
//     return (
//       <View style={styles.container}>
//         <PanGestureHandler
//           onGestureEvent={this.handleGesture}
//           onHandlerStateChange={this._handleStateChange}
//           maxPointers={1}
//         >
//           <Animated.View
//             style={[styles.topBox, topBoxTransformation]}
//           ></Animated.View>
//         </PanGestureHandler>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white"
//   },
//   topBox: {
//     width: "100%",
//     height: 150,
//     backgroundColor: "#c00000"
//   }
// });
// import React, { Component } from "react";
// import { StyleSheet, View, Text, Animated, PanResponder } from "react-native";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this._value = { x: 0, y: 0 };
//     this.pan = new Animated.ValueXY({ x: 0, y: 0 });
//   }

//   componentWillMount() {
//     this.pan.addListener(value => {
//       this._value = value;
//     });

//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (evt, gestureState) => true,
//       onMoveShouldSetPanResponder: (evt, gestureState) =>
//         gestureState.dx != 0 && gestureState.dy != 0,

//       onPanResponderGrant: (e, gestureState) => {
//         this.pan.setOffset({ x: this._value.x, y: this._value.y });
//         this.pan.setValue({ x: 0, y: 0 });
//       },

//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dx: this.pan.x,
//           dy: this.pan.y
//         }
//       ]),
//       onPanResponderRelease: (e, gesture) => {
//         this.pan.flattenOffset();

//         const { x, y } = this._value;
//         Animated.timing(this.pan, {
//           toValue: { x, y: y + 50 },
//           duration: 600
//         }).start(() => {
//           // animation finished
//         });
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.pan.removeAllListener();
//   }

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={styles.draggableContainer}>
//           <Animated.View
//             {...this.panResponder.panHandlers}
//             style={[this.pan.getLayout(), styles.square]}
//           >
//             <Text>Drag me!</Text>
//           </Animated.View>
//         </View>
//       </View>
//     );
//   }
// }

// let styles = StyleSheet.create({
//   draggableContainer: {
//     position: "absolute",
//     top: 165,
//     left: 76.1
//   },
//   square: {
//     backgroundColor: "red",
//     width: 72,
//     height: 72,
//     borderWidth: 1
//   }
// });

// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Animated,
//   Alert,
//   Dimensions
// } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// const { width, height } = Dimensions.get("window");
// export default class Cuberto extends Component {
//   constructor(props) {
//     super(props);
//   }
//   translateX = new Animated.Value(0);
//   translateY = new Animated.Value(0);
//   gestureState = new Animated.Value(-1);
//   offsetX = new Animated.Value(0);
//   offsetY = new Animated.Value(0);
//   transX = new Animated.Value(0);
//   transY = new Animated.Value(0);
//   _handleStateChange = ({ nativeEvent }) => {
//     if ((this.gestureState, State.ACTIVE)) {
//       // this.translateX = Animated.add(this.translateX, this.offsetX);
//       // //         this.pan.setValue({ x: 0, y: 0 });
//       // this.translateX.setOffset(this.offsetX._value);
//       // this.translateY.setOffset(this.offsetY._value);
//       this.transX = Animated.add(this.translateX, this.offsetX);
//       this.transY = Animated.add(this.translateY, this.offsetY);

//       console.log("active : ", this.translateX);
//     } else {
//       // this.offsetX.setValue(Animated.add(this.translateX, this.offsetX));
//       console.log("not active  : ", this.translateX);

//       this.offsetX = Animated.add(this.translateX, this.offsetX);
//       this.offsetY = Animated.add(this.translateY, this.offsetY);
//     }
//   };
//   handleGesture = Animated.event([
//     {
//       nativeEvent: {
//         translationX: this.translateX,
//         translationY: this.translateY,
//         state: this.gestureState
//       }
//     }
//   ]);
//   render() {
//     console.log(this.translateX);
//     let topBoxTransformation;
//     topBoxTransformation = {
//       transform: [{ translateX: this.transX }, { translateY: this.transY }]
//     };
//     return (
//       <View style={styles.container}>
//         <PanGestureHandler
//           onGestureEvent={this.handleGesture}
//           onHandlerStateChange={this._handleStateChange}
//           maxPointers={1}
//         >
//           <Animated.View
//             style={[styles.topBox, topBoxTransformation]}
//           ></Animated.View>
//         </PanGestureHandler>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white"
//   },
//   topBox: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#c00000"
//   }
// });
