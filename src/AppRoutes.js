import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { UserProvider, useUser } from "./contexts/UserContext";
import ProtectedPage from "./ProtectedPage";
import SignInPage from "./modules/signin/SignInPage";
import SignUpPage from "./modules/signup/SignUpPage";
import LandingPage from "./modules/landingPage/LandingPage";
import Navbar from "./components/navbar/Navbar";
import ProdByCat from "./modules/products/ProdByCat";
const AppRoutes = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useUser() || {};
    return user ? children : <Navigate to='/' />;
  };
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />}>
            <Route path=':slug' element={<ProdByCat />} />
          </Route>
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
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
