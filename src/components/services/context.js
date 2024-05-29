import { createContext, useState } from "react";

const CustomContext = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const value = { user, setUser, posts, setPosts };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export { ContextProvider, CustomContext };
