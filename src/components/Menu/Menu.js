import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="absolute top-5 w-6/12">
      <ul className="flex items-center justify-between text-white">
        <li className="hover:underline ">
          <NavLink to="/registration" className="">
            Registration
          </NavLink>
        </li>
        <li className="hover:underline ">
          <NavLink to="/" className="">
            Main
          </NavLink>
        </li>
        <li className="hover:underline ">
          <NavLink to="/login" className="">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
