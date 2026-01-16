import { useContext } from "react";
import { AuthContext } from "../providers/Auth/AuthProvider";

export const useAuth = () => useContext(AuthContext);
