import React, { useState, KeyboardEvent, FormEvent } from "react";
import { useUserInfo } from "../contexts";
import { CreateContextInterface } from "../contexts/user-context";

export const Focus = (): JSX.Element => {
  const { state: { tasks }, dispatch } = useUserInfo() as CreateContextInterface;

  const [mainFocus, setMainFocus] = useState('');
  const [focusCompleted, setFocusCompleted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      dispatch({
        type: "ADD_UPDATE_TASKS",
        payload: e.target.value,
      });
      setMainFocus(e.target.value);
    }
  };

  const completeFocus = () => {
    setFocusCompleted((prev) => !prev);
    const localData = localStorage.getItem("retro-tasks");
    let data = JSON.parse(localData || "");
    data.completed = !data.completed;
    localStorage.setItem("retro-tasks", JSON.stringify(data));
  }

  return (
    <div>
      {tasks ? (
        <>
          <h4 className="text-xl md:text-3xl">Today's Focus :</h4>
          <div
            className="flex items-center justify-center gap-3 m-3 font-extrabold"
            style={{ textDecoration: focusCompleted ? "line-through" : 'none' }}
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              onClick={completeFocus}
            />
            <div className="text-xl md:text-3xl font-extrabold">{mainFocus}</div>
            <br />
          </div>
          {focusCompleted && <div className="block	text-xl font-medium">Good job!</div>}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl md:text-4xl font-bold">What's your main focus for today?</h3>
          <input
            type="text"
            required
            className="text-center border-none my-6 px-10 text-xl md:text-4xl bg-transparent focus:outline-none border-class font-bold"
            onKeyPress={handleFocus}
          />
        </form>
      )}
    </div>
  );
};
