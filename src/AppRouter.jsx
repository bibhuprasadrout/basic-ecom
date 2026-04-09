// import React from "react";
import { lazy } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthUser from "./modules/auth/AuthUser";
import { AuthProvider } from "./providers/Auth/AuthProvider";
/* Explanation: This first block is the “wiring” layer of your app, and understanding it gives you a mental model for how a real SPA is assembled in React.Your project uses ESM (ECMAScript Modules), so each `import` pulls in a module and binds its exported values to local names. Some imports are from third-party packages (for example `"react"`, `"react-redux"`, `"react-router-dom"`), which typically come from `node_modules`. Other imports are relative paths (for example `"./App"` or `"./providers/Auth/AuthProvider"`), which are your own modules in the codebase.The key idea is: this file does not contain “UI business logic”; it composes global infrastructure. `lazy` is a React feature that works with dynamic `import()` to code-split components. `Provider` from `react-redux` is what connects your Redux store to React so any component below can call `useSelector` and `useDispatch` without manually passing the store through props (this is dependency injection via React context). `appStore` is your configured store instance (reducers, middleware, etc.). `BrowserRouter`, `Routes`, and `Route` are React Router’s primitives that implement client-side routing using the browser History API; they are what makes it a Single Page Application (URL changes without a full reload). `App` is your layout component that contains the persistent shell (like Navbar/Footer) and an `<Outlet/>` where the current page is rendered. `AuthUser` is a route-guard wrapper that decides whether protected routes should render (and in your current implementation it redirects unauthenticated users to `/signin`). `AuthProvider` is a context provider that holds auth state and exposes it via your `useAuth` hook. Placing `AuthProvider` here means any page or layout can read auth state consistently. */
const Signin = lazy(() => import("./modules/auth/Signin"));
const Signup = lazy(() => import("./modules/auth/Signup"));
const Product = lazy(() => import("./modules/Product"));
const Products = lazy(() => import("./modules/Products"));
const CartPage = lazy(() => import("./modules/CartPage"));
const CheckoutPage = lazy(() => import("./modules/checkoutPage"));
const Wishlist = lazy(() => import("./modules/Wishlist"));
const Home = lazy(() => import("./modules/home/Home"));
const AboutUs = lazy(
  () => import("./modules/legal&CompanyInformation/AboutUs"),
);
const ContactUs = lazy(
  () => import("./modules/legal&CompanyInformation/ContactUs"),
);
const CopyrightNotice = lazy(
  () => import("./modules/legal&CompanyInformation/CopyrightNotice"),
);
const PrivacyPolicy = lazy(
  () => import("./modules/legal&CompanyInformation/PrivacyPolicy"),
);
const RefundPolicy = lazy(
  () => import("./modules/legal&CompanyInformation/RefundPolicy"),
);
const Team = lazy(() => import("./modules/legal&CompanyInformation/Team"));
const TermsOfService = lazy(
  () => import("./modules/legal&CompanyInformation/TermsOfService"),
);
const UserProfile = lazy(() => import("./modules/UserProfile"));
const NotFound = lazy(() => import("./modules/NotFound"));
/* Explanation: This second block is about performance and scalability, not just “syntax”.Each line uses `React.lazy` (you imported `lazy` from React) together with a dynamic `import("...")`. Dynamic imports return a Promise, and bundlers treat them as a hint to split code into separate chunks. That means the browser does not need to download every page of your app before it can show the first screen. Instead, it downloads the minimum required to start, then downloads route components only when the user navigates to them.This is especially relevant for routers: a router file often references many pages. If you statically imported every page (`import Home from ...`, `import Products from ...`), your initial bundle would grow as your app grows. Lazy-loading keeps the initial payload smaller, which can reduce time-to-interactive. The trade-off is that you must have loading states: when a lazy component is first rendered, React “suspends” and a `<Suspense fallback=...>` higher up (in your `main.jsx`) decides what to display while the chunk is downloading.Notice the split of responsibility: `main.jsx` provides the `<Suspense>` boundary for the whole router; `AppRouter.jsx` defines which pages are lazy. This is a common architecture because it centralizes loading UX at the app entry point. */
const AppRouter = () => {
  return (
    <AuthProvider>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
              {/* <Route path='home' element={<Home /> />} */}
              <Route path='signin' element={<Signin />} />
              <Route path='signup' element={<Signup />} />
              <Route element={<AuthUser />}>
                <Route path='profile' element={<UserProfile />} />
                <Route path='wishlist' element={<Wishlist />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='checkout' element={<CheckoutPage />} />
              </Route>
              <Route path='products' element={<Products />} />

              {/* broad dynamic route, e.g. "/123"; keep in mind it matches many patterns */}
              {/* <Route path=':id' element={<Product />} />  */}

              {/* conventional detail route, e.g. "/products/123" */}
              <Route path='products/:id' element={<Product />} />

              {/* alternative but redundant detail route nested under "/home", e.g. "/home/products/123" */}
              {/* <Route path='home/products/:id' element={<Product />} />  */}

              {/* group route that prefixes all legal and company-related pages */}
              <Route path='legalAndCompanyInformation'>
                <Route path='aboutus' element={<AboutUs />} />
                <Route path='contactus' element={<ContactUs />} />
                <Route path='copyrightNotice' element={<CopyrightNotice />} />
                <Route path='privacyPolicy' element={<PrivacyPolicy />} />
                <Route path='refundPolicy' element={<RefundPolicy />} />
                <Route path='team' element={<Team />} />
                <Route path='termsOfService' element={<TermsOfService />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
};
/* Explanation: This final block is the core routing “map” of your application, and it shows three foundational SPA ideas: providers, nested layouts, and route matching, plus an important lesson about designing URLs so your app stays maintainable as it grows.Providers first: `AuthProvider` and Redux `<Provider>` wrap the router. This means every route component can access auth context and the Redux store. From a computer-science viewpoint, this is dependency injection using React context: you define shared dependencies once at the top, then leaf components consume them via hooks instead of passing props through unrelated components (prop drilling). That reduces coupling and makes refactors safer because you can move pages around without rewiring everything.Next, `BrowserRouter` is what turns your component tree into a navigable SPA. It uses the browser’s History API (think `pushState` and back/forward events) so URL changes do not trigger a full document request like traditional server-rendered sites. Instead, React Router observes the current location and decides what to render. `Routes` and `Route` form a declarative route table: you describe what UI belongs to what URL, and React Router performs matching (choosing the most appropriate route) and rendering.Nested routing and layouts: the route `<Route path='/' element={<App />}>` is a layout route. That means `<App />` renders for every nested path under `/`, and it contains `<Outlet />` to show whichever child route matches. This is the standard “app shell” pattern: Navbar/Footer/overall layout stay constant; only the main content swaps. The index route is the default page for `/`, while `home` is a second URL that renders the same page.Auth guarding: `<Route element={<AuthUser />}> ... </Route>` is a wrapper route without a `path`. This is a key concept: a route can act like middleware. It doesn’t exist as a URL by itself; it exists to control rendering of its children. Your `AuthUser` decides whether to render `<Outlet />` (the protected child pages) or redirect to `/signin`. This pattern is cleaner than repeating `if (!auth) navigate(...)` in every protected page because it centralizes policy in one place.Dynamic parameters and why `products/:id` is the good pattern: `products/:id` is a dynamic segment. `:id` is a placeholder for a real value like `123`. React Router parses it and `Product` can read it with `useParams()`. This design communicates intent: you are viewing a product resource, and the id identifies which product. It also scales: later you can add other resource pages like `/users/:id`, `/orders/:id`, etc. without ambiguity.Now, why the two routes you highlighted are usually a bad idea to keep in real apps. (1) The broad root-level `:id` route (`<Route path=':id' element={<Product />} />`) is “too greedy”. It matches any single path segment under `/`, meaning many future URLs can accidentally be interpreted as a product id. Example: if later you add `/settings`, `/help`, `/legal`, `/contact`, or even `/about`, the router will try to match them. React Router will usually prefer a more specific sibling route if it exists, but the problem is that this broad matcher becomes a trap: you must always remember “I can’t add a top-level route name that could be mistaken for an id, or it will either conflict or behave unexpectedly”. It also makes debugging confusing because a typo like `/produts` (misspelled) might render a product page instead of a NotFound, hiding the mistake. From a URL design perspective, `/:id` is ambiguous: users (and developers) can’t tell what resource the id refers to. From an engineering perspective, it harms maintainability because the route table becomes brittle: adding new top-level features is riskier, and analytics/monitoring becomes noisier because many unrelated paths might funnel into the same screen. In short, keep dynamic params under a clear namespace like `/products/:id` unless you have a very intentional reason to claim the entire root path space. (2) The redundant `home/products/:id` route (`<Route path='home/products/:id' element={<Product />} />`) is not “wrong” syntactically, but it is usually harmful to product and developer experience because it creates multiple URLs that represent the exact same resource. Multiple URLs for the same page create problems: inconsistent linking (some parts of the app link to `/products/123`, others to `/home/products/123`), duplicated analytics (two URLs for the same thing), SEO/canonical issues (if you ever care about indexing), and cache fragmentation (CDNs/service workers treat different URLs as different resources). It also adds maintenance cost: if you ever change product URLs, you must remember to update multiple routes and all links. A simpler approach is: pick one canonical product detail route (`/products/:id`) and link to it from anywhere (including from the Home page). If you want “Home context”, pass state in navigation or show breadcrumb UI rather than encoding “home” into the URL.Finally, route grouping: `legalAndCompanyInformation` is a parent route that groups related static pages under a common prefix, which is good for organization. The catch-all `path='*'` route is your 404: it is a safety net for any unmatched URL, giving users a friendly NotFound page.Important development impact: this file is the single source of truth for navigation. Good route design (clear prefixes, minimal redundancy, no greedy matchers) makes future development faster and safer because adding new features doesn’t accidentally break existing navigation. */
export default AppRouter;
