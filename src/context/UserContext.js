import React, { useState, useContext, createContext } from "react";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    uid: "",
    isLoggedIn: null,
    profilePhoto: "default",
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
}




export {UserProvider, UserContext};