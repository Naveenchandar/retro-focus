import { bgImages } from "./database";
import { UserForm } from "./pages";

const App = () => {
  const bgImage = bgImages[Math.floor(Math.random() * bgImages.length)];

  return (
    <div
      className="h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url("${bgImage}")`,
      }}
    >
      {<UserForm />}
    </div>
  );
}

export default App;
