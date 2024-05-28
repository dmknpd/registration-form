import Menu from "../Menu/Menu";

const Login = () => {
  return (
    <div className="bg-gray-700 w-screen h-screen flex items-center justify-center">
      <Menu />
      <div className="bg-stone-200 w-96 h-auto py-10 px-1 rounded flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <form action="" className="flex flex-col w-full items-center gap-4">
          <div className="flex flex-col mt-5 w-4/5">
            <label htmlFor="email" className="">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded h-8 px-2"
            />
          </div>

          <div className="flex flex-col w-4/5">
            <label htmlFor="password" className="">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded h-8 px-2"
            />
          </div>

          <button
            type="submit"
            className="bg-white mt-3 px-5 py-1 rounded hover:bg-gray-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
