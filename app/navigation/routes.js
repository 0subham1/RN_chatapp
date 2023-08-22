import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../pages/Header";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
const stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Header />
        <stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="profile"
        >
          <stack.Screen name="profile" component={Profile} />
          <stack.Screen name="home" component={Home} />
          <stack.Screen name="chat" component={Chat} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default Routes;
