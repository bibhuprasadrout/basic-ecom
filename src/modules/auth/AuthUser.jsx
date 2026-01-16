import { useAuth } from "../../hooks";
const AuthUser = () => {
  const value = useAuth();
  const userAuthorized = value.value || "yet to assign";
  console.log(userAuthorized);
};
export default AuthUser;
