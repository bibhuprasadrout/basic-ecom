import { useUser } from "./contexts/UserContext";

const ProtectedPage = () => {
  const { signout } = useUser();
  const handleSignout = () => {
    signout();
  };
  return (
    <>
      <div>This page is protected.</div>
      <button onClick={handleSignout}>Signout</button>
    </>
  );
};
export default ProtectedPage;
