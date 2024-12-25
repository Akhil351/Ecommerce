import { createContext, useContext, useState } from "react";
const UserContext = createContext();
export const UserProfileProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || ""); 

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProfileContext = () => useContext(UserContext);

export default UserProfileContext;
