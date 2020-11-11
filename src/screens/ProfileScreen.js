import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import Text from "../components/Text";

export default ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const logout = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <Container>
      <ProfileContainer>
        <ProfilePhoto
          source={
            user.profilePhotoUrl === "default"
              ? require("../../assets/defalutUser.png")
              : { uri: user.profilePhotoUrl }
          }
        />
      </ProfileContainer>
      <Text medium bold margin="16px 0 32px">
        {user.username}
      </Text>

      <StatsContainer>
        <StatContainer>
          <Text large light>
            21
          </Text>
          <Text small bold color="#c2c4cd">
            Goal
          </Text>
        </StatContainer>
        <StatContainer>
          <Text large light>
            222
          </Text>
          <Text small bold color="#c2c4cd">
            Assist
          </Text>
        </StatContainer>
        <StatContainer>
          <Text large light>
            214
          </Text>
          <Text small bold color="#c2c4cd">
            Mvp
          </Text>
        </StatContainer>
      </StatsContainer>

      <LogOut onPress={logout}>
        <Text medium bold color="#23a8d9">
          Logout
        </Text>
      </LogOut>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  margin-top: 64px;
  flex: 1;
`;

const ProfileContainer = styled.View`
  shadow-opacity: 0.6;
  shadow-radius: 30px;
  shadow-color: #222222;
`;

const ProfilePhoto = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 32px;
  flex: 1;
`;

const StatContainer = styled.View`
  align-items: center;
  flex: 1;
`;
const LogOut = styled.TouchableOpacity`
  margin-bottom: 32px;
`;
