import { useUser } from "./contexts/UserContext";

const ProtectedPage = () => {
  const { Signout } = useUser();
  const handleSignout = () => {
    Signout();
  };
  return (
    <>
      <div>This page is protected.</div>
      <button onClick={handleSignout}>Signout</button>
    </>
  );
};
export default ProtectedPage;
