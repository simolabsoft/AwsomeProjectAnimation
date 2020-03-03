import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");
class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      deleteOpacity: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this._val = { x: 0, y: 0 };
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
        // if (this.isDropArea(gestureState)) {
        //   Animated.timing(this.state.opacity, {
        //     toValue: 0,
        //     duration: 1000
        //   }).start(() =>
        //     this.setState({
        //       showDraggable: false
        //     })
        //   );
        // }
        if (gestureState.dx > 0) {
          this.state.deleteOpacity.setValue(gestureState.dx / width);
        }

        Animated.event([null, { dx: this.state.pan.x, dy: null }])(
          e,
          gestureState
        );
      },
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
              showDraggable: false
            })
          );
        } else {
          Animated.parallel([
            Animated.spring(this.state.pan, {
              toValue: 0,
              // duration: 1000
              friction: 6
            }),
            Animated.spring(this.state.deleteOpacity, {
              toValue: 0,
              // duration: 1000
              friction: 6
            })
          ]).start();
        }
      }
    });
  }

  isDropArea(gesture) {
    return gesture.moveX > width - 50;
  }

  render() {
    return <View>{this.renderDraggable()}</View>;
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    if (this.state.showDraggable) {
      return (
        <View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
          >
            <Animated.View
              style={[styles.deleteBox, { opacity: this.state.deleteOpacity }]}
            >
              <Text>Delete</Text>
            </Animated.View>
          </Animated.View>
        </View>
      );
    }
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
        </View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = width - 20;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height: 200
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS,
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  row: { flex: 1, alignItems: "center" },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  deleteBox: {
    width: "20%",
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
