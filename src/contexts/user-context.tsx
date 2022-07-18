import {
  createContext, useContext, useReducer, Dispatch, PropsWithChildren, Reducer
} from "react";
import { userReducer, initState } from "../reducer/user-reducer";
import { Action, InitialStateType } from "../reducer/user-reducer.type";

export interface CreateContextInterface {
  state: InitialStateType,
  dispatch: Dispatch<any>
}

const UserContext = createContext<CreateContextInterface>({
  state: initState,
  dispatch: () => null
});

const UserProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, Action>>(userReducer, initState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserInfo = () => useContext(UserContext);

export { useUserInfo, UserProvider };
