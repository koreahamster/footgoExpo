import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();
      
      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
    
        setUser((state) => ({
          ...setUser,
          isLoggedIn: false,
        }));
      }
    }, 1500);
  });
  return (
    <Container>
      <Text titlecolor="#FFFFFF">베트남 축구 매칭 전용 앱</Text>
      <LottieView
        source={require("../../assets/lodingAnimation.json")}
        autoPlay
        loop
        speed={5}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: skyblue;
`;
