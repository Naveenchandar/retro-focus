import { createContext, useContext, useReducer } from "react";
import { userReducer, initState } from "../reducer/user-reducer";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserInfo = () => useContext(UserContext);

export { useUserInfo, UserProvider };
