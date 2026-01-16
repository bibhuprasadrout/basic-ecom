import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  console.log("auth:", auth);

  const validateToken = async (
    user = {
      email: "bob@laso.com",
      password: "Boblaso1!",
    }
  ) => {
    const res = await axios({
      method: "post",
      baseURL: BASE_URL,
      url: "signin",
      data: user,
    });
    console.log("login res:", res.data);
    const userRes = await axios({
      method: "get",
      baseURL: BASE_URL,
      url: "/auth/profile",
      credentials: "include",
    });
    console.log("login userRes:", userRes.data);
  };
  useEffect(() => {
    validateToken();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
