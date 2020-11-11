import React, { useState, useContext } from "react";
import styled from "styled-components";
import { StatusBar, Platform } from "react-native";
import Text from "../components/Text";
import { AntDesign } from "@expo/vector-icons";
import * as Permisstion from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassward] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);
  const [errorVerification, setErrorVerification] = useState();

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permisstion.askAsync(Permisstion.CAMERA_ROLL); //카메라 권한을 가져온다?
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });
      if (!result.cancelled) {
        setProfilePhoto(result.uri); // 확인 필요
      }
    } catch (error) {
      
      console.log("Error @pickImage", error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();
    if (status !== "granted") {
      alert("We need Permission to access your camera roll.");
      return;
    }
    pickImage();
  };
  const signUp = async () => {
    setLoading(true);
    const user = { username, email, password, profilePhoto };
    const createUser = await firebase.createUser(user);
    if(createUser){
      setUser({ ...createUser, isLoggedIn: true });
    }else{
      setUser({ ...createUser, isLoggedIn: false });
      setErrorVerification("Please Cheak Information");
    }
    setLoading(false);
  };
  return (
    <Container>
      <Main>
        <Text title semi center>
          Sign up to get Started.
        </Text>
      </Main>
      <ProfilePhotoContainer onPress={addProfilePhoto}>
        {profilePhoto ? (
          <ProfilePhoto source={{ uri: profilePhoto }} />
        ) : (
          <DefaultProfilePhoto>
            <AntDesign name="plus" size={24} color="#ffffff" />
          </DefaultProfilePhoto>
        )}
      </ProfilePhotoContainer>

      <Auth>
        <AuthContainer>
          <AuthTitle>Username</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(username) => setUsername(username.trim())} //trim 확인 필요
            vlaue={username}
          />
          
        </AuthContainer>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())} //trim 확인 필요
            vlaue={email}
          />
          
        </AuthContainer>
        <AuthContainer>
          <AuthTitle>Password</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassward(password.trim())}
            value={password}
          />
          <ErrorControl>
            <Text center color="red">{errorVerification}</Text>
          </ErrorControl> 
        </AuthContainer>
      </Auth>
      
      <SignUpContainer onPress={signUp} disable={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            Sign Up
          </Text>
        )}
      </SignUpContainer>
      <SignIn onPress={() => navigation.navigate("SignIn")}>
        <Text small center>
          Aleady have an accout?{" "}
          <Text bold color="#8022d9">
            Sign In
          </Text>{" "}
        </Text>
      </SignIn>
      <HeaderGraphic>
        <LeftCircle />
        <RightCircle />
      </HeaderGraphic>
      <StatusBar barStyle="light-content" />
    </Container>
  );
};
const Main = styled.View`
  margin-top: 160px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-self: center;
  margin-top: 16px;
  overflow: hidden;
`;
const DefaultProfilePhoto = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProfilePhoto = styled.Image`
  flex: 1;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
`;
const AuthContainer = styled.View`
  margin-bottom: 32px;
`;
const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;
const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const Container = styled.View`
  flex: 1;
`;
const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #8022d9;
  border-radius: 6px;
`;
const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``; //해당 기술 확인 필요

const SignIn = styled.TouchableOpacity`
  margin-top: 16px;
`;

const RightCircle = styled.View`
  background-color: #8022d9;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  top: -200px;
  right: -100px;
`;

const LeftCircle = styled.View`
  background-color: #23a6d5;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const ErrorControl = styled.View`
 position:absolute;
 top:75px;
`;
