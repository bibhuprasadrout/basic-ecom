// #region
// This is a single line comment. It’s useful for short notes or explanations that don’t require much detail. It can be placed anywhere in the code and is ignored by the JavaScript engine.
// However single line comments can become cluttered if you have a lot of them, and they don’t support structured information like parameters or return types.
// They are not collapsible in most code editors, so they can add visual noise if overused.
// Using region comments (like `// #region` and `// #endregion`) can help organize code into collapsible sections, which is especially useful in large files. This allows developers to hide or show blocks of code, making it easier to navigate and focus on relevant parts. However, they are not a standard JavaScript feature and may not be supported in all editors or environments, so their usage should be consistent with the team’s coding standards.
// #endregion

// `useDispatch` is a React-Redux hook that gives you access to the Redux store’s `dispatch` function, which is how actions are sent to update global state in the redux store.

// * useful information

// // --- REQUEST INTERCEPTOR ---

// ! alerts or error messaages or some depricated code: {i should not use this code in future...}

// TODO: A production-quality version typically adds user-facing error messages (invalid credentials), disables the button while the request is in flight, and stores session info (cookie or token) depending on your backend strategy.

//  ? doubtful course of action or code: {what should i do with this code...}

/**
 * This is a JSDoc comment
 */

/** @function */
function greet() {}
greet();

/**
 * This way of commenting is called JSDoc, which is a popular way to document JavaScript code. It allows you to provide type information and descriptions for your functions, like the parameter of a function and what value it represents, making it easier for other developers (or yourself in the future) to understand how to use the function and what it does.
 * @param {string} name - The user's name
 * @param {String} method - 'get', 'post', 'put', 'patch', 'delete'
 * @param {String} url - The endpoint path
 * @param {Object} [data] - The request body (optional)
 * @param {Object} [params] - Query parameters (optional)
 */

/**
 * @returns {boolean} True if valid
 */

/** @type {number} */
let count;
console.log(count);

/** @const {string} */
const API_KEY = "abc123";
console.log(API_KEY);

/**
 * @class
 * @constructor
 */
function Person(name) {
  this.name = name;
}
const alice = new Person("Alice");
console.log(alice.name);

/**
 * @property {string} title - The book title
 */

/**
 * @example
 * const result = add(2, 3);
 */

/** @deprecated Use newFunction instead */

/** @see newFunction */

/**
 * @throws {Error} If input is invalid
 */

// * Inline JSDoc
/** @type {HTMLDivElement} */
const container = document.querySelector("#app");
console.log(container);
