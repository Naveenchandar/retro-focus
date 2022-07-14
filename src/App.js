import { useEffect, useState } from "react";
import { useUserInfo } from "./contexts";
import { bgImages } from "./database";
import { UserForm, Home } from "./pages";

function App() {
  const { state: { userName }, dispatch } = useUserInfo();
  const [backgroudImage, setBackgroundImage] = useState('');
  
  useEffect(() => {
    const getName=localStorage.getItem("retro-focus");
    const bgImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    setBackgroundImage(bgImage);
    dispatch({
      type: "SET_USERNAME",
      payload: getName,
    });
  }, [dispatch]);

  return (
    <div
      className="h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url("${backgroudImage}")`
      }}
    >
      {userName ? <Home /> : <UserForm />}
    </div>
  );
}

export default App;
