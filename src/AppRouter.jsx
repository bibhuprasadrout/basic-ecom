// import React from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore/appStore";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import AuthUser from "./modules/auth/AuthUser";
import Signin from "./modules/auth/Signin";
import Signup from "./modules/auth/Signup";
import Product from "./modules/Product";
import Products from "./modules/Products";
import Cart from "./modules/Cart";
import Wishlist from "./modules/Wishlist";
import Home from "./modules/home/Home";
import AboutUs from "./modules/legal&CompanyInformation/AboutUs";
import ContactUs from "./modules/legal&CompanyInformation/ContactUs";
import CopyrightNotice from "./modules/legal&CompanyInformation/CopyrightNotice";
import PrivacyPolicy from "./modules/legal&CompanyInformation/PrivacyPolicy";
import RefundPolicy from "./modules/legal&CompanyInformation/RefundPolicy";
import Team from "./modules/legal&CompanyInformation/Team";
import TermsOfService from "./modules/legal&CompanyInformation/TermsOfService";
import UserProfile from "./modules/UserProfile";
import { AuthProvider } from "./providers/Auth/AuthProvider";
const AppRouter = () => {
  return (
    <AuthProvider>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Home */}
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />

              {/* Sign in */}
              <Route path='signin' element={<Signin />} />

              {/* Sign up */}
              <Route path='signup' element={<Signup />} />

              {/* Auth for users */}
              <Route element={<AuthUser />}>
                <Route path='profile' element={<UserProfile />} />

                {/* Wishlist */}
                <Route path='wishlist' element={<Wishlist />} />
              </Route>

              {/* Cart */}
              <Route path='cart' element={<Cart />} />

              {/* Products and product page */}
              <Route path='products' element={<Products />} />
              <Route path=':productId' element={<Product />} />

              {/* Legal and company information */}
              <Route path='legalAndCompanyInformation'>
                <Route path='aboutus' element={<AboutUs />} />
                <Route path='contactus' element={<ContactUs />} />
                <Route path='copyrightNotice' element={<CopyrightNotice />} />
                <Route path='privacyPolicy' element={<PrivacyPolicy />} />
                <Route path='refundPolicy' element={<RefundPolicy />} />
                <Route path='team' element={<Team />} />
                <Route path='termsOfService' element={<TermsOfService />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
};
export default AppRouter;
