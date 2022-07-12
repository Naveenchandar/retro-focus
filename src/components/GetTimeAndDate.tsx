import React, { useEffect } from "react";
import { useUserInfo } from "../contexts";
import { CreateContextInterface } from "../contexts/user-context";

export const GetTimeAndDate = (): JSX.Element => {
  const { state: { time, greetings, userName }, dispatch} = useUserInfo() as CreateContextInterface;

  useEffect(() => {
    getTime();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const getTime = () => {
    const today = new Date();
    const getHour = today.getHours();
    const getMins=today.getMinutes();
    const curTime= (getHour < 10 ? "0" : '') + getHour + ":" + (getMins < 10 ? "0" : '') + getMins;
    setTimeout(getTime, 1000);
    dispatch({
      type: "FETCH_TIME",
      payload: curTime,
    });
    dispatch({
      type: "GREETINGS",
      payload: getHour,
    });
  };

  return (
    <div className="font-extrabold">
      <h1 className="text-5xl sm:text-8xl md:text-9xl">{time}</h1>
      <h1 className="m-2 md:m-5 md:text-6xl py-2 px-4">
        {greetings}, {userName}.
      </h1>
    </div>
  );
};