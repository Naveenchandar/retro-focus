import { Action, InitialStateType } from "./user-reducer.type";

const initState = {
  userName: "",
  time: 0,
  greetings: "",
  tasks: "",
  quotesOfTheDay: "",
}

type AppState = typeof initState;

const userReducer = (state = initState as InitialStateType, action: Action): AppState => {
  switch (action.type) {
    case "SET_USERNAME":
      if (typeof action.payload === 'string') {
        localStorage.setItem("retro-focus", action.payload);
      }
      return { ...state, userName: action.payload };
    case "FETCH_TIME":
      return { ...state, time: action.payload };
    case "GREETINGS":
      return {
        ...state,
        greetings:
          action.payload >= 0 && action.payload < 12
            ? "Good Morning"
            : action.payload >= 12 && action.payload <= 17
              ? "Good Afternoon"
              : "Good Evening",
      };
    case "FETCH_QUOTES":
      return { ...state, quotesOfTheDay: action.payload };
    case "ADD_UPDATE_TASKS":
      localStorage.setItem(
        "retro-tasks",
        JSON.stringify({
          focus: action.payload,
          date: new Date().toLocaleDateString(),
          completed: false,
        })
      );
      return { ...state, tasks: action.payload };
    default:
      throw new Error("Action type not found.");
  }
};

export { userReducer, initState };
