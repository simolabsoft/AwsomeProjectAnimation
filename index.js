/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import SplashScreen from "react-native-splash-screen";
import Opacity from "./src/Opacity";
import TranslatePosition from "./src/TranslatePosition";
import Scale from "./src/scale";
import WidthHeightValues from "./src/WidthHeightValues";
import AbsolutePosition from "./src/AbsolutePosition";
import BackgroundColor from "./src/BackgroundColor";
import ScrollEvent from "./src/ScrollEvent";
import TabBarAnimation from "./src/TabBarAnimation";
import CornerBoxAnimation from "./src/CornersBoxAnimation";
import AddRowAnimation from "./src/AddRowAnimation";
import ProgressBar from "./src/ProgressBar";
import ProgressCircle from "./src/ProgrecCircle";
import SquarSpread from "./src/SquareSpread";
import CallAnimation from "./src/callAnimation";
import ClockAnimation from "./src/ClockAnimation";
import OverlayTestMe from "./src/OverLaytestme";
import LoginAnimation from "./src/LoginAnimation";
import SharedElement from "./src/SharedElement";
import Cuberto from "./src/Cuberto";
import panResponder from "./src/panResponder";
import panResponderViewHeight from "./src/panResponserViewHeight";
import AnimatedSlider from "./src/AnimtesSlider";
import draggableItems from "./src/draggableItems";
import swypeToDelete from "./src/swipeToDelete";
import uploadAnimation from "./src/uploadAnimation";
import movieSwiper from "./src/MovieSwiper";
import musicPlayer from "./src/musicPlayer";
import Animation_3D from "./src/Animation_3d";
import BurstAnimation from "./src/BurstAnimation";
import CircleAnimation from "./src/CircleAnimation";
SplashScreen.hide();
AppRegistry.registerComponent(appName, () => CircleAnimation);
