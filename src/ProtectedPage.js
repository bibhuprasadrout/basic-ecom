import { useUser } from "./contexts/UserContext";

const ProtectedPage = () => {
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div>This page is protected.</div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};
export default ProtectedPage;
