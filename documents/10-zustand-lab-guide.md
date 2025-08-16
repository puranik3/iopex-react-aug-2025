## Zustand Tutorial for React Applications

Zustand is a lightweight, modern state management library for React. It simplifies global state management with minimal boilerplate.

### Step 1: Setup

Install Zustand using npm or yarn:

```bash
npm install zustand
# or
yarn add zustand
```

### Step 2: Creating a Store

Create a new file `src/store.js`:

```ts
import { create } from "zustand";

type Theme = "light" | "dark";

interface StoreState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    theme: Theme;
    toggleTheme: () => void;
}

const useStore = create<StoreState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    theme: "light",
    toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

export default useStore;
```

### Step 3: Using the Store in Components

Create a component, `Counter.jsx`:

```tsx
import React from 'react';
import useStore from './store';

const Counter = () => {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```
- In `src/components/common/Menu/Menu.tsx`
```tsx
import useStore from '../../../store';
```
```tsx
const { theme, toggleTheme } = useStore();
```

### Step 4: Integrate Component into App

In your main `App.jsx`:

```jsx
import React from 'react';
import Counter from './Counter';

const App = () => {
  return (
    <div>
      <h1>Zustand Example</h1>
      <Counter />
    </div>
  );
};

export default App;
```

### Step 5: Advanced Usage - Selective State

Zustand allows selecting parts of the state efficiently:

```tsx
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```
```tsx
const theme = useStore( state => state.theme );
const toggleTheme = useStore( state => state.toggleTheme );
```

This helps optimize re-rendering of components.

### Benefits of Zustand:
- Simple, minimalistic API
- Easy to learn and implement
- Efficient re-rendering with selective state subscription
- No need for context providers or boilerplate code


---

## 🎯 **Selective Subscription (Re-renders only on specific changes)**

Use the **selector function** pattern:

### Example 1: Subscribing only to `count`

```jsx
import React from 'react';
import useStore from './store';

const Counter = () => {
  const count = useStore((state) => state.count); // subscribes ONLY to count
  const increment = useStore((state) => state.increment);

  console.log('Counter re-rendered');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

- Here, the component **only** re-renders when `count` changes.
- Changing `name` won't re-render the Counter component.

---

__NOTE__: If you select multiple properties, using **shallow comparison** is recommended. Explore it.

--

## Advanced features

Here are other important and powerful features of **Zustand**, clearly explained with practical examples:

---

## 🚩 **1. Async Actions**

Zustand simplifies asynchronous logic handling.

### Example:

```jsx
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  loading: false,

  fetchUser: async (userId) => {
    set({ loading: true });
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const user = await response.json();
    set({ user, loading: false });
  },
}));
```

**Using Async Actions:**

```jsx
const UserProfile = () => {
  const { user, loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(1);
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
};
```

---

## 🚩 **2. Middleware (e.g., Persisting State)**

Zustand supports middleware easily—like persisting state using built-in middleware (`persist`).

### Example (Persisting state to localStorage):

```jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      login: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: 'auth-storage' } // stored under this name in localStorage
  )
);
```

The state will persist across browser refreshes.

---

## 🚩 **3. Combining Multiple Stores**

Zustand allows creating modular stores, which helps keep state clean and modularized.

### Example:

**authStore.js**
```jsx
export const useAuthStore = create((set) => ({
  token: null,
  login: (token) => set({ token }),
  logout: () => set({ token: null }),
}));
```

**themeStore.js**
```jsx
export const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
```

You can use multiple stores independently in your components:

```jsx
const Dashboard = () => {
  const token = useAuthStore((state) => state.token);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <p>Current token: {token}</p>
      <button onClick={toggleTheme}>Toggle Theme ({theme})</button>
    </>
  );
};
```

---

## 🚩 **4. State Composition & Sharing Logic**

You can share and reuse state logic across multiple stores through simple functions.

### Example (Shared Logic):

**sharedLogic.js**
```jsx
export const counterLogic = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
});
```

Now reuse this logic in different stores:

```jsx
import { create } from 'zustand';
import { counterLogic } from './sharedLogic';

export const useProductCounter = create((set) => ({
  ...counterLogic(set),
  products: [],
}));
```

```jsx
export const useCartCounter = create((set) => ({
  ...counterLogic(set),
  itemsInCart: [],
}));
```

---

## 🚩 **5. Computed Properties (Derived State)**

You can easily implement derived state or computed properties.

### Example:

```jsx
const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),

  // Computed property
  get totalItems() {
    return get().items.length;
  },
}));
```

**Using computed properties:**
```jsx
const Cart = () => {
  const { items, totalItems, addItem } = useCartStore();

  return (
    <div>
      <p>Total Items: {totalItems}</p>
      <button onClick={() => addItem({ id: Date.now(), name: 'Item' })}>
        Add Item
      </button>
    </div>
  );
};
```

---

## 🚩 **6. Subscribe and Unsubscribe to State Changes**

Zustand supports direct subscriptions to state changes, useful for imperative code or integrations.

### Example:

```jsx
const unsub = useStore.subscribe(
  (state) => state.count,
  (newCount, oldCount) => {
    console.log(`Count changed from ${oldCount} to ${newCount}`);
  }
);

// Later to unsubscribe:
unsub();
```

---

## 🚩 **7. Integration with React DevTools**

Zustand integrates smoothly with Redux or React DevTools through middleware.

### Example (Redux DevTools):

```jsx
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
})));
```

This allows you to track actions and state changes easily within Redux DevTools.

---

## 🚩 **Summary of Important Features**

| Feature                        | Description                                    |
|--------------------------------|------------------------------------------------|
| **Async Actions**              | Simple async logic handling in state           |
| **Middleware (persist)**       | Built-in persistence/local storage handling    |
| **Multiple Stores**            | Modular, composable state management           |
| **Computed (Derived) State**   | Easily derive state based on existing state    |
| **Direct Subscription**        | Subscribe/unsubscribe imperatively             |
| **DevTools Integration**       | Enhanced debugging with Redux DevTools         |

---

**Final Thought:**  
Zustand's strength lies in its simplicity, flexibility, and performance. These features make it highly suitable for modern React applications, enabling efficient state management without complexity or excessive boilerplate.