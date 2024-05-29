import { createContext, useState } from "react";

const CustomContext = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState("");

  const value = { user, setUser };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export { ContextProvider, CustomContext };
