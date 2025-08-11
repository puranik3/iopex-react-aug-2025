# React Concepts
We work with individual HTML files to learn react concepts. Once the concepts are clear, you can move onto building the React application (__Workshops App__).  
  
We shall use __React 18.3.1__, __ReactDOM 18.3.1__, __Babel (standalone) 6.26.0__.

## Step 1: Hello React! Getting started with the library
- Create a `01-hello-react.html`. Let's say you would like to build a UI that looks like so, but with React.
- Type __! + Enter__ to set up the basic HTML page in VSCode (works only within VSCode and in a file with `.html` extension). Add a root element - an HTML element where React can render its UI.
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello React</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```
- Include __React__, __React DOM__ (versions must match) - the order is important as React DOM makes use of React.
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />‸
        <title>Hello React</title>
    </head>
    <body>
        <div id="root"></div>

        <!-- First React -->
        <!-- also used for mobile apps -->
        <!-- Architect for the app UI -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.min.js"></script>

        <!-- Second ReactDOM -->
        <!-- Specific to web apps -->
        <!-- Builder of the UI (DOM manipulation) -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>
    </body>
</html>
```
- We shall define a UI that needs to be rendered with the `div` with id __root__ and looks like so
```html
<div id="introduction" class="message">
    <strong>React</strong> is a frontend library to create an app's UI
</div>
```
- For this we define the UI using React (create a __React element__) and render the defined UI using ReactDOM. Add a script like so after the library includes.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>

<script>
    // define the UI
    // React element - simplified DOM node (a plain JS object)
    const el = React.createElement(
        // type of element
        "div",

        // props - attrs in HTML -> props in React
        {
            id: "introduction",
            className: "message",
            // children : [ ... ]
        },

        // children is a special prop - if there are 2 or more children, they will be collected into an array
        React.createElement(
            "strong",
            null, // or {}
            "React"
        ),

        " is a frontend library to create an app's UI"
    );

    console.log(el);

    const root = ReactDOM.createRoot(document.getElementById("root"));

    // DOM manipulations take place here and we see the UI
    root.render(el);
</script>
```
- Copy the path to the file and open in the browser. You should see the React rendered UI. If opn in Chrome (say), inspect the Elements tab to check the DOM that is created by React DOM.

## Step 2: Using JSX in place of React.createElement
- Create a copy of the previous file (say `02-hello-jsx.html`). `React.createElement` is difficult to work with in order to define the UI (React element). JavaScript XML (JSX) makes it easy to define the UI instead using an HTML-like syntax. This is an extension to the JS language supported by JS compilers like Babel (but not the native JS engine of browsers).
- Include Babel (standalone) - you can have it included anywhere before out custom script.
```html
<!-- Babel (in-browser compiler) for JSX -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
```
- Modify the custom script to include `type="text/babel"`. Now Babel compiles this instead of the browser, and injects the compiled script (that uses `React.createElement` calls in place of the JSX) in to page `<head><head>`, which then is executed by the browser. By relying on JSX you are freed from the pain of defining the UI through `React.createElement`.
```html
<script type="text/babel">
    // JSX has HTML syntax (with some differences). It is NOT HTML
    const el = (
        <div id="introduction" className="message">
            <strong>React</strong>
            is a frontend library to create an app's UI
        </div>
    );

    console.log(el);

    const root = ReactDOM.createRoot(document.getElementById("root"));

    root.render(el);
</script>
```
- __Note__: JSX is not HTML. It just uses the familiat HTML syntax. There are difference in the syntax as well. Some attributes are named differently, you can interpolate variables, use JS expression within JSX code etc.
- Again, open this file in a browser and check. You should see the same output as in the previous step. Also inspect the `<head></head>` element to the the compiled and injected script that the browser executes to render the UI.

## Step 3: Creating a template
- Define this as a template to be used in further demos. You can copy this template and start working. This templates includes React, ReactDOM, Babel and Bootstrap
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
        />
    </head>
    <body>
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

        <script type="text/babel">
            const el = (

            );

            console.log(el);

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(el);
        </script>
    </body>
</html>
```

## Step 4: Understanding the Virtual DOM mechanism of DOM updates
- Create `03-virtual-dom.html`
```html
<!-- ! + Enter -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Virtual DOM</title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
        />
    </head>
    <body>
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

        <script type="text/babel">
            const el = (
                <div id="introduction" className="message">
                    <h1>Introduction</h1>
                    <strong>React</strong>
                    is a frontend library to create an app's UI
                </div>
            );

            console.log(el);

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(el);
        </script>
    </body>
</html>
```
- View it in the browser
- Let's say we set up ReactDOM to update the UI after 10 seconds like so.
```jsx
setTimeout(() => {
    // f executes after 30 seconds
    // Will this demolish the UI and recreating it? No. That's good. But why? Because React is good at taking care of DOM updates and it does it efficiently.
    // The div, h1 are not recreated by the React Virtual DOM mechanism
    root.render(
        <div id="Setting up the app" className="message">
            <h1>Setting up the React app</h1>
            <p>
                We shall use <strong>create-react-app</strong> to
                set up the React app
            </p>
        </div>
    );
}, 10000);
```
- DOM updates may be because a UI re-renders (specifically component which we see next re-renders due to `prop` and `state` changes), or because the UI is replaced during navigation etc.
- ReactDOM makes sure the UI updates efficiently and DOM is recreated only for that part of the UI that has changed (this is not strictly true, but generally speaking is). Here the div DOM node remains the same before and after the re-render. The heading DOM node is also the same. The strong and text elements are discarded, and the paragraph is freshly created.
- For more information check DOM diffing and reconciliation.

## Step 5: Creating a function component
- Components are reusable, customizable and composable pieces of the UI. Let us create a custom `Button` component. Once the component is defined we can create multiple instances of it. Each instance can be customized using __props__ (like attributes of HTML elements).
- In a new file `04-Button-function-component.html`, define a function compoent. We include Font Awesome for icons.
```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Function component</title>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
    />
</head>
```
- Define the component in the script
```jsx
const Button = (props) => {
    console.log(props);

    return (
        <button>
            <i className="fa-solid fa-code"></i>
            <span> Code </span>
            <i className="fa-solid fa-caret-down"></i>
        </button>
    );
};
```
- Render instances of the component
```jsx
// We have 2 Button elements - 2 instances of the Button component
const el = (
    <div>
        <Button />
        <Button />
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(el);
```
- We now have 2 `Button` instances. `Button` is thus __reusable__. The component can be customized using custom __props__. Let's pass 2 custom props - `icon` and `title`
```jsx
// Props are used to customize elements in React
// The props that are passed will be gathered into an object
// { icon: "fa-code" }, { icon: "fa-eye" }
const el = (
    <div>
        <Button icon="fa-code" title="Code" />
        <Button icon="fa-eye" title="Unwatch" />
    </div>
);
```
- The props are gathered into an object and passed as an argument to the function component. We use interpolation to render the `title` prop, and render the desired icon using the passed CSS classes of Font Awesome.
```jsx
const Button = (props) => {
    console.log(props);

    return (
        <button>
            <i className={"fa-solid " + props.icon}></i>
            <span> {props.title} </span>
            <i className="fa-solid fa-caret-down"></i>
        </button>
    );
};
```
- Use destructuring to easily extract the individual props into conveniently variables
```jsx
const Button = ({ title, icon }) => {
    // convenient variables
    // const title = props.title;
    // const icon = props.icon;
    
    // object destructuring
    // const { title, icon } = props;

    return (
        <button>
            <i className={"fa-solid " + icon}></i>
            <span> {title} </span>
            <i className="fa-solid fa-caret-down"></i>
        </button>
    );
};
```
- Add an event handler for click on the caret icon. We define these handlers usually as functions within the function component - this way these handlers can use the variables available in the component, including props.
```jsx
const Button = ({ title, icon }) => {
    const clickHandler = () => {
        alert(`Button ${title} was clicked`);
    };

    return (
        <button>
            <i className={"fa-solid " + icon}></i>
            <span> {title} </span>
            <i
                className="fa-solid fa-caret-down"
                onClick={clickHandler}
            ></i>
        </button>
    );
};
```
- Click on the caret icon to view the alert

## Step 6: Creating a class component
- In a new file `05-Button-class-component.html`, define a class component.
    - A class component should inherit from `React.Component`
    - The `render` method is mandatory and returns the defined UI (React element)
    - Props will be in a data member called `props` (accessed in the class as `this.props`).
    - Event handlers can be set up using arrow function syntax (preferably) - this ensures the `this` is bound correctly in the method (to the class component instance). The method `clickHandler` needs to be referenced as `this.clickHandler`
```jsx
// props will be in a data member called props (this.props)
class Button extends React.Component {
    // event handler can be set up using arrow function syntax (preferably)
    clickHandler = () => {
        // const { title } = this.props;
        alert(`Button ${this.props.title} was clicked`);
    };

    render() {
        const { title, icon } = this.props;

        return (
            <button>
                <i className={"fa-solid " + icon}></i>
                <span> {title} </span>
                <i
                    className="fa-solid fa-caret-down"
                    onClick={this.clickHandler}
                ></i>
            </button>
        );
    }
}
```
- Add instances of this component in the UI and check the page
- __Note__: Class component instances are created the same way as function component instances (props are passed the same way).

## Step 7: JSX Fundamentals - Conditional rendering and List rendering
- Create `06-jsx-fundamentals.html` with an `Invoice` component. Pass it customer prop, and show the customer's name
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
        />
        <title>JSX Fundamentals</title>
    </head>
    <body>
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>

        <script type="text/babel">
            const Invoice = () => {
                return (
                    <div className="border border-dark p-4">
                        <h1>Invoice</h1>
                        <hr />
                        <div>Customer: {customer}</div>
                    </div>
                );
            };

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(
                <section className="container my-4">
                    <Invoice customer="John Doe" />
                    <Invoice customer="Jane Doe" />
                </section>
            );
        </script>
    </body>
</html>
```
- Props can be of any data type. When passing any prop that is not a literal string, we need to enclose it in braces. Let's pass `item` (an array), and `points` (a number). We make `points` an optional prop. If a prop is no passed, its value will be `undefined` (by default) in the component. Accept the props in the component and log them.
```jsx
const Invoice = ({ customer, points, items }) => {
    console.log(customer, points, items);
    
    return (
        <div className="border border-dark p-4">
            <h1>Invoice</h1>
            <hr />
            <div>Customer: {customer}</div>
        </div>
    );
};

const itemsJohn = [
    {
        id: 1001,
        name: "Camlin Pen",
        price: 50,
        quantity: 5,
    },
    {
        id: 1002,
        name: "Natraj Pencils",
        price: 10,
        quantity: 30,
    },
    {
        id: 1003,
        name: "A4 Sheets",
        price: 200,
        quantity: 2,
    },
];

const itemsJane = [
    ...itemsJohn,
    {
        id: 1004,
        name: "Apsara Eraser",
        price: 15,
        quantity: 5,
    },
];

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.Fragment>
        <Invoice
            customer="John Doe"
            points={250}
            items={itemsJohn}
        />
        <Invoice
            customer="Jane Doe"
            items={itemsJane}
        />
    </React.Fragment>
);
```
- Display the points passed conditionally. We display it only if it is passed. So it appears for John but not Jane. The `&&` operator works by short-circuiting. If the left hand side operand is falsy, it is simply the one on the left (i.e. if `points !== undefined` is `false`, the expression in braces is simply `false`, and his results in nothing being rendered in React JSX). On the other hand, if the left hand side operand is truthy, the expression evaluates to the right hand side operand, which in this case is a `<div></div>` React elemt. React elements when interpolated (used in braces), simply end up rendering the elemnt.
```jsx
<script type="text/babel">
const Invoice = ({ customer, points, items }) => {
    return (
        <div className="my-4">
            <h1>Tax Invoice</h1>
            <hr />
            <div>Customer: {customer}</div>

            {/* if */}
            {points !== undefined && (
                <div className="bg-info p-2">
                    You have {points} points
                </div>
            )}
        </div>
    );
};
```
- Let's say we need to display a promotional message instead for users who are not members. This calls for an __if..else__ kind of rendering requirement. We can do this using the conditional (ternary) operator.
```jsx
<script type="text/babel">
const Invoice = ({ customer, points, items }) => {
    return (
        <div className="my-4">
            <h1>Tax Invoice</h1>
            <hr />
            <div>Customer: {customer}</div>

            {/* if..else */}
            {points !== undefined ? (
                <div className="bg-info p-2">
                    You have {points} points
                </div>
            ) : (
                <div className="bg-info p-2">
                    Become a PRIME member to avail exciting
                    discounts
                </div>
            )}
        </div>
    );
};
```
- For rendering a list, we can interpolate an array of React elements (pass an array of React eleemnts in braces). This ends up rendering every React element that is an item in the list, in order. Array `map` method is a convenient way to generate such a list (for every item in items, we generate a corresponding React `tr` element in an array, which is then rendered). When rendering a list of items, it is recommended to set a `key` prop in every item. This is to be set to a value that is unique to every item, and is stable (Does not change as the list o the items change). The key enables the React Virtual DOM mechanism of making DOM updates efficient, and is especially needed in case of long lists.
```jsx
<script type="text/babel">
const Invoice = ({ customer, points, items }) => {
    return (
        <div className="my-4">
            <h1>Tax Invoice</h1>
            <hr />
            <div>Customer: {customer}</div>

            {/* if..else */}
            {points !== undefined ? (
                <div className="bg-info p-2">
                    You have {points} points
                </div>
            ) : (
                <div className="bg-info p-2">
                    Become a PRIME member to avail exciting
                    discounts
                </div>
            )}

            {/* list rendering */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
```

## Step 8: State and Event handling
- We would like to delete items. The list to be rendered would change with time (as user deletes items), and the UI should update to show the (reduced) set of items - this calls for `state` to be maintained by the component. Make a copy of the final result from the previous step in `07-state-and-event-handling.html`. Now add, a column for actions (like delete), and a button on every row.
```html
<table className="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total price</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {items.map((item, idx) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td>
                    <button className="btn btn-sm btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
```
- Add a `deleteItem` method. We set up this method to be called from an inline event handler called on click of the delete button. This way, the method can receive the `event` handler (passed to event handlers), and any other extra arguments (in this case the `item` of the iteration, i.e the one that needs to be deleted).
```jsx
const deleteItem = (event, item) => {
    console.log(event, item);
};
```
```jsx
<table className="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total price</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {items.map((item, idx) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={(event) =>
                            deleteItem(event, item)
                        }
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
```
- You can see the event object, and the item to be deleted logged in the console, when you click on the buttons
- We now set up a state to hold the set of remaining items (after items are removed as user clicks to remove the items). Let's call it `curItems`. We use `useState()` to hold this. Initially it is the `items` passed as a prop. As items are deleted, we update `curItems` using the setter `setCurItems`. When a state is set, React re-renders the component (calls the function component to get the updated UI and renders it)
```jsx
const Invoice = ({ customer, points, items }) => {
    // useState() is used to create a state variable
    // const curItems = arr[0]; // current items
    // const setCurItems = arr[1]; // setter function to change the items
    const [curItems, setCurItems] = React.useState(items);
    console.log(curItems);
    console.log(setCurItems);

    const deleteItem = (event, item) => {
        // compare it vs item...
        // const newCurItems = curItems.filter(
        //     (it) => it !== item
        // );

        // ...or compare it.id vs item.id
        const newCurItems = curItems.filter(
            (it) => it.id !== item.id
        );

        // Hey React! Please update curItems with this new value
        setCurItems(newCurItems); // React will re-render the component, i.e. React runs this function again
    };

    return (
        <div className="my-4">
            {/* existing UI */}
        </div>
    );
};
```
- The delete functionality should now work.

## Step 9: Notes on hooks
- `useState` is a hook. Hooks are a set of methods that can be used only in function components, or in function called within function component code at the "top-level"
- Some other hooks - `useState`, `useReducer`, `useEffect`, `useRef`, `useContext`, `useCallback`, `useMemo`
- Till React 16.7 - class components were more powerful than function components. In React 16.8 hooks were introduced.
- Each hook adds some missing feature to function components
- __Rules of hooks__
    - Hooks will throw an error if used in class components
    - They can be used in function components, or functions called within function components (at the top-level). Such functions are called __custom hooks__.
    - Hooks can be called only in the top-level - cannot be used in event handlers, cannot be used in if block, for loop etc. in the component

## Step 10: Handling side-effects in function components
- In React, the component function should be pure - the UI is a function of __props__, __context__ (similar to props and covered later) and __state__ only.
- A __side effect__ refers to any operation that interacts with the outside world or modifies a component's state in a way that isn't directly related to rendering. Examples of side effects include:
    - Fetching data from an API
    - Subscribing to events (e.g., WebSockets, timers, intervals)
    - Manipulating the DOM (e.g., changing the document title)
    - Storing data in local storage or interacting with external services
- The `useEffect` hook is used to handle side effects in functional components. It runs after the render and can be configured to re-run based on dependencies. The dependencies prevent the component from rendering in a recursive manner without end.
- React ensures the effects run after rendering, not during it
- If a side effect like state updates happens inside the component body, it will cause re-renders during rendering itself, leading to an infinite loop. Example
```jsx
const MyComponent = () => {
  const [count, setCount] = useState(0);

  setTimeout(() => setCount(count + 1), 1000); // ❌ Infinite re-renders

  return <p>Count: {count}</p>;
};
```
- We create a `WorkshopsList` component in `08-handling-side-effects-using-useEffect.html`
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Handling side-effects - useEffect</title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
        />
    </head>
    <body>
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

        <script type="text/babel">
            const WorkshopsList = () => {
                return (
                    <div className="container my-4">
                        <h1>List of workshops</h1>
                        <hr />
                    </div>
                );
            };

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(<WorkshopsList />);
        </script>
    </body>
</html>
```
- We add a state `loading` which indicates whether a API call to fetch workshops is in progress. We shall make this API call as the component loads (shows up on the page for the first time). First add this state, and show a spinner for as long as the state is `true`
```jsx
const WorkshopsList = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />

            {loading === true && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
```
- We add `axios` script to help make API calls
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.8/axios.min.js"></script>
```
- Define a method (outside the component), to fetch workshops. We fetch the first page of workshops by default
```js
// Note: async functions ALWAYS return a Promise object
const getWorkshops = async (page = 1) => {
    const response = await axios.get(
        `https://workshops-server.onrender.com/workshops`,
        {
            params: {
                _page: page
            }
        }
    );

    return response.data;
};
```
- Define `workshops`, `error` states and set up the API call to be initiated on component load
```jsx
const WorkshopsList = () => {
    const [loading, setLoading] = React.useState(true);
    const [workshops, setWorkshops] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(
        // side-effects can return undefined, or need to return a function called a cleanup function
        // async function returns a Promise, therefore you cannot make the side-effect function async
        () => {
            setLoading(true);

            const helper = async () => {
                try {
                    const workshops = await getWorkshops(page);

                    console.log(workshops);

                    setWorkshops(workshops);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            helper();
        },

        // dependency array
        // If we give [] for the dependency array, the side-effect runs only when the components loads for the first time (appears on the screen) - the effect does not depend on any other variable changes
        [] 
    );

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />

            {loading === true && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            )}

            {error !== null && loading === false && (
                <div class="alert alert-danger" role="alert">
                    {error.message}
                </div>
            )}

            {
                error === null && loading === false && (
                    workshops.map((w) => (
                        <div key={w.id}>{w.name}</div>
                    ))
                )
            }
        </div>
    );
};
```
- __EXERCISE__: The useEffect effect function can return a __cleanup function__ (before an effect runs, the cleanup function returned by the previous run of the effect function, runs). Explore it.
