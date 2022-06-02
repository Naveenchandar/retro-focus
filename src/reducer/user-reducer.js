const initState = {
  userName: ""
}

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      localStorage.setItem("retor-focus", action.payload);
      return { ...state, userName: action.payload };
    default:
      throw new Error("Action type not found.");
  }
};

export { userReducer, initState };
