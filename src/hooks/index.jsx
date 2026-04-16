// Barrel file for custom hooks!!!

import { useContext } from "react";
import { AuthContext } from "../providers";

export const useAuth = () => useContext(AuthContext);
export { useHoverMedia } from "./useHoverMedia";
