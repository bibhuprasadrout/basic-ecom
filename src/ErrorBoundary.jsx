import React from "react";
import PropsTypes from "prop-types";
/**
 *
 *
 * * INFO *
 * * This file implements an Error Boundary, which is a React pattern for making your UI resilient to runtime crashes.
 *
 * * In a Single Page Application, a single uncaught runtime errors (e.g., accessing undefined, failed API calls, logic bugs) during rendering can cause the whole UI tree to unmount or get stuck, leaving the user with broken UI or a blank screen.
 *
 * * Error boundaries are “circuit breakers” for the component tree: you wrap part (or all) of your app with an ErrorBoundary, and if a descendant throws during render, React stops rendering that subtree and instead renders a fallback UI.
 *
 * * This improves user experience (they see an error message instead of nothing) and developer experience (you can log errors with useful context).
 *
 * !Important limitation: Error boundaries do not catch everything. They catch errors during rendering, in lifecycle methods, and in constructors of child components. They do not catch errors in event handlers (click handlers), async code (Promise rejections) unless you rethrow into render, or errors outside React’s tree (like in plain scripts). That’s why you still need try/catch in async flows and global error handling for some cases.
 *
 * * The `ErrorBoundary` class component implements the error boundary pattern. It uses React’s lifecycle methods to catch errors and manage its internal state to decide when to show the fallback UI. The `ErrorFallback` functional component is a simple UI that displays the error message and provides a reset button to attempt recovery.
 *
 *
 */
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  /**
   *
   * `state` is component-local memory that triggers re-renders when it changes.
   * This class stores two pieces of state: `hasError` is a boolean flag that indicates whether something inside the boundary failed; `error` stores the actual Error object (or whatever was thrown).
   * When `hasError` flips to true, this boundary will stop rendering its children and will render a fallback UI instead.
   * Notice this state lives at the boundary level, not in each page; this centralizes crash handling.
   *
   *
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  /**
   *
   * `getDerivedStateFromError` is a special React lifecycle hook for error boundaries.
   * It is `static` because React calls it without needing an instance first; it receives the thrown error and lets you update state in a pure way.
   * Returning `{ hasError: true, error }` triggers a re-render where you can show a fallback screen. This method is designed to be side-effect free: it should only compute the next state. If you need side effects (logging, reporting), you do that in `componentDidCatch`.
   *
   *
   */
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  /**
   *
   * `componentDidCatch` is where you perform side effects after an error is captured.
   * `errorInfo` contains React-specific diagnostic information such as a component stack trace (which component tree path triggered the crash).
   * In production apps, you typically send this to an error tracking service (Sentry, LogRocket, etc.) rather than only logging to the console.
   *
   *
   */
  reset = () => this.setState({ hasError: false, error: null });
  /**
   *
   * This `reset` method is an escape hatch for users and developers.
   * Once a boundary has entered the “error” state, it will keep rendering the fallback until state changes.
   * By resetting state, you allow the app to attempt rendering the children again. This is helpful when the error was transient (for example, a temporary network glitch caused a child to throw) or after the user changes something (like reloading data). The arrow function syntax (`reset = () => ...`) ensures `this` is bound correctly without needing a constructor bind.
   *
   *
   */
  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.reset}
        />
      );
    }
    return this.props.children;
  }
  /* Explanation: `render()` defines the “two modes” of the boundary.Normal mode: it returns `this.props.children`, meaning it renders whatever you wrapped inside `<ErrorBoundary>...</ErrorBoundary>` (in your app, that is the router/tree from `main.jsx`). Error mode: it returns a fallback component instead. This is a classic guard pattern: a boolean state decides which UI path to show. Technically, `this.props.children` is not a function call; it’s a special React prop that represents nested JSX passed into this component. It can be a single element, an array, or fragments. */
}
export default ErrorBoundary;
ErrorBoundary.propTypes = {
  children: PropsTypes.node.isRequired,
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
ErrorFallback.propTypes = {
  error: PropsTypes.object.isRequired,
  resetErrorBoundary: PropsTypes.func.isRequired,
};
/**
 *
 *
 * When you add role="alert" to an element (like <div role="alert">), it tells assistive technologies that the content inside is important and time-sensitive. Screen readers will immediately announce the content of that element to the user, without requiring them to focus on it.
 * But, in a polished product, you might hide any raw error messages from end users, show a support reference id, and provide navigation links back to safety (for example, “Go home”).
 *
 *
 * */
