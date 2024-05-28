import Menu from "../Menu/Menu";

const Main = () => {
  return (
    <div className="bg-gray-700 w-screen h-screen flex items-center justify-center">
      <Menu />
      <p className="text-3xl font-bold text-white">Вы не залогинены</p>
    </div>
  );
};

export default Main;
