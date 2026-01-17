import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("auth") === "true"; // localstorage only stores string to get a bool we need to coerce it out like this.
  }); // hydrate from localStorage for instant UX
  const [loading, setLoading] = useState(true);
  const validateToken = async () => {
    try {
      const res = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: "/auth/profile",
        withCredentials: true,
      });
      const validUser = res.data?.user;
      setAuth(() => !!validUser);
      localStorage.setItem("auth", !!validUser);
      // is the same as
      // const validUserStatus = res.data?.status;
      // if (validUserStatus && validUser != null) { setAuth(() => true);
      // } else { setAuth(() => false); }
    } catch (err) {
      setAuth(() => false);
      localStorage.removeItem("auth");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    validateToken();
  }, []);
  useEffect(() => {
    if (auth == false) localStorage.removeItem("auth");
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
