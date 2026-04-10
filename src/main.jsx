import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";
import { RootlevelFallbackUi } from "./components";
/* This import block is the entry point for your entire frontend runtime and it also demonstrates multiple important JavaScript module concepts used everywhere in modern frontend development.

`import ... from "..."`  is part of ES Modules standard in JavaScript to load code from other files.

There are three different “styles” of import shown here, and each has a specific meaning.

(1) `import { Suspense } from "react";` is a named import that takes the named export called Suspense”.
named exports are usually specific features exported by name and are written as `export const Suspense = ...` (or `export { Suspense }`). This in no way affect the performance.
...also `Suspense` is a React feature that lets you show fallback UI while some child component is waiting (often because code is still downloading).

(2) `import ReactDOM from "react-dom/client";` is a default import that takes the default export from "react-dom/client" and call it ReactDOM”. Here its used to exposes the root component that shall render the application into the root element(project entry point index.js with id root);
in React 18+ you import from `react-dom/client` to access `createRoot`.

(3) `import "./index.css";` is called a side effect import because the side effects are the purpose of loading the CSS file.
- Render Blocking: External CSS files block the browser from rendering the page until they are downloaded and parsed. This slowes down load time by a bit but ensures the page doesn’t “flash” unstyled content.
- Reflow & Repaint: When CSS is applied, the browser recalculates layout (reflow) and redraws elements (repaint). Complex UI might need multiple reflows.
- Cascade & Specificity Changes: Loading new CSS can override existing styles due to the cascade.
Vite processes this import, bundles the CSS, and ensures it is injected so styles apply globally;
There is no JavaScript variables or values needed from a CSS file, just nned it to be executed/loaded.
*/

// import AppRouter from "./AppRouter";
const AppRouter = React.lazy(() => import("./AppRouter"));
/*
Normal imports like `import AppRouter from "./AppRouter";`) is a static import that happens at module evaluation time, meaning as soon as this entry file loads, the bundler tries to load `AppRouter` too. Static imports are great for code that must be available immediately, but they can increase initial bundle size if the imported module pulls in many other modules.

However dynamic import expressions like `const AppRouter = React.lazy(() => import("./AppRouter"));` returns a Promise that resolves to the module object when the chunk is downloaded. Bundlers treat this as a splitting point: they create a separate JS chunk for `./AppRouter` that can be fetched later. `React.lazy` wraps that Promise-based module loading into a component you can render like `<AppRouter />`.

When React tries to render it for the first time, it triggers the download, and while that Promise is pending, React “suspends” rendering of that subtree. That is why `Suspense` is required above it: Suspense provides a fallback UI so the user sees something immediately rather than a blank screen. Think of this as a performance and scalability pattern: as the app grows, you keep the initial payload small and only pay the cost for features/routes when the user navigates to them.

The trade-off is that you must handle loading states (fallback UI) and you should ensure critical routes/components are either preloaded or have a pleasant loading experience.
*/
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
/* Explanation:
The browser initially loads `index.html`, which contains a single mount point like `<div id="root"></div>`. Here `document.getElementById("root")` returns that DOM node and `ReactDOM.createRoot(...)` creates a React “root” object that owns rendering into that node.

Conceptually, the root is like a controller: once created, it manages reconciliation (React’s diffing algorithm) and updates the DOM efficiently whenever state/props change. In React 18, using `createRoot` (instead of the older `ReactDOM.render`) is the recommended API and enables improvements like
- Concurrent rendering that allows a frontend framework (like React) to break rendering work into smaller chunks, pause it, and prioritize urgent updates,
- while better scheduling refers to the system’s ability to decide which tasks should run first to keep the UI responsive.

Practical impact for development: you have a single place where the app is mounted, which makes the app architecture predictable; everything else in the project is “just components” rendered under this root.
*/
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<RootlevelFallbackUi />}>
        <AppRouter />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
);
/*
This render block defines the top-level component tree and the runtime guarantees around it.

`root.render(...)` is the moment your SPA becomes “alive”: React takes this tree, builds an internal representation, and paints it into the `#root` element.

The wrappers each serve a different purpose.
- `React.StrictMode` is a development-only tool: it intentionally double-invokes certain behaviors (like running effects twice) to help you detect accidental side effects and unsafe patterns early; it does not affect production builds the same way.
- `ErrorBoundary` is your crash shield: if a descendant throws during rendering, it can stop the error from taking down the entire UI and instead show a controlled fallback (often with a “Try again” action).
- `Suspense` is the mechanism that makes lazy-loading usable: when `AppRouter` is still downloading, the fallback `<div>Loading...</div>` is rendered, so the user sees an immediate response rather than a blank page.
- Finally, `<AppRouter />` is the “composition root” of your actual application: it typically contains providers (Redux/Auth/Theme) and the route table, which enables the core SPA behavior: navigation changes what components render without doing a full page reload.

This structure helps future development because it creates clear responsibilities: entry-point bootstrapping happens here;
routing and app-wide context happens in `AppRouter`; page/layout components live elsewhere.
*/

// root.unmount();
/*
Unmounting is the opposite of mounting: it tells React to tear down the component tree, remove event listeners it added, and run cleanup functions from effects. Most SPAs never call `root.unmount()` because the app is expected to live for the whole lifetime of the browser tab. You would intentionally call it in special architectures such as micro-frontends (where an app is mounted/unmounted inside a host shell), integration tests (mount app, assert UI, unmount to isolate tests), or advanced tooling/hot-reload scenarios. Keeping this commented note here is fine as a learning aid, but it’s not required for normal operation. */
