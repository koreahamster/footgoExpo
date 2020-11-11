import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackScreens from "./src/stacks/AppStackScreen";
import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";
export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
}
