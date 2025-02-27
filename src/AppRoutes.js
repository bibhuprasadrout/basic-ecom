import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App";
import LoginPage from "./modules/login/LoginPage";
import { UserProvider, useUser } from "./contexts/UserContext";
import ProtectedPage from "./ProtectedPage";
import { useEffect } from "react";
const AppRoutes = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useUser() || {};
    return user ? children : <Navigate to='/' />;
  };
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/protected'
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
export default AppRoutes;
