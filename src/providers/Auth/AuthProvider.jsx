import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { request } from "../../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("auth") === "true"; // localstorage only stores string to get a bool we need to coerce it out like this line of code.
  });

  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    setLoading(true);
    const { data, error } = await request("get", "auth/profile"); // This is a simple request to check if the user’s session is valid. The `request` function uses your pre-configured axios instance, which should include credentials (cookies) and the correct base URL. If the session is valid, we set `auth` to true; if it’s invalid (for example, the cookie is missing or expired), we catch the error and set `auth` to false. Finally, we set `loading` to false to indicate that auth status has been resolved.
    if (data?.success) {
      setAuth(() => !!data?.user);
      localStorage.setItem("auth", !!data?.user); // / !!data?.user is the same as doing data?.user != null. It converts the truthy/falsy value of data?.user into a strict boolean (true or false).
    } else {
      console.error("validateToken error:", error || "Unknown error");
      setAuth(() => false);
      localStorage.removeItem("auth");
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
    <AuthContext.Provider
      value={{ auth, setAuth, loading }} // AuthProvider always keeps track of the user’s authentication status and provides it to the rest of the app through context. The `value` prop contains the current `auth` state, the `setAuth` function to update it, and the `loading` state to indicate if we’re still checking auth status. Any component wrapped in this provider can access these values.
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
