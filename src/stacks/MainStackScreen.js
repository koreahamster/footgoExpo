import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import RankScreen from "../screens/RankScreen";
import TeamScreen from "../screens/TeamScreen";
import PreferenceScreen from "../screens/PreferenceScreen";
import MatchScreen from "../screens/MatchScreen";
export default MainStackScreen = () => {
  const MainStack = createBottomTabNavigator();

  const tabBarOtions = {
    showLabel: false,
    style: {
      backgroundColor: "#222222",
      paddingBottom: 12,
    },
  };
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName;

      switch (route.name) {
        case "Home":
          iconName = "home";
          break;
        case "Team":
          iconName = "user";
          break;
        case "Match":
          iconName = "calendar";
          break;
        case "Rank":
          iconName = "trophy";
          break;
        case "Preference":
          iconName = "cog";
          break;
      }
      

      return (
        <FontAwesome
          name={iconName}
          size={24}
          color={focused ? "#ffffff" : "#666666"}
        />
      );
    },
  });
  return (
    <MainStack.Navigator
      tabBarOptions={tabBarOtions}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Team" component={TeamScreen} />
      <MainStack.Screen name="Match" component={MatchScreen} />
      <MainStack.Screen name="Rank" component={RankScreen} />
      <MainStack.Screen name="Preference" component={PreferenceScreen} />
    </MainStack.Navigator>
  );
};
