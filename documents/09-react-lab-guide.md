# Building the Workshops App using React
- __Documentation__: https://react.dev/
- __Production backend__: https://workshops-server.onrender.com/
- __Development backend__: In `workshops-server` folder. To launch the local development server, execute the following in a new terminal. It launches on http://localhost:8001/workshops
```
cd workshops-server
npm i
npm start
```
- Completed frontend app can be run from the `workshops-app-completed` folder

## Before getting started
- You will need Node `>= 14` in order to run a React application created using [`create-react-app`](https://create-react-app.dev/). Install a compatible version of Node if you don't have one.

```
node --version
node -v
```
- Also, install __React Food Truck__ (by _Burke Holland_) which is a collection of VS Code extensions for React application development.

- __References__:

1. https://nodejs.org/en

## Step 1: Create the React app and run it

- Follow the steps on the [`create-react-app`](https://create-react-app.dev/) site in order to scaffold a React application. Since we would like a template with TypeScript (and TS compilation set up), we use that option. Create the React app from the folder of your choice.

```
npx create-react-app workshops-app --template typescript
```

- The project creation fails as React Testing Library that is installed along, requires React 18 (and not the latest React 19). We shall work with React 18. In order to do this, delete `node_modules`, and `package-lock.json` and makes these changes to `package.json`.

```json
"dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "web-vitals": "^2.1.4"
},
"devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^22.13.1",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "cra-template-typescript": "1.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
},
```
- Also create the missing `tsconfig.json` in the project folder
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```
- __Reference__: https://stackoverflow.com/questions/71835697/create-react-app-dependency-version-issues-with-react-18
- Change directory to the created project directory and try installing the dependencies once again. It should succeed.
```
cd workshops-app
npm i
```
- Run the app
```
npm start
```
- It is better to open the app (usually running at `http://localhost:3000/`) in Chrome.
- __Reference__: https://create-react-app.dev/

## Step 2: Understand the project structure and basics of data binding
- Understand the purpose of each and every file in the project (starting from `package.json`), the organization of application code, the build process (that uses Webpack / Vite), and what happens when the React app launches in the browser.
- Make some changes in `src/App.tsx` and observe the changes reflected in the browser (this feature of Webpack is called _hot module replacement_, and it happens without the browser window refresh).
```tsx
import { useState } from "react";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            {/* Exercise */}
            <span>You have clicked this button <span>{/* show the count of times the button is clicked */}</span> times</span>
        </>
    );
}

export default App;
```
- __EXERCISE__: Introduce a data member to keep track of how many times the button is clicked, and display this in the span above.
- Styles can be defined in `src/App.scss`. But before that you need to install the Sass compiler.
```
npm i -D sass
```
- `App.scss` (rename `App.css` as `App.scss`)
```scss
h1 {
    color: crimson;
}
```
- Include it in `App.tsx`
```tsx
import './App.scss';
```

## Step 3: Install React Bootstrap
- __Reference__: https://react-bootstrap.netlify.app/docs/getting-started/introduction
Install React Bootstrap
```
npm install react-bootstrap bootstrap
```
- Include Bootstrap SCSS in `src/index.tsx`
```tsx
/* Importing Bootstrap SCSS file. */
import "bootstrap/scss/bootstrap.scss";

import "./index.css";
```
- Let's use the `Alert` component from React Bootstrap in order to check if the installations completed without issues. In `src/App.tsx`,
```tsx
import { useState } from "react";
import { Alert } from "react-bootstrap";

import "./App.scss";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
}

export default App;
```

## Step 4: Add a simple navigation menu for the app
- `src/components/common/Menu/Menu.tsx`
- __Tip__: Create the component skeleton by typing __sfc__ (and hitting the __Enter__ key)
```ts
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand href="/">Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#">List of workshops</Nav.Link>
                        <Nav.Link href="#">Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
```
- Since all our pages are to have the menu on top, the `App` component is a convenient place to include it. This avoids the need to include it in every page component individually.
- `src/App.tsx`
```tsx
import Menu from "./components/common/Menu/Menu";
```
```ts
return (
    <>
        <Menu />
        
        {/* existing UI... */}
    </>
);
```

## Step 5: Add a Home component
- `src/components/Home/Home.tsx`. We move the page's content (everything below the menu) to this component.
```tsx
import { useState } from "react";

const Home = () => {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
};

export default Home;
```
- Include the component in the app. In `src/App.tsx`. Note that we have moved the alert to the very top of the page.
```ts
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";

import Menu from "./components/common/Menu/Menu";
import Home from "./components/Home/Home";

import "./App.scss";

function App() {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Home />
            </Container>
        </>
    );
}

export default App;
```
- In `App.scss` we add the following
```scss
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Now that we have understood data-binding, event handling basics, and made structural changes to move the home page contents to the home component, let's put in actual content for home in `src/components/Home/Home.tsx` (only the rendered UI is shown below). You can remove the state and event handlers completely.
```html
<h1>Workshops App</h1>

<hr />

<section>
  <p>Welcome to Workshops App</p>
  <p>
    The app serves details of (fictitious) technical workshops happening in
    various cities. Every workshop has a broad topic (eg. JavaScript), and a
    workshop has many sessions (each session covers a sub-topic, eg. Closures in
    JavaScript).
  </p>
  <p>
    You can view a list of workshops, details of every workshop, add a workshop,
    view the list of sessions in a workshop, and also add a new session for a
    workshop.
  </p>
</section>
```
- __Exercise__: Just the way we have created a separate component for `Home`, create one for the alert message and include it in the `App` component.

## Step 6: Set up more pages and routing
- The most popular routing library for React apps is [__React router__](https://reactrouter.com/home). Its latest version if v7 which is compatible with v6. v5 and v6 are significantly different however. Starting v7, React router can be used as a React framework to build react apps, or as a library for routing with an existing React app. We use it as a library here.
- Install React router
```
npm i react-router react-router-dom
```
- Start by wrapping the application UI in a `BrowserRouter` within `src/index.tsx`
```tsx
import { BrowserRouter } from "react-router";
```
```tsx
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```
- It is a common practice to create a folder with page-level components (components that represent pages in the app). The folder structure for this would mirror the routing structure for the app. This is a convention popularized by Next JS (a framework for building apps that use React). The `HomePage` component can extract routing parameters (path parameters, query string parameters) etc. and pass it to the `Home` component if needed.  In `src/pages/home/index.tsx`
```tsx
import Home from "../../components/Home/Home";

const HomePage = () => {
    return <Home />;
};

export default HomePage;
```
- Add a route for the Home page in `src/App.tsx`. Redirection options can be utilized if needed on routes. An example is shown below as an illustration. Both `http://localhost:3000/` and `http://localhost:3000/home` will take the user to the home page (with the canonical path being `http://localhost:3000/`).
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/home" element={<Navigate to ="/" />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
</Container>
```
- You will now be able to navigate to the home page by clicking on the app name or home link in the menu. Other links will not work at the moment.
- Create the following components. Set each one up to have a very basic UI. Note that the folders within which they have to be created are also mentioned. Create the page-level components for these as per the routes mentioned (verify if the folder structure is correct with the instructor).
```
src/workshops/WorkshopsList/WorkshopsList.tsx - path is `/workshops`
src/workshops/AddWorkshop/AddWorkshop.tsx - path is `/workshops/add`
src/workshops/Favorites/Favorites.tsx - path is `/workshops/favorites`
```
- Set up routes for the new components in `src/App.tsx`.
```tsx
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/workshops" element={<WorkshopsListPage />} />
        <Route
            path="/workshops/add"
            element={<AddWorkshopPage />}
        />
        <Route
            path="/workshops/favorites"
            element={<FavoritesPage />}
        />
    </Routes>
</Container>
```
- Add their links in `src/components/common/Menu/Menu.tsx`
```tsx
<Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Nav.Link href="/home">
            Home
        </Nav.Link>
        <Nav.Link href="/workshops">
            List of workshops
        </Nav.Link>
        <Nav.Link href="/workshops/add">
            Add a workshop
        </Nav.Link>
    </Nav>
    <NavDropdown title="Personalize" id="basic-nav-dropdown">
        <NavDropdown.Item href="/workshops/favorites">
            Favorites
        </NavDropdown.Item>
        <NavDropdown.Item href="#">
            Change Theme
        </NavDropdown.Item>
    </NavDropdown>
</Navbar.Collapse>
```
- You should be able to navigate to all the pages
- Layout routes were introduced in React Router v6. This feature allows us to define a shared layout that wraps multiple child routes, making it easier to structure applications. A layout route is a parent `<Route>` that renders a common layout component (like a navbar, sidebar, or footer) while dynamically switching its child routes inside it using `<Outlet />`. Create a layout route in `src/pages/layout.tsx`
```tsx
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Menu from "../components/common/Menu/Menu";

import "./layout.scss";

const Layout = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
```
- Create `src/pages/layout.scss`. Remove these styles from `App.scss` and add to this new page.
```tsx
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Update `src/App.tsx`
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";

import HomePage from "./pages/home";
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";

import "./App.scss";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/workshops" element={<WorkshopsListPage />} />
                <Route path="/workshops/add" element={<AddWorkshopPage />} />
                <Route
                    path="/workshops/favorites"
                    element={<FavoritesPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
```
- The component will now be selected based on the route (browser location), and rendered within `<Outlet />`. Navigate using the menu and check it still works fine. Change it manually in the address bar, and the page that is loaded should change based on the routes configured. 

## Step 7: Update the menu to route to the pages without page refresh, and highlight the active route
- In `src/components/common/Menu/Menu.tsx` use `Link` instead of the usual anchor tag (`a`). `Link` defines the `to` prop instead of `href`. In order for Bootstrap components to make use of the `Link` component under-the-hood, we need to use the `as` prop defined on these Bootstrap components.
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops"
                        >
                            List of workshops
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops/add"
                        >
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/workshops/favorites">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- You should now be able to navigate without page refreshes, using the menu. Also keeo the network tab open to confirm there are no network requests. We now have a true Single Page Application (SPA)!
- It is common practice to highlight the active link (in top-level navigation menus, sidebars menus, breadcrumbs etc.). This is achieved using `NavLink` in place of `Link`. Make the following changes in `app/components/common/Menu/Menu.tsx`
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink } from "react-router-dom";

import "./Menu.scss";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops">
                            List of workshops
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops/add">
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            as={NavLink}
                            to="/workshops/favorites"
                        >
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- Customize the `active` class that is defined in Bootstrap. In `src/components/common/Menu/Menu.scss`,
```scss
// make sure the selector specificity is at least as much as Bootstrap's selector for the element - you can use the SAME selector that Bootstrap uses.
.navbar-nav .nav-link.active,
a.active {
    color: crimson;
}
```
- You can now navigate the pages using the menu, and see the active page link being highlighted. However, the _List of workshops_ link is highlighted when you go to the 'Add workshop' link as `/workshops` is a prefix for `/workshops/add`, and `NavLink` adds active to even links that are a prefix of the current location. To overcome this add the `end` prop to the _List of workshops_ link - this enforces a full path match instead of a prefix match. In `app/components/common/Menu/Menu.tsx`
```tsx
<Nav.Link as={NavLink} to="/workshops" end>
    List of workshops
</Nav.Link>
```
- __Note__: If you want to customize the active class (applying a class with some other name), or apply the class based on more conditions (than just simple matching), you can pass a function to the `className` prop of `NavLink`. However, this does not work with Bootstrap `Nav.Link`. You can create a custom `NavLink` and use it instead. One implementation is given below.
```tsx
import { NavLink, NavLinkProps } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

// Define TypeScript types for props
interface CustomNavLinkProps extends NavLinkProps {
    to: string; // Ensures 'to' prop is always a string
    children: React.ReactNode; // Ensures 'children' is valid JSX
}

// Custom component to handle className correctly
const CustomNavLink = ({ to, children, ...props }: CustomNavLinkProps) => (
    <NavLink
        to={to}
        {...props}
        className={({ isActive }) =>
            isActive ? "nav-link custom-active" : "nav-link"
        }
    >
        {children}
    </NavLink>
);

export default CustomNavLink;
```

## Step 8: Add a "page not found" page
- In `src/pages/not-found.tsx`
```tsx
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page Not Found!</h1>
            <p className="display-6">
                The page you are looking for does not exist. You can try going <Link to="">Home</Link>, or check the <Link to="/workshops">list of workshops</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
```
- Add a catch-all route __as the last route__ in `src/App.tsx`
```tsx
import NotFoundPage from "./pages/not-found";
```
```tsx
<Route element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" />} />
    <Route path="/workshops" element={<WorkshopsListPage />} />
    <Route path="/workshops/add" element={<AddWorkshopPage />} />
    <Route
        path="/workshops/favorites"
        element={<FavoritesPage />}
    />

    {/* Add this route */}
    <Route path="*" element={<NotFoundPage />} />
</Route>
```
- Try navigating to non-existent routes like `xyz` or `workshops/xyz` (by typing the path in the address bar). You should find the not found page appear.

## Step 9: Fetch a list of workshops (hard-coded) using a service and use it to display the list of workshops
- First define the models to represent the data the service shall fetch and give to consumers. Create `src/models/IWorkshop.ts`. While it is not necessary to create ILocation and IModes as separate interfaces, it can help when we want to represent those nested objects. Again the choice between interface and type to define the model is upto you. We use interfaces here.
```ts
interface ILocation {
    address: string;
    city: string;
    state: string;
}

interface IModes {
    inPerson: boolean;
    online: boolean;
}

interface IWorkshop {
    name: string;
    category: string;
    id: number;
    description: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    time: string;
    location: ILocation;
    modes: IModes;
    imageUrl: string;
}

export type {
    ILocation,
    IModes,
    IWorkshop as default
};
```
- Define a service to fetch a list of workshops in 
- We hard-code the list now, but shall later fetch from the backend. In `src/services/workshops.ts`
```ts
import IWorkshop from '../models/IWorkshop';

const getWorkshops = () => {
    return [
      {
        name: 'Angular JS Bootcamp',
        category: 'frontend',
        id: 1,
        description:
          '<p><strong>AngularJS</strong> (also written as <strong>Angular.js</strong>) is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.</p><p>It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications. (This flexibility has led to the acronym MVW, which stands for "model-view-whatever" and may also encompass model–view–presenter and model–view–adapter.)</p>',
        startDate: '2019-01-01T04:00:00.000Z',
        endDate: '2019-01-03T08:00:00.000Z',
        time: '9:30 am - 1:30 pm',
        location: {
          address: 'Tata Elxsi, Prestige Shantiniketan',
          city: 'Bangalore',
          state: 'Karnataka',
        },
        modes: {
          inPerson: true,
          online: false,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png',
      },
      {
        name: 'React JS Masterclass',
        category: 'frontend',
        id: 2,
        description:
          '<p><strong>React</strong> (also known as <strong>React.js</strong> or <strong>ReactJS</strong>) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p><p>React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.</p>',
        startDate: '2019-01-14T04:30:00.000Z',
        endDate: '2019-01-16T12:30:00.000Z',
        time: '10:00 am - 6:00 pm',
        location: {
          address: 'Tata Elxsi, IT Park',
          city: 'Trivandrum',
          state: 'Kerala',
        },
        modes: {
          inPerson: true,
          online: true,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
      },
    ] as IWorkshop[];
}

export {
    getWorkshops
};
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
import { useEffect } from "react";
import { getWorkshops } from "../../../services/workshops";

const WorkshopsList = () => {
    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const workshops = getWorkshops();
            console.log(workshops);
        },
        // [ ] // empty array -> causes the effect to execute only AFTER first render
        []
    );

    return <div>WorkshopsList works!</div>;
};

export default WorkshopsList;
```
Check the console to verify if the workshops fetched from the service are displayed.
- __Notes__:
1. The workshops will be displayed twice. This is due to the component initializing twice when running in React Strict mode (a feature that React has to run better error checks and report them better in development). You can prevent it if needed by removing the wrapping `<React.StrictMode></React.StrictMode>` in `src/index.tsx`. This is not recommended however (just keep it intact).

## Step 10: Fetch actual workshops from the backend and provide it through a Promise
- You can use the native `fetch` API to get data from the backend. However a third-party library like `axios` provides more features for working with HTTP requests and is easier to work with. Install `axios`.
```
npm i axios
```
- Modify the function in `src/components/WorkshopsList/WorkshopsList.ts` in order to make a request to the backend, and return a Promise for the workshops (or an error). The actual call is made when a consumer (in our case the `WorkshopsList` component) calls this function and waits for the result. You can use the local development backend URL (`http://localhost:8001/workshops`) instead of the production URL if you wish.
```ts
import axios from 'axios';
import IWorkshop from '../models/IWorkshop';

const getWorkshops = async () => {
    // We get a "Promise" object from axios.get()
    // Initially the Promise is in the "pending". Then the Promise is "resolved" / "rejected".
    // NOTE: Explore then(), catch() methods of Promise
    const response = await axios.get(`https://workshops-server.onrender.com/workshops`);
    return response.data as IWorkshop[];
};

export {
    getWorkshops
};
```
- Update `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to consume the service
```tsx
import { useEffect, useState } from "react";
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from "../../../models/IWorkshop";

const WorkshopsList = () => {
    const [loading, setLoading] = useState(true);
    const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
    const [error, setError] = useState<Error | null>(null);

    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshops = await getWorkshops();
                    // console.log(workshops);
                    setWorkshops(workshops);
                    setLoading(false);
                } catch (error) {
                    // console.log(error);
                    setError(error as Error);
                    setLoading(false);
                }
            };

            helper();
        },
        []
    );
};

export default WorkshopsList;
```
- __Note__: The `helper` function is needed to overcome a technical problem when using `useEffect()`. `useEffect` can return nothing (`undefined`), or a cleanup function only (function type). Since an `async` function always returns a Promise, the effect function cannot be made `async` (in order to `await` on the call to `getWorkshops`). Hence the workaround with the `helper`.

## Step 11: Showing list of workshops and loading, error states
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router";
```
```tsx
return (
    <div>
        <h1>List of workshops</h1>
        <hr />
        <div>
            {/* What we generate by calling Array map() */}
            {/*
                {
                    [
                        <div key={workshops[0].id}>{workshops[0].name}</div>,
                        <div key={workshops[1].id}>{workshops[1].name}</div>,
                        <div key={workshops[2].id}>{workshops[2].name}</div>,
                        <div key={workshops[3].id}>{workshops[3].name}</div>,
                        ....
                    ]
                */
            }
            {
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            }
        </div>
    </div>
);
```
- __Notes__:
1. `key` is set to any value that is unique for every workshop, eg. id, name etc. It is needed to boost the performance of list rendering when new elements are added to / removed from the list (best practice). This is crucial for large lists.

- Add loading and error states to enhance user experience. In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
```
```tsx
return (
    <>
        <h1>List of workshops</h1>
        <hr />
        {
            /* if..else like behavior using ? : */
            loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>Completed loading</div>
            )
        }
        {
            /* if like behavior using && */
            loading === false && error !== null && (
                <Alert variant="danger">{error.message}</Alert>
            )
        }
        {
            loading === false && error === null && (
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            )
        }
    </>
);
```

## Step 12: Create utility components for showing loading and error states in the UI when fetching data from the backend
- Create `src/components/common/LoadingSpinner/LoadingSpinner.tsx`, `src/components/common/ErrorAlert`
- Move the code for the spinner from `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to `src/components/common/LoadingSpinner/LoadingSpinner.tsx`
```tsx
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return (
        <div className="text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, we import `LoadingSpinner`
```tsx
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
```
- Use this in place of the Bootstrap spinner
```tsx
{
    /* if..else like behavior using ? : */
    loading ? <LoadingSpinner /> : <div>Completed loading</div>
}
```
- Move the code for the error alert from `src/common/workshops/WorkshopsList/WorkshopsList.tsx` to `src/common/ErrorAlert/ErrorAlert.tsx`. For now, let's hard-code the error message as `Some error occured`.
```tsx
import { Alert } from "react-bootstrap";

const ErrorAlert = () => {
    return (
        <Alert variant="danger">
            Some error occured
        </Alert>
    );
};

export default ErrorAlert;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, import the error alert component
```tsx
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";
```
- Replace with an `ErrorAlert` component instance
```tsx
{
    /* if like behavior using && */
    loading === false && error !== null && (
        <ErrorAlert />
    )
}
```

## Step 13: Passing error object as input to error alert, theme variant as input to the spinner component, and showing it in the UI
- In the `src/components/common/ErrorAlert/ErrorAlert.tsx` add an `error` prop. As a good practice we check for null error object and display only if an error is actually passed.
```tsx
import { Alert } from "react-bootstrap";

interface Props {
    error: Error;
}

const ErrorAlert = ({ error }: Props) => {
    return error !== null ? (
        <Alert variant="danger">
            {error.message}
        </Alert>
    ) : null;
};

export default ErrorAlert;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx` pass the `error` object to `ErrorAlert`
```tsx
{
    /* if like behavior using && */
    loading === false && error !== null && (
        <ErrorAlert error={error} />
    )
}
```
- Let's theme the spinner. We will add an input parameter `variant` that takes one of the 8 Bootstrap themes as a string input. First define the theme values as a type in `src/models/utils.ts`
```ts
type Theme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'light'
  | 'dark';

export type { Theme };
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, pass in `variant` as an input attribute.
```tsx
{ loading ? <LoadingSpinner variant="success" /> : <div>Completed loading</div> }
```
- Accept it in `src/components/common/LoadingSpinner/LoadingSpinner.tsx` and apply the appropriate Bootstrap spinner class conditionally
```ts
import { Spinner } from "react-bootstrap";
import type { Theme } from '../../../models/utils';

interface Props {
    variant: Theme
}

const LoadingSpinner = ( { variant } : Props ) => {
    return (
        <div className="text-center">
            <Spinner animation="border" role="status" variant={variant}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;
```

## Step 14: Create component for workshops list item
- Create a component to show a workshop item in  `src/components/workshops/WorkshopsList/Item/Item.tsx`
```tsx
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, id, imageUrl, location }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {location.address}, {location.city}, {location.state}
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;
```
- Provide required styles in `src/components/workshops/WorkshopsList/Item/Item.scss`
```scss
.card-img-top-wrapper {
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    // nesting selectors in SCSS
    // in css this selector becomes -> .card-img-top-wrapper .card-img-top
    .card-img-top {
        width: 50%;
    }
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
}
```
- Import item in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
import Item from "./Item/Item";
```
- Render the item in the loop, and pass the workshop as an input to it. We also set a responsive layout for list of items using the Boostrap Grid system.
```tsx
{loading === false && error === null && (
    <Row xs={1} md={3} lg={4}>
        {workshops.map((workshop, idx) => (
            <Col className="my-3 d-flex" key={workshop.id}>
                <Item {...workshop} />
            </Col>
        ))}
    </Row>
)}
```

## Step 15: Formatting displayed content
- We can use `date-fns` library to format dates. Other popular alternatives are JavaScript's `Intl.DateTimeFormat` and `moment.js` (deprecated but popular library). You can even use `react-moment` that uses `moment.js` and provides a component to display formatted dates. We use `date-fns`.
```
npm i date-fns
```
- __Reference__: https://date-fns.org/
- Create a utility component to display dates. Add this in `src/components/common/FormattedDate/FormattedDate.tsx`
```tsx
// https://date-fns.org/
import { format } from "date-fns";

interface Props {
    date?: string | number | Date,
    dateFormat?: string
}

// "PPP" is a shorthand for a long, localized date format. It is equivalent to "do MMMM yyyy"
const FormattedDate = ({ date = new Date(), dateFormat = "PPP" } : Props) => {
  try {
    return <span>{format(new Date(date), dateFormat)}</span>;
  } catch (error) {
    return <span>Invalid date</span>;
  }
};

export default FormattedDate;
```
- In `src/components/workshops/WorkshopsList/Item/Item.tsx`
```tsx
import { Card, Button } from "react-bootstrap";

import FormattedDate from "../../../common/FormattedDate/FormattedDate";

import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, id, imageUrl, location, startDate, endDate }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text as="div">
                    <div>{location.address}, {location.city}, {location.state}</div>
                    <div>
                        <FormattedDate date={startDate} />
                        <span> - </span>
                        <FormattedDate date={endDate} />
                    </div>
                </Card.Text>
                <Button variant="primary">Know more</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;
```
- __EXERCISE__: Create a custom component for formatting location information. Use it to render the location information.

## Step 16: Add pagination for workshops list page
- Install `axios` for making calls to the backend (you can use the browser native `fetch` API, but `axios` is a very popular alternative due to its simpler syntax and wide variety of options)
```
npm i axios
```
- __Reference__: https://axios-http.com/
- Modify `src/services/workshops.ts` to support pagination (the backend takes an `_page` query string parameter)
```ts
import axios from "axios";
import IWorkshop from "../models/IWorkshop";

const getWorkshops = async (page: number = 1) => {
    // we get a "Promise" object from axios.get()
    // initially "pending" state of Promise
    // then the Promise goes to "resolved" / "rejected"
    // NOTE: Explore then(), catch() methods
    // Example: GET https://workshops-server.onrender.com/workshops?page=2
    const response = await axios.get<IWorkshop[]>(
        `https://workshops-server.onrender.com/workshops`,
        {
            params: {
                _page: page,
            },
        }
    );

    return response.data;
};
```
- Maintain `page` state in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
const [loading, setLoading] = useState(true);
const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
const [error, setError] = useState<Error | null>(null);

// Add this...
const [page, setPage] = useState(1);
```
- Also set up the function that change the `page` state
```tsx
const previous = (newPage: number) => {
    if (page <= 1) {
        return;
    }

    // when the new state depends on the current state, we use the function form of the setter
    setPage((p) => p - 1);
};

const next = (newPage: number) => {
    setPage((p) => p + 1);
};
```
- Set up the pagination UI
```tsx
<h1>List of workshops</h1>
<hr />
{/* Add this... */}
<div>
    <Button
        variant="primary"
        size="sm"
        disabled={
            !(loading === false && error === null) || page === 1
        }
        onClick={(event) => previous(page - 1)}
        className="me-2"
    >
        Previous
    </Button>
    <Button
        variant="primary"
        size="sm"
        disabled={!(loading === false && error === null)}
        onClick={() => next(page + 1)}
    >
        Next
    </Button>
    <div>You are viewing page {page}</div>
</div>
```
- Modify the call to `getWorkshops()` to pass the page number to the service's `getWorkshops()`. We use an effect that runs both on initial page load as well as when `page` changes.
```tsx
import { useEffect, useState } from 'react';
```
```tsx
const [page, setPage] = useState(1);

// Add this...
// side-effect -> eg. we want to fetch workshops data from the backend
useEffect(
    () => {
        const helper = async () => {
            setLoading(true);

            try {
                const workshops = await getWorkshops(page);
                // console.log(workshops);
                setWorkshops(workshops);
                setLoading(false);
            } catch (error) {
                // console.log(error);
                setError(error as Error);
                setLoading(false);
            }
        };

        helper();
    },
    // [ ] // empty array -> causes the effect to execute only AFTER first render
    [page] // execute AFTER first render + whenever page change
);
```

## Step 17: Creating and using a pagination component, communication from child to parent using a callback prop (function passed as a prop)
- It makes sense to create a utility component for pagination. That would make it reusable.
- Set up the the `Pagination` component in `src/components/common/Pagination/Pagination.tsx`
```tsx
import { Button } from "react-bootstrap";

interface Props {
    page?: number,
    onPrevious?: (newPage: number) => void,
    onNext?: (newPage: number) => void,
    disablePrevious?: boolean,
    disableNext?: boolean,
}

const Pagination = (
    {
        page = 1,
        onPrevious = () => {},
        onNext = () => {},
        disablePrevious = false,
        disableNext = false
    } : Props
) => {
    return (
        <>
            <Button
                variant="primary"
                size="sm"
                disabled={disablePrevious || page === 1}
                onClick={(event) => onPrevious(page - 1)}
                className="me-2"
            >
                Previous
            </Button>
            <Button
                variant="primary"
                size="sm"
                disabled={disableNext}
                onClick={() => onNext(page + 1)}
            >
                Next
            </Button>
            <div>You are viewing page {page}</div>
        </>
    );
}

export default Pagination;
```
- Update `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to use this component instead
```tsx
import Pagination from "../../common/Pagination/Pagination";```
```
```tsx
<div>
    <Pagination
        page={page}
        onPrevious={previous}
        onNext={next}
        disablePrevious={!(loading === false && error === null)}
        disableNext={!(loading === false && error === null)}
    />
</div>
```
- __EXERCISE__: To improve the user experience of the pagination component, we support a `loading` input attribute that is to be set to `true` when the data is being fetched for a page. The component should display the message __Loading page {page}__ when loading is `true`. Make use of this new prop to show the loading message.

## Step 18: Maintain page number state in query string
- Maintaining the current page number as a query string parameter, serves as current page state information. We can make use of this and enhance user experience further by loading the desired page of workshops on page load (i.e. if you are on `http://localhost:3000/workshops?page=2` and refresh the page, you can still fetch and load the second page of workshops instead of the first).
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, first make the change to set the query string `page` parameter when user tries to navigate to a new page. We use the setter for a query string from the `useSearchParams` hook for this. Since the query string holds the page, we do not need the `page` state maintained by the component. Get the page number from the query params using the same hook - the effect to fetch workshops on page change is unchanged.
```tsx
import { useSearchParams } from "react-router-dom";
```
```tsx
// const [page, setPage] = useState(1);
const [searchParams, setSearchParams] = useSearchParams();
const page = +(searchParams.get("page") || "1"); // Default to page 1
```
```tsx
const previous = (newPage: number) => {
    if (page <= 1) {
        return;
    }

    setSearchParams({ page: '' + newPage });
};

const next = (newPage: number) => {
    setSearchParams({ page: '' + newPage });
};
```
- Navigate to different pages and refresh to note that the right data for the page is fetched.

## Step 19: Controlled components pattern and implementing filtering of workshops list (by name) in the frontend
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, addd state for implementing filtering
```tsx
const [filterKey, setFilterKey] = useState('React');
const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);
```
- Add the side-effect for filtering when `filterKey` or `workshops` states change. Note we have multiple side-effects (multiple calls to `useEffect`) - this is how side-effects are organized (each feature implemented in a separate `useEffect`).
```tsx
// side-effect for filtering when filterKey or workshops states change
useEffect(
    () => {
        setFilteredWorkshops(
            workshops.filter(
                (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
            )
        );
    },
    [workshops, filterKey]
);
```
- Add the UI for filtering. Using `value` long with the `onChange` handler for an input ensures the state holding the user input (`filterKey`), and the native user input state, are in sync. This is what frameworks like Angular, Vue term __2-way data binding__. React calls this pattern as __controlled components__ (the input state is controlled by the React component maintained state, here by `filterKey`).
```tsx
<div>
    <input
        type="search"
        className="form-control"
        placeholder="Type to search by name"
        value={filterKey}
        onChange={(event) => setFilterKey(event.target.value)}
    />
    <div>
        Workshops whose name has
        <span className="text-primary"> {filterKey} </span> are shown.
    </div>
</div>
```
- Update the UI to show only filtered workshops
```tsx
<Row xs={1} md={3} lg={4}>
    {filteredWorkshops.map((workshop, idx) => (
        <Col className="my-3 d-flex" key={workshop.id}>
            <Item {...workshop} />
        </Col>
    ))}
</Row>
```
- Now that we have understood how the controlled components pattern works, we can change the initial state of `filterKey` so that all workshops are shown
```tsx
const [filterKey, setFilterKey] = useState('');
```

## Step 20: Implementing filtering of workshops list (by category) in the backend
- Modify the service method `getWorkshops()` in `src/services/workshops.ts` to support filtering by category
```ts
const getWorkshops = async (page: number = 1, category: string = '') => {
    const params: {
        _page: number;
        category?: string
    } = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    const response = await axios.get<IWorkshop[]>(
        `https://workshops-server.onrender.com/workshops`,
        {
            // params: params,
            params,
        }
    );

    return response.data;
}
```
- Enable filtering by category in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`. Just like in pagination, we maintain the filter catgeory in the query string, instead of local component state, so that there is a category-specific rendering of the page.
```tsx
const category = searchParams.get("category") || "";
```
- Update the effect that fetches workshops from the backend to run on `category` changes.
```tsx
useEffect(
    () => {
        const helper = async () => {
            setLoading(true);

            try {
                const workshops = await getWorkshops(page, category);
                
                setWorkshops(workshops);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        helper();
    },
    [page, category]
);
```
- Add the UI for filtering by category
```tsx
<div>
    <div className="btn-group my-3" role="group" aria-label="Filter by category">
        <button type="button" className="btn btn-primary" onClick={() => setSearchParams({ category: '' })}>All</button>
        <button type="button" className="btn btn-danger" onClick={() => setSearchParams({ category: 'frontend' })}>Frontend</button>
        <button type="button" className="btn btn-warning" onClick={() => setSearchParams({ category: 'backend' })}>Backend</button>
        <button type="button" className="btn btn-success" onClick={() => setSearchParams({ category: 'devops' })}>Devops</button>
        <button type="button" className="btn btn-info" onClick={() => setSearchParams({ category: 'language' })}>Language</button>
        <button type="button" className="btn btn-light" onClick={() => setSearchParams({ category: 'mobile' })}>Mobile</button>
        <button type="button" className="btn btn-dark" onClick={() => setSearchParams({ category: 'database' })}>Database</button>
    </div>
</div>
```
- The `category` wuery param remains even when all categories need to be displayed. This can be removed by using better logic to handle query params, and is left as an exercise. As a hint, consider using a function like this.
```tsx
// Function to update multiple query parameters
const updateQueryParams = (newParams) => {
    setSearchParams(
        (prev) => {
            const updatedParams = new URLSearchParams(prev);
            
            Object.keys(newParams).forEach((key) => {
                if (newParams[key] === null) {
                    updatedParams.delete(key); // Remove param if value is null
                } else {
                    updatedParams.set(key, newParams[key]);
                }
            });
            
            return updatedParams;
        }
    );
};
```

## Step 21: Adding a workshop details page
- Create a component to show a workshop's details in  `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
const WorkshopDetails = () => {
    return (
        <div>WorkshopDetails works!</div>
    );
};

export default WorkshopDetails;
```
- Since this is a page component, we follow Next JS routing structure as a convention, and define the page In `src/pages/workshops/[id]/index.tsx`. The `[id]` is used to indicate that the route for this page would be `/workshops/:id` where `:id` is a dynamic path parameter.
```tsx
import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";

const WorkshopDetailsPage = () => {
    return <WorkshopDetails />;
};

export default WorkshopDetailsPage;
```
- Set up the route. Observe the use of dynamic path parameters. The name `id` we have given to the second path fragment (first being `workshops`), will be useful later to extract the workshop's id from the browser windows' location. In `src/App.tsx` add the new route. Note that in earlier versions of React router, the order of this route mattered (it should be after the ones for add workshops, and favorites). Starting React router v6, this does not matter (it does routing more intelligently).
```tsx
import WorkshopDetailsPage from './pages/workshops/[id]';
```
```tsx
<Routes>
    <Route path="/home" element={<Navigate to ="/" />} />
    <Route path="/workshops" element={<WorkshopsListPage />} />
    <Route path="/workshops/add" element={<AddWorkshopPage />} />
    <Route path="/workshops/favorites" element={<FavoritesPage />} />
    <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
</Routes>
```
- Set the link in workshops list item to navigate to the workshop details page. In `src/components/workshops/WorkshopsList/Item/Item.tsx`,
```tsx
import { Link } from "react-router-dom";
```
```tsx
<Link to={`/workshops/${id}`}>
    <Button variant="primary">Know more</Button>
</Link>
```
- Click on the workshop __Know more__ button-styled links to navigate to the details page.

## Step 22: Fetching and showing details of the workshop
- Add a method to fetch a workshop's details by its id in `src/services/workshops.ts`. Note that this API endpoint returns a single `IWorkshop` object (__NOT__ an array).
```ts
const getWorkshopById = async (id: number) => {
    const response = await axios.get<IWorkshop>(
        `https://workshops-server.onrender.com/workshops/${id}`
    );

    return response.data;
};
```
- In `src/pages/workshops/[id]/index.tsx` use the `useParams` hook to extract the `id` path parameter, and pass it to the `WorkshopDetails` component (after converting the `id` string to a number). 
```tsx
import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";
import { useParams } from 'react-router-dom';

const WorkshopDetailsPage = () => {
    const { id } = useParams();

    return (
        <WorkshopDetails id={+(id as string)}/>
    );
}

export default WorkshopDetailsPage;
```
- Make sure to define the `id` prop in `src/components/workshops/WorkshopDetails`. Also add the state and effect to fetch and show the details of the component with the desired `id`.
```tsx
import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";

import { getWorkshopById } from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';
import FormattedDate from '../../common/FormattedDate/FormattedDate';

interface Props {
    id: number
}

const WorkshopDetails = ({ id } : Props) => {
    const [loading, setLoading] = useState(true);
    const [workshop, setWorkshop] = useState<IWorkshop | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshop = await getWorkshopById(id);

                    setLoading(false);
                    setWorkshop(workshop);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        [id]
    );

    return (
        <div>
            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && workshop && (
                <>
                    <h1>{workshop.name}</h1>
                    <hr />
                    <Row>
                        <Col xs={12} md={4}>
                            <Image
                                src={workshop.imageUrl}
                                alt={workshop.name}
                                fluid
                            />
                        </Col>
                        <Col xs={12} md={8}>
                            <div className="mb-3">
                                <div>{workshop.time}</div>
                                <div>
                                    <FormattedDate date={workshop.startDate} />
                                    <span> - </span>
                                    <FormattedDate date={workshop.endDate} />
                                </div>
                                <div>
                                    {workshop.location.address},
                                    {workshop.location.city},
                                    {workshop.location.state}
                                </div>
                            </div>
                            <div>{workshop.description}</div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default WorkshopDetails;
```
- React uses innerText to bind text content of an element. Note the use of `dangerouslySetInnerHTML` prop to set `innerHTML` instead of `innerText` that is used otherwise. When using `innerHTML` for binding user-generated content (like user reviews, blog articles, comments, social media posts etc.) you need to be aware of XSS vulnerability. Make sure such content has been sanitized in the backend.
```tsx
<div dangerouslySetInnerHTML={{
    __html: workshop.description
}}></div>
```
- __EXERCISE__: Check packages `react-query` or `@tanstack/react-query` to tackle duplication of logic to fetch data and maintain loading and error states. This uses the concept of "custom hooks" to share stateful logic between components.
- __EXERCISE__: Update the title of the workshop details page to the name of the actual workshop loaded. Refer https://react.dev/reference/react-dom/components/title, or use a package like `react-helmet`

## Step 23: Install FontAwesome and use its icons
- [FontAwesome](https://fontawesome.com/) provides a large set of icons for free (free for use in commercial projects). Follow the steps at https://docs.fontawesome.com/web/use-with/react to use it in react apps like this one. Make sure to install the Free SVG Icon Package in step 2 (do not install the Pro ones).
- Make available necessary icons like so. Add this in `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
```
- Add it below the location details
```tsx
<div>
    {workshop.location.address},
    {workshop.location.city},
    {workshop.location.state}
</div>

{/* Add this */}
<div>
    <span className="me-4">
        <FontAwesomeIcon icon={workshop.modes.inPerson ? faCheckCircle : faTimesCircle} className="me-2" />
        In person
    </span>
    <span>
        <FontAwesomeIcon icon={workshop.modes.online ? faCheckCircle : faTimesCircle} className="me-2" />
        Online
    </span>
</div>
```

## Step 24: Add child routing to show session list / add session form based on the child route
- Child routes add on the the parent route and are used to show one of a set of children components conditionally in a parent component. We will show sessions list below the workshop details if the URL is `http://localhost:3000/workshops/:id` (adds nothing to the parent route), and the add session form below the workshop details if the URL is `http://localhost:3000/workshops/:id/add-session` (Adds 'add-session' to the parent route).
- Create 2 components to be used as children in workshop details component. These are part of the `WorkshopDetails` component and hence we do not create page components for these. First create `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`.
```tsx
interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    return (
        <div>SessionsList works!</div>
    );
};

export default SessionsList;
```
- Next create First create `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
interface Props {
    id: number
}

const AddSession = ( { id } : Props ) => {
    return (
        <div>AddSession works!</div>
    );
};

export default AddSession;
```
- Add routes for these components (child routing). Note how we need to mention only what needs to be added to the parent route in their paths. In `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import SessionsList from './SessionsList/SessionsList';
import AddSession from './AddSession/AddSession';
```
- Add the UI after the UI showing details of the workshop
```tsx
<div className="my-4">
    <Routes>
        <Route path="" element={<SessionsList id={id} />} />
        <Route path="/add" element={<AddSession id={id} />} />
    </Routes>
</div>
```
- We also need to enable child routing by changing the route for the details page from `/workshops/:id` to `/workshops/:id/*`.
```tsx
<Route path="/workshops/:id/*" element={<WorkshopDetailsPage />} />
```
- You should now be able to see differen child components when visiting `/workshops/1` and `/workshops/1/add`.
- Add `NavLink` to switch between children. By default, the `active` class is added to the active link. If we want to use a custom class, we can do it using a function value for `className` prop, like so
```tsx
<div className="mt-5">
    <NavLink
        to={"/workshops/" + id}
        className={
            ({ isActive }) => "btn btn-primary btn-sm btn-child-link" + ( isActive ? "btn-active" : "" )
        }
    >
        Sessions List
    </NavLink>
    <NavLink
        to={"/workshops/" + id + "/add"}
        className={
            ({ isActive }) => "btn btn-primary btn-sm btn-child-link" + ( isActive ? "btn-active" : "" )
        }
    >
        Add a session
    </NavLink>
</div>
```
- In `src/components/workshops/WorkshopDetails/WorkshopDetails.scss`,
```scss
.btn-child-link {
    opacity: 0.5;
}

.btn-active {
    opacity: 1;
}
```
- Add the style import in `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import './WorkshopDetails.scss';
```
- You can now switch between the child routes using the links.
- __EXERCISE__: Try to set up the child routing using the `Outlet` component discussed before.

## Step 25: Fetch and show sessions for the workshop
- In `src/models/ISession.ts` define the model to represent a session
```ts
type Level = 'Basic' | 'Intermediate' | 'Advanced';

interface ISession {
    id: number;
    workshopId: number;
    sequenceId: number;
    name: string;
    speaker: string;
    duration: number;
    level: Level;
    abstract: string;
    upvoteCount: number;
}

export type {
    Level,
    ISession as default
};
```
- The general practice is to create a service for every REST resource (roughly an database entity in the backend). Create the service `src/services/sessions.ts` and define the service method to fetch sessions for the workshop with a given id.
```ts
import axios from "axios";
import ISession from "../models/ISession";

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
    );

    return response.data;
};

export { getSessionsForWorkshop };
```
- In `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx` fetch the sessions.
```tsx
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../../common/ErrorAlert/ErrorAlert";

import { getSessionsForWorkshop } from "../../../../services/sessions";
import ISession from "../../../../models/ISession";

interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionsForWorkshop(id);

                    setLoading(false);
                    setSessions(sessions);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        [id]
    );

    return (
        <div>
            <h2>List of Sessions</h2>

            <hr />

            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && (
                <ListGroup>
                    {sessions.map((s, idx) => (
                        <ListGroup.Item key={s.id}>
                            <Row>
                                <Col
                                    xs={1}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                >
                                    {/* @todo voting widget */}
                                    {s.upvoteCount}
                                </Col>
                                <Col xs={11}>
                                    <h3>{ s.name }</h3>
                                    <div>by { s.speaker }</div>
                                    <div>{ s.level }</div>
                                    <div>{ s.duration }</div>
                                    <div>{ s.abstract }</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SessionsList;
```
- __EXERCISE__: Move the display of sessions list items to a separate component - `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.tsx` (just the way we created workshops list item as a separate component). The following steps assume you complete this exercise.
- __Solution to the exercise__
- In `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.tsx`
```tsx
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ISession from "../../../../../models/ISession";

interface Props {
    session: ISession
}

const Item = ( { session } : Props ) => {
    const { id, name, speaker, level, duration, abstract, upvoteCount } = session;

    return (
        <Row>
            <Col
                xs={1}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                {/* @todo voting widget */}
                {upvoteCount}
            </Col>
            <Col xs={11}>
                <h3>{ name }</h3>
                <div>by { speaker }</div>
                <div>{ level }</div>
                <div>{ duration }</div>
                <div>{ abstract }</div>
            </Col>
        </Row>
    );
}

export default Item;
```
- In `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`
```tsx
{sessions.map((s, idx) => (
    <ListGroup.Item key={s.id}>
        <Item session={s}/>
    </ListGroup.Item>
))}
```

## Step 26: Create a voting widget component and use it for voting on a session
- Create the service method to vote on a session in `src/services/sessions.ts`
```ts
export type VoteType = 'upvote' | 'downvote';
```
```ts
const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession };
```
- Create the voting widget component that will be useful for showing votes and providing voting buttons where needed. It takes `votes` as an input, and uses a __callback prop__ (function passed as a prop) events (say `vote`) that is called when the upvote or downvote buttons are clicked. __Callback props are the means for child to parent communication in React__.
- In `src/components/common/VotingWidget/VotingWidget.tsx`
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { VoteType } from '../../../services/sessions';

import './VotingWidget.scss';

export type VoteFunction = ( voteType: VoteType ) => void;

interface Props {
    votes: number,
    vote: VoteFunction
}

const VotingWidget = ( { votes, vote } : Props ) => {
    return (
        <div className="voting-widget">
            <FontAwesomeIcon
                icon={faCaretUp}
                onClick={() => vote('upvote')}
                className="fa-2x voting-widget-button"
            />
            <span className="voting-widget-votes">{ votes }</span>
            <FontAwesomeIcon
                icon={faCaretDown}
                onClick={() => vote('downvote')}
                className="fa-2x voting-widget-button"
            />
        </div>
    );
}

export default VotingWidget;
```
- In `src/components/common/VotingWidget/VotingWidget.scss`,
```scss
.voting-widget {
    display: flex;
    flex-direction: column;
    align-items: center;

    .voting-widget-button {
        color: green;
        cursor: pointer;
    }

    .voting-widget-votes {
        font-size: 2em;
        margin: 0 1em;
    }
}
```
- Use the voting widget component in `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.js`. Pass down `votes` to the widget, and listen for the `vote` event. We also make modifications to accept `vote` as a prop from the `SessionsList` component. When a component receives callback props it is a good idea to wrap the component's definition in React's `memo()` function (not to be confused with react's `useMemo()` which serves a different purpose, albeit related to memoization and performance optimization).
```tsx
import { memo } from 'react';
import { Col, Row } from "react-bootstrap";

import VotingWidget, { VoteFunction }  from "../../../../common/VotingWidget/VotingWidget";
import ISession from "../../../../../models/ISession";

interface Props {
    session: ISession,
    vote: VoteFunction
}

const Item = memo(
    ( { session, vote } : Props ) => {
        const { name, speaker, level, abstract, duration, upvoteCount } = session;

        return (
            <Row>
                <Col
                    xs={1}
                    className="d-flex flex-column justify-content-center align-items-center"
                >
                    <VotingWidget
                        votes={upvoteCount}
                        vote={vote}
                    />
                </Col>
                <Col xs={11}>
                    <h3>{{ s.name }}</h3>
                    <div>by {{ s.speaker }}</div>
                    <div>{{ s.level }}</div>
                    <div>{{ s.duration }}</div>
                    <div>{{ s.abstract }}</div>
                </Col>
            </Row>
        );
    }
);

export default Item;
```
- Handle the `vote` event in `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`. Note how we update the votes for the session being operated on. Since this session object is the exact one being used as part of the list iterated in JSX (part of the `sessions` array), React is able to detect the change and update the UI! When a child component definition is wrapped in React's `memo()` function, the callback prop passed from the parent component is to be wrapped in React's `useCallback()`. The dependencies array of `useCallback` ensures that the callback function is recreated only when one of the dependencies of the function changes. This prevents a new callback from being created on every render of the parent, thus ensuring the child component that receives the callback, does not receive a new one every time and re-render unnecessarily (since it is wrapped in `memo`).
```tsx
import { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";

import { getSessionsForWorkshop, voteForSession, VoteType } from "../../../../services/sessions";
import ISession from "../../../../models/ISession";
```
```tsx
const vote = useCallback(
    async (
        sessionId: number,
        voteType: VoteType
    ) => {
        try {
            const updatedSession = await voteForSession(sessionId, voteType);
            setSessions(
                sessions => sessions.map( s => s.id === sessionId ? updatedSession : s )
            );
            alert('You vote for session ' + updatedSession.name +' has been captured');
        } catch(error) {
            alert((error as Error).message);
        }
    },
    [voteForSession, setSessions]
);
```
```tsx
{sessions.map((s, idx) => (
    <ListGroup.Item key={s.id}>
        <Item
            session={s}
            vote={(voteType) => vote(s.id, voteType)}
        />
    </ListGroup.Item>
))}
```

## Step 27: Set up a toast message service and container to display toast messages
- Toast notifications are a non-intrusive way to display short-lived messages. There are many third-party libraries for this. While React Bootstrap does have its own [Toast and ToastContainer components](https://react-bootstrap.netlify.app/docs/components/toasts), it is not too easy to work with (but gels in with the Bootstrap theme). We use a simpler library for this purpose - [`react-toastify`](https://fkhadra.github.io/react-toastify/introduction/).
- First install the library
```sh
npm i react-toastify
```
- In `src/App.tsx` include a container for toast messages. This is positioned to appear on the top right corner in the application.
```tsx
import { ToastContainer } from 'react-toastify';
```
```tsx
return (
    <>
        {/* rest of UI code...*/}
        <ToastContainer
            position="top-right"
            autoClose={5000}
        />
    </>
)
```
- You can now use a call to `toast()` in place of `alert()` we used earlier. For example, in `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`
```tsx
const vote = useCallback(
    async (
        sessionId: number,
        voteType: VoteType
    ) => {
        try {
            const updatedSession = await voteForSession(sessionId, voteType);
            setSessions(
                sessions => sessions.map( s => s.id === sessionId ? updatedSession : s )
            );
            toast.success('You vote for session ' + updatedSession.name +' has been captured');
        } catch(error) {
            toast.error((error as Error).message);
        }
    },
    [voteForSession, setSessions]
);
```

## Step 28: Using environment files for enabling environment-based settings
- Environment files help us to use settings for the application based on the environment. We can, for example, have our code work without changes, and comunicate with a local development server in development, and a production server, in a production environment. Angular will take care to use the appropriate settings based on the application build (development/staging/production etc.)
- In `.env` (Note that __environment files are located in the root of the project__, and __NOT__ `src`)
```ts
REACT_APP_API_URL=http://localhost:8001
```
- In `.env.production`
```ts
REACT_APP_API_URL=https://workshops-server.onrender.com
```
};
```
- Do necessary changes in `src/services/workshops.ts` 
```ts
const apiUrl = process.env.REACT_APP_API_URL;
```
- In `getWorkshops` use this URL
```ts
`${this.apiUrl}/workshops`
```
- In `getWorkshopById` use this URL
```ts
`${apiUrl}/workshops/${workshopId}`
```
- Do necessary changes in `src/services/sessions.ts`
```ts
const apiUrl = process.env.REACT_APP_API_URL;
```
- In `getSessionsForWorkshop` use this URL
```ts
`${apiUrl}/workshops/${workshopId}/sessions`
```
- In `voteForSession` use this URL
```ts
`${apiUrl}/sessions/${sessionId}/${voteType}`
```
- Create the production build, and serve the app from the build folder. Verify from the network tab that the production backend is the one being used in HTTP requests now.
    - __Note__: More details to be added to this step.

## Step 29: Set up options for editing / deleting a workshop in every workshop list item
```ts
export default { getWorkshops, getWorkshopById, deleteWorkshopById };
```
- In `src/components/workshops/WorkshopsList/Item/Item.tsx`,
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-regular-svg-icons";
```
- Within the `Card` component
```tsx
<div className="card-action-buttons">
    <Button
        variant="info"
        size="sm"
        title="Edit this workshop"
        onClick={() =>{}}
    >
        <FontAwesomeIcon
            icon={faPencil}
            className="fa-2x"
        />
    </Button>
    <Button
        variant="danger"
        size="sm"
        title="Delete this workshop"
        onClick={() => {}}
    >
        <FontAwesomeIcon
            icon={faTrash}
            className="fa-2x"
        />
    </Button>
</div>
```
- In `src/components/workshops/WorkshopsList/Item/Item.scss`,
```scss
.card {
    /*display: flex;*/
    position: relative;

    .card-action-buttons {
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 16px;

        .btn-action-button {
            cursor: pointer;
            opacity: 0.7;
            
            &:hover {
                opacity: 1;
            }
        }
    }
}
```

## Step 30: Deleting a workshop
- Add a service method to delete a workshop with a given id in `src/services/workshops.ts`. Note that we use void to indicate an empty-bodied response.
```ts
deleteWorkshopById(workshopId: number) {
    return http.delete<void>(`${apiUrl}/workshops/${workshopId}`);
}
```
- In `src/components/workshops/WorkshopsList/Item/Item.tsx`, set up a callback prop `onDelete` to inform to the parent when user clicks on the delete icon
```tsx
interface Props extends IWorkshop {
    onDelete: () => void
}

const Item = ({ name, id, imageUrl, location, startDate, endDate, onDelete }: Props) => {
    // existing code...
};
```
```tsx
<Button
    variant="danger"
    size="sm"
    title="Delete this workshop"
    onClick={onDelete}
>
    <FontAwesomeIcon
        icon={faTrash}
        className="fa-2x"
    />
</Button>
```
```
- In the parent component `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
<Item
    {...workshop} onDelete={() => deleteWorkshop(workshop)}></Item>
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```ts
const deleteWorkshop = (workshop: IWorkshop) => {
    console.log(workshop);
}
```
- The workshop is now logged in the console when the user tries to delete the workshop
- Use the service method to set up deletion of the workshop.
- TBD
```ts
import { getWorkshops, deleteWorkshopById } from "../../../services/workshops";

// @todo Import the toast service and make use of it
```
```ts
const deleteWorkshop = async (workshop: IWorkshop) => {
    console.log(workshop);

    try {
        await deleteWorkshopById(workshop.id);

        // @todo Display a success toast with message `Deleted workshop with id = ${workshop.id}` for 5000 ms
        
        // update this.workshops
        setWorkshops(
            w => workshops.filter((w) => w.id !== workshop.id)
        );
    } catch( error ) {
        // @todo Display aa error toast with message ``Could not delete workshop with id = ${workshop.id}` for 5000 ms
    }
}
```
- In order to display a confirmation dialog before deletion, we add this in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`. To be done following https://react-bootstrap.netlify.app/docs/components/modal 
```tsx
<div className="modal-header">
    <h4 className="modal-title" id="modal-basic-title">
        Please confirm deletion!
    </h4>
    <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {}}
    ></button>
</div>
<div className="modal-body">
    <div className="mb-3">
        You are about to delete a workshop. This action cannot be undone.
        Are you sure want to proceed?
    </div>
    <div>
        <button className="btn btn-light" onClick={() => {}}>
            Cancel
        </button>
        <button className="btn btn-danger" onClick={() => {}}>
            OK
        </button>
    </div>
</div>
```

## Step 31: Create the form to add a session
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
```
```tsx
<div>
    <h1 className="d-flex justify-content-between align-items-center">
        Add a Session
        <Link to=".." className="btn btn-primary">List of sessions</Link>
    </h1>

    <hr />

    <Form>
        <Form.Group className="mb-4" controlId="sequenceId">
            <Form.Label>Sequence ID</Form.Label>
            <Form.Control
                type="number"
                placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Name of the session, Eg. Introduction to Programming"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="speaker">
            <Form.Label>Speaker</Form.Label>
            <Form.Control
                type="text"
                placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
                type="text"
                placeholder="The duration of the session in hours (eg. 2.5)"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Select
                aria-label="Level"
            >
                <option disabled>-- Select the level --</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4" controlId="abstract">
            <Form.Label>Abstract</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
            />
        </Form.Group>

        <Button type="submit">Add a session</Button>
    </Form>
</div>
```
- In `src/App.scss`, add this. We add it to global styles as similar error messages will need to be displayed in other forms in the app.
```scss
.error-message {
    color: crimson;
    font-size: 0.85em;
}
```

## Step 32: Reading user inputs using uncontrolled components approach
- There are 2 ways to extract and keep track of user inputs in a form in React
    - Uncontrolled components - The browser DOM maintains and controls the input state (value that the user filled in the input). This approach is simple, but we do not have much control over the input through the application. It is suitable for simple forms with few inputs. It can also be used for really large forms (hundreds of inputs), where performance is a key consideration.
    - Controlled components - React keeps track of and maintains the input state. This makes it easy to keep track of, control the input values, and share the user input state with other parts of the application if needed. This is the preferred approach. However for really large forms (hundreds of inputs), where performance is a key consideration, it may not be suitable as the component with the form re-renders when state of any input (value /cerror) changes, resulting in many re-renders.
- In this step we use the uncontrolled components approach.
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
import { FormEvent, useRef } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

const AddSession = ({ id }: Props) => {
    console.log( 'render' );

    const sequenceIdRef = useRef<HTMLInputElement>(null); // { current: domNodeOfSequenceIdInput }
    const nameRef = useRef<HTMLInputElement>(null);
    const speakerRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const abstractRef = useRef<HTMLTextAreaElement>(null);

    const addSession = async (event : FormEvent) => {
        event.preventDefault();

        if(
            sequenceIdRef.current !== null &&
            nameRef.current !== null &&
            speakerRef.current !== null &&
            durationRef.current !== null &&
            levelRef.current !== null &&
            abstractRef.current !== null
        ) {
            const session = {
                workshopId: id,
                upvoteCount: 0,
                sequenceId: +sequenceIdRef.current.value,
                name: nameRef.current.value,
                speaker: speakerRef.current.value,
                duration: +durationRef.current.value,
                level: levelRef.current.value as Level,
                abstract: abstractRef.current.value
            };

            console.log( session );

            // You can do validation here, and submit the form if valid
            // This is discussed in the following steps
            // @todo
        }
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">
                    List of sessions
                </Link>
            </h1>

            <hr />

            <Form onSubmit={addSession}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        ref={sequenceIdRef}
                        defaultValue={1}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        ref={nameRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                        ref={speakerRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        ref={durationRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Level" ref={levelRef}>
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" rows={3} ref={abstractRef} />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
```

## Step 33: Reading user inputs using controlled components approach
- __NOTE__: If you wish, save `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx` as `src/components/workshops/WorkshopDetails/AddSession/AddSession.uncontrolled.tsx` for reference.
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
import { useState, FormEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

const AddSession = ({ id }: Props) => {
    console.log( 'render' );

    const [sequenceId, setSequenceId] = useState('1');
    const [name, setName] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [duration, setDuration] = useState('');
    const [level, setLevel] = useState('Basic');
    const [abstract, setAbstract] = useState('');

    const addSession = async (event : FormEvent) => {
        event.preventDefault();

        const session = {
            workshopId: id,
            upvoteCount: 0,
            sequenceId: +sequenceId,
            name,
            speaker,
            duration: +duration,
            level: level as Level,
            abstract
        };

        console.log( session );

        // You can do validation here, and submit the form if valid
        // This is discussed in the following steps
        // @todo
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">
                    List of sessions
                </Link>
            </h1>

            <hr />

            <Form onSubmit={addSession}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        value={sequenceId}
                        onChange={(event) => setSequenceId(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                        value={speaker}
                        onChange={(event) => setSpeaker(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        aria-label="Level"
                        value={level}
                        onChange={(event) => setLevel(event.target.value)}
                    >
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={abstract}
                        onChange={(event) => setAbstract(event.target.value)}
                    />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
```

## Step 34: Validation using react-hook-form
- Validating forms using our own logic would be tedious. Additionally we need to manage form states (values, errors, user interaction states like if an input has been touched by the user etc.). There are many libraries we can choose from. A very popular one is [React Hook Form](https://react-hook-form.com/). First install it.
```sh
npm i react-hook-form
```
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

interface SessionFormType {
    sequenceId: number;
    name: string;
    speaker: string;
    duration: number;
    level: Level;
    abstract: string;
}

const AddSession = ({ id }: Props) => {
    console.log('render');

    const { register, formState: { errors }, getValues, handleSubmit } = useForm<SessionFormType>({
        mode: 'all'
    });

    const validateDurationAndLevel = () => {
        const duration = +getValues('duration');
        const level = getValues('level');

        if( level === 'Basic' && duration < 1 ) {
            return 'Basic level shold have minimum 1 hour duration';
        }

        if( level === 'Intermediate' && duration < 2 ) {
            return 'Intermediate level shold have minimum 2 hours duration';
        }

        if( level === 'Advanced' && duration < 3 ) {
            return 'Advanced level shold have minimum 3 hours duration';
        }
    };

    const addSession = async (values : SessionFormType) => {
        const session = {
            ...values,
            sequenceId: +values.sequenceId,
            duration: +values.duration,
            upvoteCount: 0,
            workshopId: id
        };

        console.log( session );

        // Submit the form if valid
        // This is discussed in the following steps
        // @todo
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">
                    List of sessions
                </Link>
            </h1>

            <hr />

            <Form onSubmit={handleSubmit(addSession)}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        {...register('sequenceId', { required: true, pattern: /^\d+$/ })}
                    />
                    {
                        errors.sequenceId && (
                            <div className="text-danger">
                                {
                                    errors.sequenceId?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.sequenceId?.type === 'pattern' && (
                                        <div>Sequence ID must be a positive integer</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        aria-label="Level"
                        {...register('level', { required: true, validate: validateDurationAndLevel })}
                    >
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    {
                        errors.level && (
                            <div className="text-danger">
                                {
                                    errors.level?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.level?.type === 'validate' && (
                                        <div>The duration in insufficient for the selected level</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
```
- __EXERCISE__: Set up input validation rules and error handling for rest of the inputs as well.
- __SOLUTION__:
```tsx
<Form onSubmit={handleSubmit(addSession)}>
    <Form.Group className="mb-4" controlId="sequenceId">
        <Form.Label>Sequence ID</Form.Label>
        <Form.Control
            type="text"
            placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
            {...register('sequenceId', { required: true, pattern: /^\d+$/ })}
        />
        {
            errors.sequenceId && (
                <div className="text-danger">
                    {
                        errors.sequenceId?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.sequenceId?.type === 'pattern' && (
                            <div>Sequence ID must be a positive integer</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>
    <Form.Group className="mb-4" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
            type="text"
            placeholder="Name of the session, Eg. Programming 101 - Introduction to programming"
            {...register('name', { required: true, pattern: /^[A-Za-z\d][A-Za-z\d .,'&_\/:+#@-]*$/ })}
        />
        {
            errors.name && (
                <div className="text-danger">
                    {
                        errors.name?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.name?.type === 'pattern' && (
                            <div>Name of the session has characters that are not allowed - Must begin with alphanumeric, and can have alphanumeric, spaces, and these characters only - .,'&_/:+#@-</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>
    <Form.Group className="mb-4" controlId="speaker">
        <Form.Label>Speaker</Form.Label>
        <Form.Control
            type="text"
            placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
            {...register('speaker', { required: true, pattern: /^[A-Za-z][A-Za-z ]*(,\s*[A-Za-z][A-Za-z ]*)*$/ })}
        />
        {
            errors.speaker && (
                <div className="text-danger">
                    {
                        errors.speaker?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.speaker?.type === 'pattern' && (
                            <div>Comma-separated name(s) of speaker(s)</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>
    <Form.Group className="mb-4" controlId="duration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
            type="text"
            placeholder="The duration of the session in hours (eg. 2.5)"
            {...register('duration', { required: true, pattern: /^\d+(\.\d+)?$/ })}
        />
        {
            errors.duration && (
                <div className="text-danger">
                    {
                        errors.duration?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.duration?.type === 'pattern' && (
                            <div>Only number with optional decimal part allowed</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>
    <Form.Group className="mb-4" controlId="level">
        <Form.Label>Level</Form.Label>
        <Form.Select
            aria-label="Level"
            {...register('level', { required: true, validate: validateDurationAndLevel })}
        >
            <option disabled>-- Select the level --</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </Form.Select>
        {
            errors.level && (
                <div className="text-danger">
                    {
                        errors.level?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.level?.type === 'validate' && (
                            <div>The duration in insufficient for the selected level</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>
    <Form.Group className="mb-4" controlId="abstract">
        <Form.Label>Abstract</Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            {...register('abstract', { required: true, minLength: 20, maxLength: 1024 })}
        />
        {
            errors.abstract && (
                <div className="text-danger">
                    {
                        errors.abstract?.type === 'required' && (
                            <div>This field is required</div>
                        )
                    }
                    {
                        errors.abstract?.type === 'minLength' && (
                            <div>Minimum 20 characters needed</div>
                        )
                    }
                    {
                        errors.abstract?.type === 'maxLength' && (
                            <div>Maximum 1024 characters allowed</div>
                        )
                    }
                </div>
            )
        }
    </Form.Group>

    <Button type="submit">Add a session</Button>
</Form>
```

## Step 35: Handle form submission and add the session
- In `src/services/sessions.ts`,
```ts
const postSession = async (session: Omit<ISession, 'id'>) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.post<ISession>(
        `${apiUrl}/sessions`,
        session,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};
```
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { postSession } from '../../../../services/sessions';
```
```tsx
const AddSession = ({ id }: Props) => {
    const navigate = useNavigate();

    // rest of code
    // ...

    const addSession = async (sessionData) => {
        // rest of code
        // ...

        // POST the new session information to create a new session
        try {
            const newSession = await postSession( session );
            toast.success('New session has been added');
            navigate( '../' ); // or navigate('/workshops/${id}')
        } catch(error) {
            toast.error((error as Error).message);
        }
    };

    return (
        /* code for the UI... */
    );
};

export default AddSession;
```

## Step 36: Getting started with a form to add a workshop
- __EXERCISE__: In `src/components/workshops/AddWorkshop/AddWorkshop.tsx`, do necessary set up for a form to add a new workshop. Group address, city, state under a separate FormGroup as "location". Group the 2 checkboxes under "modes". Set up validations using `useForm()` method of `react-hook-form`. On submit of the form, log the value of the form. 
- __To de done__

## Step 37: Solution to the above exercise
- In `src/components/workshops/AddWorkshop/AddWorkshop.tsx`
- __To de done__

## Step 38: Adding workshop to the backend
- In `src/services/workshops.ts`,
```ts
const postWorkshop = async (workshop: Omit<IWorkshop, 'id'>) => {
    const response = await axios.post<IWorkshop>(`${apiUrl}/workshops`, workshop, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}
```
- In `src/components/workshops/AddWorkshop/AddWorkshop.tsx`,
- __To de done__
- You should now be able to fill the details in the form, and submit it to add a new workshop to the backend.

## Step 39: Updating (Editing) workshop
- We reuse the `AddWorkshop` component for editing as well as there is very little difference between the two.
- Set up additional routing to the `AddWorkshopComponent` component for editing a workshop with given id in `src/App.tsx`
- __To de done__
- Set link to navigate to edit workshop in `src/components/workshops/WorkshopsList/Item/Item.tsx`
- __To de done__
- Add service method to update a workshop with a given id in `src/services/workshops.ts`
```ts
const putWorkshop = async (workshop: Omit<IWorkshop, 'id'>, id: number) => {
    const response = await axios.put<IWorkshop>(
        `${apiUrl}/workshops/${id}`,
        workshop,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
}
```
- In `/src/components/workshops/AddWorkshop/AddWorkshop.tsx`,
- __To de done__
- You should now be able to modify the details in the form, and submit it to update a workshop's details in the backend.

## Step 40: Implementing theming in the app using Context API
- The Context API was introduced in React v16.6 as a way to share data is a subtree of components (thus avoiding __props drilling__). Before it was introduced, using third-party state management libraries like __Redux__ were the main option (these are still popular though).
- We introduce theme (light/dark) for our app, and share the theme as a context value.
- We shall implement this in 3 steps
    - Define a `ThemeContext` to enable sharing the theme value, as well as `toggleTheme` method to enable toggling the theme ('light' -> 'dark' and 'dark' -> 'light'), along with some other information.
    - Maintain and provide the state by wrapping a top-level component like the `App` component
    - Consume it in descendant components that need to show their UI based on the theme.
- We first set up the context in the `src/contexts/theme.tsx`
```tsx
import { createContext, useContext, useState } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme,
    contrastTheme: Theme,
    toggleTheme: () => void,
    setTheme?: (theme: string) => void
}

// you pass the "default" context to createContext()
const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    contrastTheme: 'dark',
    toggleTheme: () => {} // a no-operation function
});

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const contrastTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, contrastTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

export type {
    Theme,
}

export {
    ThemeContext as default,
    ThemeProvider,
    useTheme,
};
```
- Provide it in `src/index.tsx` using `ThemeProvider` (essentially `ThemeContext.Provider`)
```tsx
import { ThemeProvider } from './contexts/theme.tsx';
```
```tsx
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
```
- Consume it in components requiring theme information by calling `useTheme()` to retrieve the shared context value (essentially calling `useContext(ThemeContext)` to retrieve the context value). In `src/components/common/Menu/Menu.tsx` we both consume the `theme` value, and add the theme toggling code (on click of the _Change theme_ button).
```tsx
import { useTheme } from '../../../contexts/theme';
```
```tsx
const Menu = () => {
    const { theme, contrastTheme, toggleTheme } = useTheme();

    return (
        <Navbar collapseOnSelect expand="lg" variant={theme} className={`bg-${theme}`}>
            {/* rest of UI code... */}
        </Navbar>
    );
};
```
```tsx
<NavDropdown.Item href="#" onClick={toggleTheme}>
    Change Theme
</NavDropdown.Item>
```
- In `src/components/Home/Home.tsx`, we similarly have it react to theme changes
```tsx
import { useTheme } from '../../contexts/theme';

const Home = () => {
    const { theme, contrastTheme } = useTheme();

    return (
        <div className={`home p-5 bg-${theme} text-${contrastTheme}`}>
            <h1>Workshops App</h1>

            <hr />

            <section>
                <p>Welcome to Workshops App</p>
                <p>
                    The app serves details of (fictitious) technical workshops happening in
                    various cities. Every workshop has a broad topic (eg. JavaScript), and a
                    workshop has many sessions (each session covers a sub-topic, eg. Closures in
                    JavaScript).
                </p>
                <p>
                    You can view a list of workshops, details of every workshop, add a workshop,
                    view the list of sessions in a workshop, and also add a new session for a
                    workshop.
                </p>
            </section>
        </div>
    );
}

export default Home;
```