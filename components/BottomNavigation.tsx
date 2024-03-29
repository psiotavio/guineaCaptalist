import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../pages/Home";
import Albums from "../pages/Albums";
import Recents from "../pages/Recents";
import Notifications from "../pages/Notifications";
import { Easing } from "react-native";

const MyDownTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "albums",
      title: "Loja de Prestígio",
      focusedIcon: "cart",
      unfocusedIcon: "cart-outline",
    },
    {
      key: "notifications",
      title: "Configurações",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  // Define background colors for each index
  const backgroundColors = ["#1A3D54", "#6B2737", "#14563a"];
  const backgroundColorsActive = ["#8BAFC7", "#964354", "#1f7f5a"];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    albums: Albums,
    recents: Recents,
    notifications: Notifications,
  });

  return (
    <BottomNavigation
      sceneAnimationType="opacity"
      shifting={true}
      barStyle={{ backgroundColor: backgroundColors[index] }} // Dynamically change the background color
      sceneAnimationEnabled={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="white"
      inactiveColor="lightgrey"
      safeAreaInsets={{ bottom: 10 }}
      activeIndicatorStyle={{
        backgroundColor: backgroundColorsActive[index],
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        opacity: 0.5,
        padding: 72,
        borderRadius: 0,
      }}
    />
  );
};

export default MyDownTabs;
