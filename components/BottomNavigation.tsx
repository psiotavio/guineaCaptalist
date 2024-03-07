import * as React from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import Home from "../pages/Home";
import Albums from "../pages/Albums";
import Recents from "../pages/Recents";
import Notifications from "../pages/Notifications";

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

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    albums: Albums,
    recents: Recents,
    notifications: Notifications,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: "#0F2E40" }}
      sceneAnimationEnabled={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="white"
      inactiveColor="lightgrey"
      safeAreaInsets={{ bottom: 15 }}
      activeIndicatorStyle={{
        backgroundColor: "#94AFBF",
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        opacity: 0.5,
        padding: 72,
        borderRadius: 0
      }}
    />
  );
};

export default MyDownTabs;
