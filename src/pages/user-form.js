import { useUserInfo } from "../contexts";

export const UserForm = () => {
  const { dispatch } = useUserInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      dispatch({
        type: "SET_USERNAME",
        payload: e.target.value,
      });
    }
  };

  return (
    <div className="text-center text-white font-bold h-screen flex justify-center	items-center flex-col	z-10">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl">Hello, What's your name?</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text" required
            className="text-center border-none my-8 px-10 text-3xl sm:text-4xl md:text-5xl bg-transparent focus:outline-none border-class font-bold"
            onKeyPress={handleNameChange}
          />
        </form>
      </div>
    </div>
  );
};