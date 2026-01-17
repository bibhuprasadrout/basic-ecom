import { Outlet } from "react-router";
import { useAuth } from "../../hooks";
const AuthUser = () => {
  const authStatus = useAuth();
  return (
    <div>
      {authStatus?.auth ? (
        <Outlet />
      ) : (
        <div>You do not have permission to view this page.</div>
      )}
    </div>
  );
};
export default AuthUser;
