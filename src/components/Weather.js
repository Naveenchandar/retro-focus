import { useEffect, useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [temp, setTemp] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [locationErr, setLocationErr] = useState('');


  useEffect(() => {
    (() => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async function (success) {
              try {
                const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${success.coords.latitude}&lon=${success.coords.longitude}&units=metric&appid=${"687323c4b6d49653323ab7e2574d10f4"}`;
                const { status, data } = await axios.get(URL);
                if (status === 200) {
                  const { name, main, weather } = data;
                  setLocation(name);
                  setTemp(Math.round(main.temp));
                  setImage(weather[0]?.icon);
                } else {
                  throw new Error('Unable to retrieve a location');
                }
              } catch (error) {
                setLocationErr(error.message);
              }
            },
            function (error) {
              setLocationErr(error.message);
            }
          )
        } else {
          setLocationErr('Sorry, your browser does not support HTML5 geolocation');
        }
      } catch (error) {
        setLocationErr(error.message);
      }
    })();
  }, []);

  return (
    <div className="absolute top-1.5 left-8">
      <div className="flex flex-col p-0">
        <div className="flex items-center gap-1">
          <img
            src={`https://openweathermap.org/img/wn/${image}@2x.png`}
            alt="weather-logo"
            className="w-14 text-white rounded-[50%] weather-icon"
          />
          <div className="sm:text-3xl font-bold">
            {temp}
            <span>&#176;</span>
          </div>
        </div>
        <span className="m-0 p-0 sm:text-xl mr-2 font-bold">{location}</span>
      </div>
      {locationErr && <label>{locationErr}</label>}
    </div>
  );
};