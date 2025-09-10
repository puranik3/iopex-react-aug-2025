# RTK Query: Basic Setup Example

This guide shows how to set up RTK Query inside Redux Toolkit to fetch and display posts.  
We’ll use [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as the sample API.

---

## 1) Install dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 2) Create an API slice

Define your API using `createApi`.  
Endpoints generate query hooks automatically.

```ts
// src/services/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

// Auto-generated React hooks
export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
```

---

## 3) Add API slice to the Redux store

```ts
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './services/postsApi';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// Types (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 4) Provide the store to React

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## 5) Use generated hooks in components

```tsx
// src/App.tsx
import React from 'react';
import { useGetPostsQuery, useGetPostByIdQuery } from './services/postsApi';

export default function App() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const { data: post } = useGetPostByIdQuery(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts?.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <h2>First Post</h2>
      <p>{post?.title}</p>
    </div>
  );
}
```

---

## 6) Quick wiring checklist

- Install `@reduxjs/toolkit` and `react-redux`.
- Define API slice with `createApi` and `fetchBaseQuery`.
- Add reducer + middleware to store.
- Wrap app with `<Provider>`.
- Use hooks (`useGetPostsQuery`, `useGetPostByIdQuery`) in your components.

That’s it — you now have fully managed fetching, caching, and loading/error states with just a few lines!

---

# RTK Query: Adding a Mutation (Create Post)

This builds on the basic RTK Query setup and shows how to add a `POST /posts` mutation, wire up cache invalidation, and (optionally) do an optimistic update.

---

## 1) Extend your API slice with a mutation

```ts
// src/services/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId?: number;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Posts'], // 👈 enable tags for cache invalidation
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
              // Provide a tag for the list
              { type: 'Posts', id: 'LIST' },
              // And individual post tags
              ...result.map((p) => ({ type: 'Posts' as const, id: p.id })),
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Posts', id }],
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      // When a new post is created, invalidate the list so it refetches
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
} = postsApi;
```

---

## 2) Use the mutation hook in a component

```tsx
// src/components/NewPostForm.tsx
import React, { useState } from 'react';
import { useCreatePostMutation } from '../services/postsApi';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createPost, { isLoading, isError, error, isSuccess, data }] =
    useCreatePostMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // unwrap() turns the returned thunk into a normal promise that
      // throws on error, which is handy for try/catch.
      await createPost({ title, body, userId: 1 }).unwrap();
      setTitle('');
      setBody('');
    } catch (err) {
      console.error('Create failed:', err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Create Post</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving…' : 'Save'}
      </button>

      {isSuccess && <p>Created! New ID: {data?.id}</p>}
      {isError && <p>Failed: {String((error as any)?.status || error)}</p>}
    </form>
  );
}
```

> Because we set `invalidatesTags: [{ type: 'Posts', id: 'LIST' }]` on the mutation, any component using `useGetPostsQuery()` will automatically refetch after creation.

---

## 3) (Optional) Optimistic update for a snappy UX

If your backend is reliable and you want instant UI feedback, optimistically add the new item to the cache and roll back if the request fails:

```ts
// src/services/postsApi.ts (only the mutation part changed)
createPost: builder.mutation<Post, Partial<Post>>({
  query: (body) => ({
    url: 'posts',
    method: 'POST',
    body,
  }),
  async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
    // Optimistically update the posts list
    const patch = postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
      draft.unshift({ id: Math.random(), ...newPost });
    });

    const undo = dispatch(patch);
    try {
      await queryFulfilled; // if success, keep change
    } catch {
      undo.undo(); // if error, roll back
    }
  },
  // You can skip invalidation if you keep the optimistic item,
  // or still invalidate to reconcile with server state:
  invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
}),
```

---

## 4) Quick wiring checklist

- Add `tagTypes` and `providesTags`/`invalidatesTags` in your API slice.
- Export and use `useCreatePostMutation()` in your component.
- Use `unwrap()` to handle success/error with `try/catch`.
- Consider `onQueryStarted` + `updateQueryData` for optimistic UX.

That’s it — you now have a clean create flow with auto‑cache handling!