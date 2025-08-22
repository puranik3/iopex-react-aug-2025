# Vite + React Quickstart

A fast, modern way to bootstrap a React app with Vite. This guide shows JavaScript and TypeScript variants, adds ESLint + Prettier, React Router, Tailwind CSS, and testing with Vitest + Testing Library.

---

## Prereqs
- Node.js **>= 18** (LTS recommended). Check: `node -v`
- A package manager: `npm` (bundled), or `pnpm`/`yarn`

> I’ll use `npm` in commands. Replace with `pnpm`/`yarn` equivalents as noted.

---

## 1) Create the app

**With SWC (faster) + TypeScript (recommended):**
```bash
npm create vite@latest my-app -- --template react-swc-ts
cd my-app
npm install
```

**Other templates (choose one):**
- `react` (JS + Babel): `--template react`
- `react-ts` (TS + Babel): `--template react-ts`
- `react-swc` (JS + SWC): `--template react-swc`

**Package manager equivalents**
```bash
# pnpm
pnpm create vite my-app --template react-swc-ts
cd my-app && pnpm install

# yarn (classic)
yarn create vite my-app --template react-swc-ts
cd my-app && yarn
```

Run dev server:
```bash
npm run dev
```
Open the shown URL (usually `http://localhost:5173`).

---

## 2) Project structure (fresh Vite + React)
```
my-app/
├─ index.html
├─ package.json
├─ vite.config.ts            # or .js
├─ tsconfig.json             # TS templates only
├─ src/
│  ├─ main.tsx               # entry
│  ├─ App.tsx
│  ├─ assets/                # images
│  └─ index.css
└─ public/                   # static files (served at /)
```

---

## 3) ESLint + Prettier
Most Vite templates ship with a basic ESLint config. To add Prettier and a solid baseline:

```bash
npm i -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @types/eslint__js
```

Create/update **eslint.config.js** (flat config):
```js
// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["dist/**"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } },
  },
];
```

Add **.prettierrc**:
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Add scripts in **package.json**:
```jsonc
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Run:
```bash
npm run lint
npm run format
```

---

## 4) React Router (v6+/data routers)
```bash
npm i react-router-dom
```
Update **src/main.tsx**:
```tsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <div>About</div> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
```
Create a link in **App.tsx**:
```tsx
import { Link } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>Hello Vite + React</h1>
      <p><Link to="/about">About</Link></p>
    </div>
  );
}
```

---

## 5) Tailwind CSS (optional but popular)
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configure **tailwind.config.js**:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
Add to **src/index.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Use classes:
```tsx
export default function App() {
  return <h1 className="text-2xl font-bold p-4">Hello Tailwind</h1>;
}
```

---

## 6) Testing with Vitest + Testing Library
```bash
npm i -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```
Add **vitest.config.ts**:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts"
  },
});
```
Create **src/test/setup.ts**:
```ts
import "@testing-library/jest-dom";
```
Example test **src/App.test.tsx**:
```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  expect(screen.getByText(/Hello/i)).toBeInTheDocument();
});
```
Scripts (package.json):
```jsonc
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## 7) Environment variables
- Put **client-exposed** envs in `.env` prefixed with `VITE_`:
  ```env
  VITE_API_BASE_URL=https://api.example.com
  ```
- Read in code:
  ```ts
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  ```

Vite loads `.env`, `.env.local`, `.env.[mode]` etc.

---

## 8) Build & preview
```bash
npm run build      # creates dist/
npm run preview    # serves built files locally
```

Deploy the `dist/` directory to any static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.). For client-side routing on static hosts, ensure a SPA fallback (e.g., rewrite all to `/index.html`).

---

## 9) Aliases & quality-of-life

**Path alias** (e.g., `@/components`):
- `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": { "@/*": ["src/*"] }
    }
  }
  ```
- `vite.config.ts`:
  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "node:path";

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") }
    }
  });
  ```

**SVG as React components** (optional):
```bash
npm i -D vite-plugin-svgr
```
```ts
// vite.config.ts
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [react(), svgr()],
});
```

---

## 10) Common troubleshooting

- **Blank page on refresh with routes**: configure host rewrites (SPA fallback) on your static host.
- **CORS when calling APIs**: use a dev proxy.
  ```ts
  // vite.config.ts
  export default defineConfig({
    server: {
      proxy: {
        "/api": { target: "http://localhost:3000", changeOrigin: true }
      }
    }
  });
  ```
- **TypeScript path not found**: align `tsconfig.json` paths with `vite.config.ts` aliases.
- **Slow HMR**: prefer SWC template (`react-swc` / `react-swc-ts`).

---

## 11) Migrating from Create React App (CRA)
- Replace `react-scripts` with Vite scripts: `"dev"`, `"build"`, `"preview"`.
- Move `public/` assets (favicon, images) as-is; keep `index.html` at root.
- Convert env vars to `VITE_*` prefix.
- If using Jest, either keep it or switch to Vitest (tests are largely compatible).

---

## 12) Useful scripts (package.json)
```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```