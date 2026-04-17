import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
/**
 * *INFO*
 * * This file implements a route guard for “authenticated-only” pages (a very common SPA pattern).
 * * The problem it solves is: some routes should only be visible to signed-in users (for example profile and wishlist).
 * * In a server-rendered app, the server can enforce this by not sending the page unless the request is authenticated.
 * * In a client-rendered SPA, the UI is already downloaded, so you still must enforce access at the routing/UI layer: you either hide the content, show an access denied screen, or redirect the user to sign in.
 * This component is used in `AppRouter.jsx` as a wrapper route: `<Route element={<AuthUser/>}> ...protected routes... </Route>`.
 * *That means AuthUser itself is not a page; it is like middleware around pages. It decides whether to render the nested child routes (via `<Outlet/>`) or redirect elsewhere (via `<Navigate/>`).
 *
 *
 *
 */
const AuthUser = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  /* This block reads the two sources of truth needed for a guard: authentication state and the current location.`useAuth()` is your own hook that reads auth context provided by `AuthProvider` (it typically returns something like `{ auth, setAuth, loading }`). This is the app-level state that answers: “Is the user currently authenticated?” and “Are we still checking authentication?”. `useLocation()` comes from React Router and returns an object representing the current route (pathname, search params, hash, and state).We capture `location` so we can redirect to sign-in while carrying along the original destination in `state`. This is an important UX pattern: after signing in, the app can return the user to the page they originally requested instead of always dumping them on a default page. The `location` object is also stable and serializable enough to store in navigation state for this purpose. */
  if (loading) return null;
  /* Explanation: This is the “loading gate”.Auth checks often involve async work: verifying a session cookie with the backend, refreshing a token, or reading local storage then validating it. During this time, you do not know if the user is allowed to view protected content. Rendering protected content too early can cause a flash of private UI (a security/UX issue), and redirecting too early can cause a redirect loop or a confusing user experience. By returning `null`, the guard renders nothing while authentication is being resolved. In production, you might render a spinner/skeleton to reassure the user that the app is working. */
  if (!auth)
    return <Navigate to='/signin' replace state={{ from: location }} />;
  /* Explanation: This is the core protection rule: if the user is not authenticated, redirect to `/signin`.`<Navigate to="/signin" />` is declarative navigation: React Router sees it in the tree and performs navigation. `replace` means “replace the current history entry instead of pushing a new one”. This matters because it prevents the user from clicking the browser Back button and landing right back on the protected route only to be redirected again (it reduces back-button frustration).The `state={{ from: location }}` part attaches extra metadata to the navigation. It does not appear in the URL; it lives in the router’s in-memory navigation state. Your sign-in page can read it using `useLocation()` and then, after successful login, navigate back to `location.state.from` (commonly `navigate(from, { replace: true })`). This is a standard pattern in React Router for “return to where you were going.” */
  return <Outlet />;
  /* Explanation: If we reach this line, auth is known and the user is authenticated, so we allow the protected routes to render.`<Outlet/>` is crucial: it is how nested routes render their elements. In `AppRouter.jsx`, you defined protected child routes like `profile` and `wishlist` under the AuthUser wrapper route. When the URL matches one of those, React Router renders AuthUser, and inside AuthUser, `<Outlet/>` is replaced by the matched child element (e.g., `<UserProfile/>`). This pattern keeps access control centralized and keeps protected pages simpler because they don’t need to repeat the same guard logic. */
};
export default AuthUser;
/**
 *
 *
 * TODO:Over time can extend auth to support roles/permissions (admin vs user) by turning AuthUser into a more general `RequireAuth` component that checks roles and redirects or shows a 403 screen.
 *
 *
 *
 */
