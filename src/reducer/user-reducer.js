const initState = {
  userName: "",
  time: "",
  greetings: "",
  tasks: "",
  quotesOfTheDay: "",
}

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      localStorage.setItem("retro-focus", action.payload);
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
