Redux Guide
===========

Install Redux
-------------

For modern React apps, use Redux Toolkit.

Run this inside your React frontend folder:

cd frontend
npm install @reduxjs/toolkit react-redux

What is Redux?
--------------

Redux is a JavaScript library used to manage application-level state.

State means data your app remembers.

Redux is commonly used when many components need access to the same data.

Examples of application state:

- Logged-in user
- Authentication token
- Shopping cart
- Theme setting
- Notifications
- User permissions
- Data shared across many pages/components


Component State vs Application State
------------------------------------

Component state belongs to one component.

Example:

const [likes, setLikes] = useState(0);

This is component state because only that component needs to track likes.


Application state belongs to the entire app.

Example:

loggedInUser
cartItems
isDarkMode
authToken

This is application state because many components may need it.


What Problem Does Redux Solve?
------------------------------

Without Redux, you may have to pass data through many components using props.

This is called prop drilling.

Example:

App
  -> Dashboard
    -> Profile
      -> UserCard
        -> UserName

If UserName needs the logged-in user's name, you may have to pass the user data through every component.

Redux lets any component access shared state directly from the Redux store.


Simple Way to Think About Redux
-------------------------------

Redux is like one big storage box for your app.

React components can:

- Read data from the Redux store
- Send actions to update the Redux store


Simple Flow
-----------

User clicks button
        ↓
Component dispatches an action
        ↓
Redux updates the store
        ↓
React UI updates automatically


Important Redux Terms
---------------------

Store
-----

The store is the central place where Redux keeps application state.

Example:
```json
{
  user: {
    name: "Jaden",
    loggedIn: true
  },
  cart: {
    items: []
  }
}
```

Slice
-----

A slice is one section of the Redux store.

Example slices:

userSlice
cartSlice
themeSlice

Each slice usually controls one part of your app's state.


State
-----

State is the actual data being stored.

Example:
```js
const initialState = {
  count: 0
};
```

Action
------

An action describes what happened.

Example:

increment
decrement
login
logout
addToCart
removeFromCart


Reducer
-------

A reducer contains the logic that changes state.

Example:
```js
increment: (state) => {
  state.count += 1;
}
```

Dispatch
--------

Dispatch means "send an action to Redux."

Example:

dispatch(increment());

This tells Redux to run the increment action.


Selector
--------

A selector is how a React component reads data from Redux.

Example:

const count = useSelector((state) => state.counter.count);

Redux Toolkit
-------------

Redux Toolkit is the modern recommended way to use Redux.

It makes Redux easier by giving you:

- configureStore()
- createSlice()
- simpler reducer syntax
- less boilerplate code


Folder Structure Example
------------------------

src/
  app/
    store.js
  features/
    counter/
      counterSlice.js
  App.jsx
  main.jsx


Step 1: Create the Redux Store
------------------------------

File:

src/app/store.js

Code:
```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

What this does:

configureStore creates the Redux store.

counter is the name of this section of state.

counterReducer controls how the counter state changes.


Step 2: Create a Slice
----------------------

File:

src/features/counter/counterSlice.js

Code:
```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

What this does:

initialState sets the starting data.

createSlice creates:
- the slice name
- the initial state
- the reducer functions
- the actions

increment, decrement, and reset are actions.

counterSlice.reducer is exported so the store can use it.


Step 3: Give React Access to Redux
----------------------------------

File:

src/main.jsx

Original React setup may look like this:

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


Replace it with this:
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

What this does:

Provider makes the Redux store available to your entire React app.


Step 4: Use Redux in a Component
--------------------------------

File:

src/App.jsx

Code:
```jsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increase
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrease
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

What is happening?
------------------

const count = useSelector((state) => state.counter.count);

This reads the count value from the Redux store.


const dispatch = useDispatch();

This gives the component access to the dispatch function.


dispatch(increment());

This sends the increment action to Redux.


Redux updates the store.

Then React automatically updates the screen.

Redux Counter Flow
------------------

User clicks Increase
        ↓
dispatch(increment())
        ↓
Redux runs the increment reducer
        ↓
state.count increases by 1
        ↓
Component re-renders
        ↓
New count appears on the screen


Redux With Login Example
------------------------

A common use for Redux is storing logged-in user information.

Example slice:

src/features/user/userSlice.js

Code:
```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

Example usage in a component:
```jsx
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";

function LoginStatus() {
  const username = useSelector((state) => state.user.username);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Welcome, {username}</h2>
          <button onClick={() => dispatch(logout())}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => dispatch(login("Jaden"))}>
          Login
        </button>
      )}
    </div>
  );
}

export default LoginStatus;
```

Important Note About action.payload
-----------------------------------

action.payload is the data sent with an action.

Example:

dispatch(login("Jaden"));

The value "Jaden" becomes action.payload.

So this:

state.username = action.payload;

becomes this:

state.username = "Jaden";


Redux and Axios
---------------

Redux and Axios are different tools.

Axios gets data from a backend.

Redux stores shared data for the app.

Example flow:

Axios gets user data from backend
        ↓
Redux stores the user data
        ↓
Any component can access the user data


Example:

const response = await axios.get("http://localhost:5000/api/user");

dispatch(login(response.data.username));


Axios vs Redux
--------------

Axios:
Used to send HTTP requests.

Examples:

axios.get(...)
axios.post(...)
axios.put(...)
axios.delete(...)


Redux:
Used to store application-level state.

Examples:

logged-in user
cart items
theme setting
notifications


You can use Axios without Redux.
You can use Redux without Axios.
But many real apps use both together.


When Should You Use Redux?
--------------------------

Use Redux when:

- Many components need the same data
- Passing props becomes messy
- You need global app state
- You have login/authentication data
- You have a shopping cart
- You need predictable state updates


When You May Not Need Redux
---------------------------

You may not need Redux if:

- Only one component needs the data
- useState is enough
- The app is very small
- You are only tracking simple UI changes

Example where useState is enough:
```jsx
const [showMenu, setShowMenu] = useState(false);
```
This probably does not need Redux because it only controls one menu.


Common Redux Hooks
------------------

useSelector
-----------

Reads data from the Redux store.

Example:
```jsx
const count = useSelector((state) => state.counter.count);
```

useDispatch
-----------

Sends actions to Redux.

Example:
```jsx
const dispatch = useDispatch();

dispatch(increment());
```

Common Redux Files
------------------

store.js
--------

Creates the main Redux store.


counterSlice.js
---------------

Creates the counter state and counter actions.


userSlice.js
------------

Creates user login/logout state.


cartSlice.js
------------

Creates shopping cart state.


Provider
--------

Wraps your React app and gives all components access to Redux.


Summary
-------

Redux is used for application-level state.

Redux helps when many components need the same data.

Redux stores shared data in one central store.

React components use useSelector to read from Redux.

React components use useDispatch to update Redux.

Axios gets data from a backend.

Redux stores data inside your frontend app.

Redux is not always needed, but it is useful for larger apps with shared state.
```
