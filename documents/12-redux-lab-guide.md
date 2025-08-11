# Step-by-Step Guide to Using Redux for State Management

## Introduction
Redux is a predictable state container for JavaScript applications. It helps manage application state in a centralized way, making it easier to debug and test.

In this guide, we'll walk through a simple counter example using Redux without additional frameworks.

## Step 1: Setting Up the Project
To get started, create an HTML file with a basic setup:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Redux Counter</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.js"></script>
    </head>
    <body>
        <button id="btn-decrement"> - </button>
        <span id="value">0</span>
        <button id="btn-increment"> + </button>
        <script src="app.js"></script>
    </body>
</html>
```

This file loads Redux and sets up buttons for incrementing and decrementing a counter.

## Step 2: Understanding Redux Concepts
Redux follows three core principles:
1. **Single Source of Truth:** The application state is stored in a single JavaScript object.
2. **State is Read-Only:** The only way to modify the state is by dispatching an action.
3. **Changes are Made with Pure Functions:** Reducers define how the state updates based on actions.

## Step 3: Defining Actions
Actions are plain JavaScript objects describing what should happen in the application.

```js
const INCREMENT = "counter/increment";
const DECREMENT = "counter/decrement";

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
```

Each action contains a `type` property that describes the intended change.

## Step 4: Creating the Reducer
Reducers specify how the application state changes in response to actions.

```js
const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { ...state, value: state.value + 1 };
        case DECREMENT:
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
};
```

Reducers must:
- Be **pure functions** (no side effects, always return the same output for the same input).
- Make **immutable updates** (never modify the existing state object directly).

## Step 5: Creating the Store
The Redux store holds the state and provides methods to update and access it.

```js
const store = Redux.createStore(counterReducer);
```

## Step 6: Updating the UI with State Changes
To reflect state changes in the UI, we use the `store.subscribe` method:

```js
const render = () => {
    document.getElementById("value").innerText = store.getState().value;
};

store.subscribe(render);
render();
```

## Step 7: Dispatching Actions
Now, connect the buttons to dispatch actions when clicked:

```js
document.getElementById("btn-increment").onclick = () => store.dispatch(increment());
document.getElementById("btn-decrement").onclick = () => store.dispatch(decrement());
```

## Step 8: Setting Up Middleware
Middleware in Redux intercepts actions before they reach the reducer, allowing for logging, analytics, or asynchronous processing.

A simple **logger middleware** logs actions and state changes:

```js
const logger = (store) => (next) => (action) => {
    console.log("Before Action:", action, store.getState()); // Current state
    next(action); // Pass action to next middleware or reducer
    console.log("After Action:", action, store.getState()); // Updated state
};

// Create the Redux store with middleware
const store = Redux.createStore(
    counterReducer,
    Redux.applyMiddleware(logger)
);
```

This middleware logs every action dispatched along with the state before and after the action is processed. 

## Conclusion
Congratulations! You've built a simple counter using Redux. This example demonstrates:
- Defining actions
- Creating a reducer
- Managing state with a Redux store
- Updating the UI in response to state changes
- Using middleware for logging

From here, you can expand by integrating Redux with React or handling asynchronous actions with middleware like Redux Thunk.

---
### Next Steps
- Try adding a reset button.
- Implement Redux in a React app.
- Explore Redux Toolkit for a more concise API.

---

# Step-by-Step Guide: Managing Theme and Fetching Workshops with Redux Toolkit

## Introduction
This guide walks through setting up Redux Toolkit to manage the application's theme (`light` or `dark`) and fetching workshops from a backend API using Redux state management.

---
## Step 1: Install Dependencies
Ensure you have Redux, React Redux and Redux Toolkit installed:

```sh
npm install redux react-redux @reduxjs/toolkit
```

---
## Step 2: Create the Theme Slice
The theme slice manages the application's theme state.

**File: `src/features/themeSlice.ts`**

```ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Theme = "light" | "dark";

interface ThemeState {
    value: Theme;
}

const initialState: ThemeState = {
    value: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(curState) {
            curState.value = curState.value === "light" ? "dark" : "light";
        },
    },
});

export const themeSelector = (state: RootState) => state.theme.value;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

---
## Step 3: Configure the Redux Store

**File: `src/store.ts`**

```ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./features/themeSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
```

---
## Step 4: Wrap the App with the Redux Provider
Ensure the app can access Redux state.

**File: `src/main.tsx` (or `index.tsx`)**

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

---
## Step 5: Dispatch the `toggleTheme` Action
In any component, dispatch `toggleTheme` to change themes.

**File: `src/components/common/Menu/Menu.tsx`**

```tsx
import { useAppDispatch } from "../../../store";
import { toggleTheme } from "../../../features/themeSlice";
```
```tsx
const dispatch = useAppDispatch();
```
```tsx
<NavDropdown.Item href="#" onClick={() => dispatch(toggleTheme())}>
    Change Theme
</NavDropdown.Item>
```

This will trigger the `toggleTheme` reducer, updating the Redux store.

---
## Step 6: Fetching Workshops with Redux

### 6.1 Create the `workshopsList` Slice

**File: `src/features/workshopsListSlice.ts`**

```ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getWorkshops } from "../services/workshops";
import IWorkshop from "../models/IWorkshop";

interface WorkshopsListState {
    workshops: IWorkshop[];
    loading: boolean;
    error: Error | undefined | null;
}

const initialState: WorkshopsListState = {
    workshops: [],
    loading: false,
    error: null,
};

interface GetWorkshopsArgs {
    page: number;
    category: string;
}

const workshopsListSlice = createSlice({
    name: "workshopsList",
    initialState,
    reducers: {
        fetchWorkshopsPending(state) {
            state.loading = true;
            state.error = null;
        },
        fetchWorkshopsSuccess(state, action: PayloadAction<IWorkshop[]>) {
            state.loading = false;
            state.workshops = action.payload;
        },
        fetchWorkshopsFailure(state, action: PayloadAction<Error | undefined | null>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetWorkshopsList(state) {
            state.workshops = [];
            state.error = null;
            state.loading = false;
        },
    },
});

export const workshopsListSelector = (state: RootState) => state.workshopsList;
export const { fetchWorkshopsPending, fetchWorkshopsSuccess, fetchWorkshopsFailure, resetWorkshopsList } = workshopsListSlice.actions;
export default workshopsListSlice.reducer;
```

---
## Step 7: Add the Workshops Reducer to the Store

**File: `src/store.ts`**

```ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./features/themeSlice";
import workshopsListReducer from "./features/workshopsListSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        workshopsList: workshopsListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
```

---
## Step 8: Use Redux to Fetch Workshops in a Component

**File: `src/components/workshops/WorkshopsList/WorkshopsList.tsx`**

```tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchWorkshopsPending, fetchWorkshopsSuccess, fetchWorkshopsFailure, workshopsListSelector } from "../../../features/workshopsListSlice";
```
```tsx
const dispatch = useAppDispatch();
const { workshops, loading, error } = useAppSelector(workshopsListSelector);

useEffect(() => {
    dispatch(fetchWorkshopsPending());
    getWorkshops(page, category)
        .then((data) => dispatch(fetchWorkshopsSuccess(data)))
        .catch((err) => dispatch(fetchWorkshopsFailure(err)));
}, [page, category, dispatch]);
```

---
## Step 9: Creating a thunk to handle the side-effect of fetching workshops after the first render

### Step 9.1: Create the `getWorkshopsThunk` thunk

**File: `src/features/workshopsListSlice.ts`**

```ts
interface WorkshopsListState {
    workshops: IWorkshop[];
    loading: boolean;
    error: Error | undefined | null;
}
```
```ts
interface GetWorkshopsArgs {
    page: number;
    category: string;
}

export const getWorkshopsThunk = createAsyncThunk<IWorkshop[], GetWorkshopsArgs, { rejectValue: Error }>(
    "workshopsList/getWorkshops",
    async ({ page, category }, thunkAPI) => {
        try {
            const data = await getWorkshops(page, category);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Error);
        }
    }
);

const workshopsListSlice = createSlice({
    name: "workshopsList",
    initialState,
    reducers: {
        resetWorkshopsList(state) {
            state.workshops = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkshopsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWorkshopsThunk.fulfilled, (state, action: PayloadAction<IWorkshop[]>) => {
                state.loading = false;
                state.workshops = action.payload;
            })
            .addCase(getWorkshopsThunk.rejected, (state, action: PayloadAction<Error | undefined | null>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
```

---
## Step 10: Use the thunk to Fetch Workshops

**File: `src/components/workshops/WorkshopsList/WorkshopsList.tsx`**

```tsx
import { getWorkshopsThunk, workshopsListSelector } from "../../../features/workshopsListSlice";
```
```tsx
    useEffect(() => {
        dispatch(getWorkshopsThunk({ page, category }) as any);
    }, [page, category, dispatch]);
};
```

---
## Conclusion
You have now integrated Redux Toolkit for theme management and fetching workshops efficiently! 🚀




















