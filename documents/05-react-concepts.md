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
    - Event handlers can be set up using arrow function syntax (preferably) - this ensures the function context (`this`) is bound correctly in the method (to the class component instance). Another popular way to set up the correct binding for the function context is using the `bind()` method for functions (You can bind the context for the `clickHandler` method in the constructor for example). The method `clickHandler` needs to be referenced as `this.clickHandler`.
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

## Step 8: State and Event handling (`useState` hook)
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

## Step 10: Handling side-effects in function components (`useEffect`)
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
- __EXERCISE__: The function passed as the argument to `useEffect` can return a __cleanup function__ (before an effect runs, the cleanup function returned by the previous run of the effect function, runs). Explore it.

## Step 11: Running side-effects in reaction to state or prop changes (`useEffect` with dependencies)
- Many times we would like to run these side-effects when a state or prop for the component changes. We can do this by adding the state / prop dependencies in the dependencies array of `useEffect`.
- Let us say we would like to implement pagination for the `WorkshopsList` component. Let us provide the UI for pagination. In `08-handling-side-effects-using-useEffect.html` add the UI.
```jsx
<h1>List of workshops</h1>
<hr />

<!-- Add this -->
<div className="my-4">
    <button className="btn btn-sm btn-primary me-2" onClick={previous} disabled={loading}>Previous</button>
    <button className="btn btn-sm btn-primary" onClick={next} disabled={loading}>Next</button>
    <div>You are viewing page {page}</div>
</div>
```
- Add the state to maintain page number. Initially the first page loads.
```jsx
const [page, setPage] = React.useState(1);
```
- Add the `next` and `previous` click event handlers
```jsx
const previous = () => {
    if( page <= 1 ) {
        return;
    }

    // If the new state depends on the current state, use the function form of the state setter to make the state change
    setPage(p => p - 1);
};

const next = () => {
    // This backend does not return the total count of pages - else we could prevent change of page on the last page like so...
    // if( page === numPages ) {
    //     return;
    // }

    // If the new state depends on the current state, use the function form of the state setter to make the state change
    setPage(p => p + 1);
}
```
- __NOTE__: The state is set asyncronously by React (i.e. not as soon as you call the setter function for the state). If the new state depends on the current state, it is better to use the function form of the setter - this is called when React is actually about to change the state and receives the current value state. You should use this value passed as the argument to generate and return the new value of state. This ensures that state updates correctly even when the setter is called synchronously (multiple times in the same render cycle).
- Modify the service method to accept a `page` argument and get only the workshops for the required page
```jsx
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
- Finally, update the `useEffect` call to make the call to the backend when `page` changes. Pass the `page` to `getWorkshops()`. Also add `page` to the dependencies array.
```jsx
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
    // We need to run the effect when page changes - hence add `page` to the array
    [ page ] 
);
```
- You should now be able to move from one page to another.
- __NOTE__: We have seen a state variable being added to the dependencies array. This array, in general, can have state, props or context values (Context API is covered later).

## Step 12: Handling state And effects in class components (`componentDidMount`)
- We create a `WorkshopsList` component in `09-handling-state-and-side-effects-class-components.html`. The `getWorkshops` service method remains the same.
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Handling state and side-effects - Class components</title>
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.8/axios.min.js"></script>

        <script type="text/babel">
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

            class WorkshopsList extends React.Component {
                render() {
                    return (
                        <div className="container my-4">
                            <h1>List of workshops</h1>
                            <hr />
                        </div>
                    );
                }
            }

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(<WorkshopsList />);
        </script>
    </body>
</html>
```
- We add states `loading`, `workshops`, `error`, to an property called `state` (always an object). The state can be set directly, or inside a constructor (do not forget to call the super class constructor in this case). As before, we show a spinner for as long as the `loading` state is `true` (we destructure in order to avoid accessing the props using `this` each time).
```jsx
class WorkshopsList extends React.Component {
    // The base class - React.Component, has a method called `setState()` which is used to make the state changes
    // Option 1: Initialize the state directly
    state = {
        loading: true,
        workshops: [],
        error: null,
        page: 1
    };

    // Option 2: Initialize the state in a constructor - do not forget to call the super class constructor in this case!
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loading: true
    //     };
    // }

    render() {
        const { loading, workshops, error } = this.state;

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
    }
}
```
- We set up the API call to be initiated on component load - this is done in the `componentDidMount` lifecycle method which is called once - AFTER the first render (i.e. on DOM render - when the component shows up on the screen for the first time, after a page loads). The `setState()` method inherited from the base `React.Component` class is used to update the state. Only values to be updated are passed in the object passed an argument to `setState`. When state updates, React, as always, re-renders the component.
```jsx
class WorkshopsList extends React.Component {
    // state setup etc.
    // ...

    render() {
        const { loading, workshops, error } = this.state;

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
        )
    }

    // Is called AFTER the first render, and never again
    // equivalent to calling useEffect and passing []
    async componentDidMount() {
        // In the object passed to setState() you include only the state properties you want to change - the other state properties maintain their current values
        this.setState({
            loading: true
        });

        try {
            const workshops = await getWorkshops();

            this.setState({
                loading: false,
                // workshops: workshops
                workshops
            });
        } catch (error) {
            this.setState({
                loading: false,
                // error: error
                error
            });
        }
    }
}
```
- You should see the first page of wokshops being shown now.
- __NOTE__: The `setState` method has a function form which is recommended to be used when the new state depends on the current state.
- __EXERCISE__: Class components have a __cleanup lifecycle method__ called `componentWillUnmount` (runs just once - before the component is removed from the DOM, i.e. it disappears from the screen). Explore it.

## Step 13: `componentDidUpdate` - Running side-effects in reaction to state or prop changes in class components
- Let us now implement pagination in class component. We add page state. We also the UI for pagination and methods for moving to the next and previous pages (they change the `page` state). Since state changes are asynchronous, we prefer using the __overload__ of `setState` that takes a function as an argument - this is the recommended way when the new state depends on the current state (rg. new page number depends on the current value of the page number).
```jsx
state = {
    loading: true,
    workshops: [],
    error: null,
    page: 1
};
```
```jsx
previous = () => {
    if( this.state.page <= 1 ) {
        return;
    }

    // object argument of setState()
    // this.setState({
    //     page: this.state.page - 1
    // })

    // function argument of setState() -> use this when the new state depends on the current state
    this.setState(curState => {
        return {
            page: curState.page - 1
        };
    });
};

next = () => {
    // if( this.state.page === numPages ) {
    //     return;
    // }

    // If the new state depends on the current state, use the function form of the state setter to make the state change
    this.setState(curState => {
        return {
            page: curState.page + 1
        };
    });
}
```
```jsx
<h1>List of workshops</h1>
<hr />

<div className="my-4">
    <button className="btn btn-sm btn-primary me-2" onClick={this.previous} disabled={loading}>Previous</button>
    <button className="btn btn-sm btn-primary" onClick={this.next} disabled={loading}>Next</button>
    <div>You are viewing page {page}</div>
</div>
```
- There is a lifecycle method that is called AFTER `render` runs when prop / state changes - this is `componentDidUpdate`. It receives the old value of props and state. We check what prop / state actually changed and execute some logic appropriately. It is very important to do this check - else you may end up with endlessly running render cycles due to repeated state changes! Since the logic for `componentDidMount` and `componentDidUpdate` is largely the same, we isolate the common code into a new method - `getWorkshops`.
```jsx
async getWorkshops() {
    // In the object passed to setState() you include only the state properties you want to change - the other state properties maintain their current values
    this.setState({
        loading: true
    });

    try {
        const workshops = await getWorkshops(this.state.page);

        this.setState({
            loading: false,
            // workshops: workshops
            workshops
        });
    } catch (error) {
        this.setState({
            loading: false,
            // error: error
            error
        });
    }
}

// Is called AFTER the first render, and never again
// equivalent to calling useEffect and passing []
async componentDidMount() {
    this.getWorkshops();
}

// called when props / state changes
// is called AFTER second render, AFTER third render (i.e. AFTER every re-render)
async componentDidUpdate(prevProps, prevState) {
    if( prevState.page !== this.state.page) { // similar to having a dependency array in useEffect() in functon component
        this.getWorkshops();
    }
}
```
- You should now be able to move from one page to another.
- __NOTE__: The creators of React realized that these 2 lifecycle methods often share common logic, and hence designed the `useEffect` hook (for function components) in such a way that sharing such logic is natural!

## Step 14: The `useReducer` hook
- `useReducer` is a hook that can be used in place of `useState` to maintain component state. It is no more, or no less powerful than `useState`. However it's advantage is that it can encapsulate the logic behind multiple related state changes in one function (referred to as the __reducer__), thereby making the component state changes obvious and clear to the developer.
- Let us rewrite `WorkshopsList` component to instead maintain state using `useReducer`. Create `10-useReducer-workshops-list.html`.
    - In it add a reducer function - we shall fill in the code for it later. The reducer function is called every time the components initiates a change of state - it is passed the current state, and an __action__. An action, as we shall see, is an object that captures the requested state change in the form of an object.
    - The state is maintained (usually) as an object when using `useReducer` - it is passed along with the reducer function. The state object captures multiple pieces of related state.
    - The `useReducer` hook returns the current state object, and a `dispatch` method (which is used to initiate state changes and is similar to the setter function returned by `useState`).
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Maintaining state - useReducer</title>
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.8/axios.min.js"></script>

        <script type="text/babel">
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

            // Given the current state, and action (what happened in the app), reducer returns the new state
            const workshopsReducer = (curState, action) => {
                // We shall fill the code later
                // ...
            };

            const WorkshopsList = () => {
                const [state, dispatch] = React.useReducer(
                    workshopsReducer,
                    {
                        loading: true,
                        workshops: [],
                        error: null
                    }
                );

                const { loading, workshops, error } = state;

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

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(<WorkshopsList />);
        </script>
    </body>
</html>
```
- We now add side-effect to initiate data fetch on component mount. The `dispatch` method is used to initiate state changes (like the setter method when using `useState`).
    - The `dispatch` method is passed an __action__.
    - An action is an object with a `type` property that uniquely identifies the kind of state change required.
    - Any extra information to be passed to the reducer is conventionally added inside a property called __payload__ (although it can be called anything else).
    - When an action is dispatched, React calls the reducer function, and passes it the current state and the action.
    - We define add below the action types as well - they must be unique and are usually string values that enable the identify the type of state change needed.
```jsx
const FETCHING = 'FETCHING';
const FETCHED_WORKSHOPS = 'FETCHED_WORKSHOPS';
const ERROR_FETCHING_WORKSHOPS = 'ERROR_FETCHING_WORKSHOPS';

const WorkshopsList = () => {
    // state set up using useReducer
    // ...

    React.useEffect(
        () => {
            /**
             * action will be an object with `type` indicating what happened in the component
             *  {
                    type: 'FETCHING'
                }
                *
                */
            dispatch({
                type: FETCHING
            });

            const helper = async () => {
                try {
                    const workshops = await getWorkshops();
                    // the extra info to be passed to the reducer is conventionally put inside payload: {}
                    // When dispatch is called -> React will call workshopsReducer like so...
                    // workshopsReducer(
                    //     { // curState
                    //         loading: true,
                    //         workshops: [],
                    //         error: null,
                    //         page: 1
                    //     },
                    //     { // action
                    //         type: 'FETCHED_WORKSHOPS',
                    //         payload: {
                    //             // workshops: workshops
                    //             workshops
                    //         }
                    //     }
                    // )

                    dispatch({
                        type: FETCHED_WORKSHOPS,
                        payload: {
                            // workshops: workshops
                            workshops
                        }
                    });
                } catch (error) {
                    dispatch({
                        type: ERROR_FETCHING_WORKSHOPS,
                        // error: error
                        error
                    });
                }
            };

            helper();
        },
        []
    );

    // rest of code
    // ...
}
```
- Now define the reducer that is called when actions are dispatched. The reducer checks the current state and action and returns the new state. If it does not handle an action it must return the state unchanged.
    - The reducer MUST be a __pure function__
        - Should not change the arguments it receives (state and action)
        - Should not use global state or functions
        - Should be deterministic - should return a well-determined value for every combination of state and action
    - Since it should not changes the current state, we commonly use the spread operator to create copies of objects when creating the new state to be returned.
```jsx
// Given the current state, and action (what happened in the app), reducer returns the new state
const workshopsReducer = (curState, action) => {
    let newState;

    switch(action.type) {
        case FETCHING:
            newState = {
                ...curState, // spread the curState -> copies all properties in the current state object
                loading: true,
            };
            break;
        case FETCHED_WORKSHOPS:
            // arr = [1, 2, 3, 4]
            // x = [ ...arr ] // [ 1, 2, 3, 4 ]
            // x[3] = 5 // [ 1, 2, 3, 5 ]
            newState = {
                ...curState, // spread the curState -> copies all properties in the current state object
                loading: false,
                workshops: action.payload.workshops
            };
            break;
        case ERROR_FETCHING_WORKSHOPS:
            newState = {
                ...curState, // spread the curState -> copies all properties in the current state object
                loading: false,
                workshops: action.payload.error
            };
            break;
        default:
            newState = curState; // no state change

    }

    return newState;
};
```
- You should now be able to see the workshops load.
- __TIP__: If you have many pieces of state related to each other that go hand-in-hand, and there are many state changes related to them (like in this example), go for `useReducer` (if it appeals to you).

## Step 15: Exercise - Setting up pagination using the reducer
- Can you set up pagination using the reducer?
    - Add page state, and call the service, passing the page - add page as a dependency for the effect
    - Add action types for page change requests (__NEXT_PAGE__ and __PREVIOUS_PAGE__, say)
    - Add the UI for pagination
    - Dispatch actions in `next` and `previous` methods
    - Add state change logic for these new actions, inside the reducer
__Solution__
- Add page state, and call the service, passing the page - add page as a dependency for the effect
```jsx
const [state, dispatch] = React.useReducer(
    workshopsReducer,
    {
        loading: true,
        workshops: [],
        error: null,
        page: 1
    }
);

const { loading, workshops, error, page } = state;
```
```jsx
React.useEffect(
    () => {
        dispatch({
            type: FETCHING
        });

        const helper = async () => {
            try {
                const workshops = await getWorkshops(page);
                
                // rest of code...
                // ...
            } catch (error) {
                // ...
            }
        }

        helper()
    },
    [ page ]
);
```
- Add action types for page change requests (__NEXT_PAGE__ and __PREVIOUS_PAGE__, say)
```jsx
const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
const NEXT_PAGE = 'NEXT_PAGE';
```
- Add the UI for pagination
```jsx
<div className="my-4">
    <button className="btn btn-sm btn-primary me-2" onClick={previous} disabled={loading}>Previous</button>
    <button className="btn btn-sm btn-primary" onClick={next} disabled={loading}>Next</button>
    <div>You are viewing page {page}</div>
</div>
```
- Dispatch actions in `next` and `previous` methods
```jsx
const previous = () => {
    if( page <= 1 ) {
        return;
    }

    dispatch({
        type: PREVIOUS_PAGE
    });
};

const next = () => {
    dispatch({
        type: NEXT_PAGE
    });
}
```
- Add state change logic for these new actions, inside the reducer
```jsx
case PREVIOUS_PAGE:
    newState = {
        ...curState,
        page: curState.page - 1
    };
    break;
case NEXT_PAGE:
    newState = {
        ...curState,
        page: curState.page + 1
    };
    break;
```
- You should now be able to move from one page to another.

## Step 16: Higher-Order Component (HOC) - A design pattern for sharing logic in class components
- Often multiple components need to implement some common feature and hence need to share logic. Examples include
    - pagination
    - filtering a list
    - etc.
- For class components, this is typically done by following a design pattern called __Higher-Order Component (HOC)__. We shall learn this pattern through the following steps (building 2 components that both need a "counter" feature)
    1. Build two components that share counter functionality
    2. Identify repeated logic
    3. Refactor the logic using a Higher-Order Component (HOC)
- Start with Basic Components. In `11-hoc.html` we create two independent components — `WorkshopsList` and `Counter` — that both have their own counter logic.
```jsx
class WorkshopsList extends React.Component {
  state = { value: 1 };

  nextValue = () => {
    this.setState({ value: this.state.value + 1 });
  };

  previousValue = () => {
    this.setState({ value: this.state.value - 1 });
  };

  render() {
    return (
      <div className="card p-3 my-3">
        <h4>List of Workshops</h4>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={this.previousValue}>&lt;</button>
          <span className="fs-5">{this.state.value}</span>
          <button className="btn btn-outline-primary" onClick={this.nextValue}>&gt;</button>
        </div>
        <p className="text-muted mt-2">(Other workshop content would go here)</p>
      </div>
    );
  }
}

class Counter extends React.Component {
  state = { value: 1 };

  nextValue = () => {
    this.setState({ value: this.state.value + 1 });
  };

  previousValue = () => {
    this.setState({ value: this.state.value - 1 });
  };

  render() {
    return (
      <div className="card p-3 my-3">
        <h4>Counter</h4>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={this.previousValue}>-</button>
          <span className="fs-5">{this.state.value}</span>
          <button className="btn btn-outline-success" onClick={this.nextValue}>+</button>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="container my-4">
    <WorkshopsListContainer />
    <CounterContainer />
  </div>
);
```

- Both components manage counter logic **independently** — not ideal if logic needs to be reused or updated later. We refactor to Create a Higher-Order Component. We extract the shared logic into a reusable **HOC** that can wrap any component needing a counter.
- Conventionally, the names of HOCs begin with `with`
- Note that the name `Higher-Order Component` is a bit misleading. HOC is a __function__ that creates a wrapper component for the given component, and returns the wrapper

```jsx
const withCounter = (WrappedComponent) => {
  return class extends React.Component {
    state = { value: 1 };

    nextValue = () => {
      this.setState({ value: this.state.value + 1 });
    };

    previousValue = () => {
      this.setState({ value: this.state.value - 1 });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          nextValue={this.nextValue}
          previousValue={this.previousValue}
        />
      );
    }
  };
};
```
- This HOC provides `value`, `nextValue()`, and `previousValue()` as **props** to any component it wraps
- Next, we refactor the components to use the `withCounter` HOC
- `WorkshopsList` (with HOC props)
```jsx
class WorkshopsList extends React.Component {
  render() {
    return (
      <div className="card p-3 my-3">
        <h4>List of Workshops</h4>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={this.props.previousValue}>&lt;</button>
          <span className="fs-5">{this.props.value}</span>
          <button className="btn btn-outline-primary" onClick={this.props.nextValue}>&gt;</button>
        </div>
        <p className="text-muted mt-2">(Other workshop content would go here)</p>
      </div>
    );
  }
}
```
- `Counter` (with HOC props)

```jsx
class Counter extends React.Component {
  render() {
    return (
      <div className="card p-3 my-3">
        <h4>Counter</h4>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={this.props.previousValue}>-</button>
          <span className="fs-5">{this.props.value}</span>
          <button className="btn btn-outline-success" onClick={this.props.nextValue}>+</button>
        </div>
      </div>
    );
  }
}
```
- Wrap them using the HOC
```jsx
const WorkshopsListContainer = withCounter(WorkshopsList);
const CounterContainer = withCounter(Counter);
```
- Render It All (use the generated container component , i.e. wrapper component)
```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="container my-4">
    <WorkshopsListContainer />
    <CounterContainer />
  </div>
);
```
- __NOTES__:
- HOCs are often written as functions that return functions (following the __function currying / partial argument application pattern__ that aids function composition using composition helpers). This helps customize generated container components by accepting arguments in the HOC, and customizing the container accordingly - eg. to have different initial values for the counter in 2 components. This is covered in the next (optional) step. Note that we cover this is shared logic for function component (in the section on custom hooks that follows).
- HOCs are not important nowadays as class components have fallen out of favor. The main reason for class components being discouraged is in fact the complexity for sharing logic using HOCs. Custom hooks that do this for function components are much simpler and easier to understand!

## Step 17 (Optional) - Refactor to support HOC composition - Create a Higher-Order Component with Initial Value Support
- We will refactor the logic for HOCs to enable easy composition (using more than one HOC using a function composition helper). An example of this would be how the `connect` function of earlier versions `react-redux` worked (to support class components in an app using Redux).
- We extract the shared logic into a reusable **HOC** using __function currying / partial argument application pattern__. This allows us to pass an **initial value** to the counter state.

```jsx
const withCounter = (initialValue) => (WrappedComponent) => {
  return class extends React.Component {
    state = { value: initialValue };

    nextValue = () => {
      this.setState({ value: this.state.value + 1 });
    };

    previousValue = () => {
      this.setState({ value: this.state.value - 1 });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          nextValue={this.nextValue}
          previousValue={this.previousValue}
        />
      );
    }
  };
};
```
- Refactor the components to use the refactored HOC
```jsx
const WorkshopsListContainer = withCounter(1)(WorkshopsList);
const CounterContainer = withCounter(10)(Counter);
```

## Step 18: Custom Hooks in React – Counter Refactor Tutorial
- Custom hooks are how we share logic for a common features across function-based components. Custom hooks maintain shared state, effect logic etc. (they will use one or more built-in React hooks).
- In `12-custom-hooks.html`, start with the same 2 components, now rewritten using functions. Rewrite the `WorkshopsList` and `Counter` as function components. Use `useState` for maintaining state. This is left as an exercise. 
- Next we create a custom hook for the shared logic. - create the `useCounter` hook. Note that the names of hooks (including custom hooks) are conventionally prefixed with `use`.
```jsx
function useCounter(initialValue = 0) {
  const [value, setValue] = React.useState(initialValue);

  const nextValue = () => setValue((v) => v + 1);
  const previousValue = () => setValue((v) => v - 1);

  return { value, nextValue, previousValue };
}
```
- Refactor the function components to use the `useCounter` custom hook
- `WorkshopsList` (function version)
```jsx
function WorkshopsList() {
  const { value, nextValue, previousValue } = useCounter(1);

  return (
    <div className="card p-3 my-3">
      <h4>List of Workshops</h4>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary" onClick={previousValue}>&lt;</button>
        <span className="fs-5">{value}</span>
        <button className="btn btn-outline-primary" onClick={nextValue}>&gt;</button>
      </div>
    </div>
  );
}
```
- `Counter` (function version)
```jsx
function Counter() {
  const { value, nextValue, previousValue } = useCounter(10);

  return (
    <div className="card p-3 my-3">
      <h4>Counter</h4>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary" onClick={previousValue}>-</button>
        <span className="fs-5">{value}</span>
        <button className="btn btn-outline-success" onClick={nextValue}>+</button>
      </div>
    </div>
  );
}
```
- Obviously custom hooks are a very natural way to share stateful logic. In fact it cannot be even called a pattern. HOCs are surely more complex. This is the main reason we prefer using function components.

## Step 19: "Lifting state" (sharing state across components)
- When 2 components need access to a common state, where do we maintain it, and how doe= the components get the state / setter for the state?
- Such shared state is maintained in a common ancestor of the components in the component tree. This way we can __drill down the props__ to the components (React supports only top-down flow of data through props).
- In `13-lifting-state-props-drilling.html`, we build a `Panel` component with `PanelQuestion` and `PanelAnswer` as child components.
```css
.panel {
    border: 1px solid #333;
    border-radius: 4px;
    margin: 16px;
}

.panel-question,
.panel-answer {
    padding: 1em;
}

.panel-question {
    background-color: #333;
    color: ivory;
}
```
```jsx
const PanelQuestion = ({ question }) => {
  return (
    <div className="panel-question">
      {question}
    </div>
  );
};

const PanelAnswer = ({ children }) => {
  return <div className="panel-answer">{children}</div>;
};

const Panel = ({ question, children }) => {
  return (
    <div className="panel">
      <PanelQuestion question={question} />
      <PanelAnswer>{children}</PanelAnswer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div className="container my-4">
        <Panel
            question="What is React?"
            answer="It is a library for frontend apps"
        />
        <Panel
            question="What is Redux?"
            answer="It is a state management library"
        />
    </div>
);
```
- We would like to add and remove the `PanelAnswer` when `PanelQuestion` is clicked.
    * We do require state to maintain the visible / hidden status of the `PanelAnswer` component instance
    * At the same time we should be able to toggle this state when the `PanelQuestion` is clicked
    * A boolean will do as there are only 2 possible values for the state
    * But where can we maintain this state? Since both children need access to the state / setter for the state, we store this shared state in their common ancestor, i.e. the parent `Panel` component. We also define a helper `toggle` function that is passed as a __callback prop__ (i.e. a _function prop_).
```jsx
const PanelQuestion = ({ question, toggle }) => {
    return (
        <div className="panel-question" onClick={toggle}>
            {question}
        </div>
    );
};

const PanelAnswer = ({ answer, show }) => {
    return show ? (
        <div className="panel-answer">{answer}</div>
    ) : null;
};

const Panel = ({ question, answer }) => {
    const [show, setShow] = React.useState(true);

    const toggle = () => {
        setShow((s) => !s);
    };

    return (
        <div className="panel">
            <PanelQuestion question={question} toggle={toggle} />
            <PanelAnswer answer={answer} show={show} />
        </div>
    );
};
```
- __TAKEAWAY__: When you need state shared between multiple components, one way is to create that state in a common ancestor, and drill it down the component hierarchy as props. Later (in the workshops app) we see the problem associated with props drilling, and how the __Context API__ of React, or an external state management library like __Redux__ helps overcome it.

## Step 20: Performance optimization: `React.memo()` and `React.useCallback()` – Preventing unnecessary re-renders when props do not change (especially when passing callback props)
- In this example we optimize component rendering in React using `React.memo()` and `React.useCallback()` hook. We'll go step-by-step, starting with a base version and incrementally enhancing it. We will use the `Panel` component created above as the starting ppoint.
    * We demonstrate unnecessary re-renders.
    * Then prevent them using `React.memo()` and `React.useCallback()`

- In `14-preventing-unnecessary-renders-memo-and-useCallback.html`, we add logs in the function components to see when they render. You can also track re-renders along with rendering time etc. in the Profiler tab that comes with React Developer Tools extension for Chrome.
```jsx
const PanelQuestion = ({ question, toggle }) => {
  console.log("PanelQuestion");

  return (
    <div className="panel-question" onClick={toggle}>
      {question}
    </div>
  );
};

const PanelAnswer = ({ children, open }) => {
  console.log("PanelAnswer");

  return open ? <div className="panel-answer">{children}</div> : null;
};

const Panel = ({ question, children }) => {
  console.log("Panel");

  const [open, setOpen] = React.useState(true);

  const toggle = () => setOpen((s) => !s);

  return (
    <div className="panel">
      <PanelQuestion question={question} toggle={toggle} />
      <PanelAnswer open={open}>{children}</PanelAnswer>
    </div>
  );
};
```
- Try it and check the console logs — clicking toggles the panel but re-renders all components. Would `PanelQuestion` need to be re-rendered? No! Its UI does not changes across renders. Usually such unnecessary re-renders do not harm the performance (virtual DOM takes care of preventing DOM manipulation when not necessary anyway), but sometimes when the UI is large (there are many descendant components of the unnecessarily rendered component), it can hurt. Can we do better?
- This is where React.memo() comes in. Normally, when a parent component re-renders, React also re-invokes the render function of its child components. Even if the child’s props haven’t changed, this can still happen. By wrapping a function component in React.memo(), React will _skip re-rendering_ that component __if its props are shallowly equal to the previous render__, preventing unnecessary re-renders (you can pass a _custom comparison function_ if you need _deeper checks_ - left for you to explore).
- __NOTE__: State changes inside the child or changes to context values (the _Context API_) will still trigger re-renders, even with `React.memo()`
- Wrap `PanelQuestion` in `React.memo`:

```jsx
const PanelQuestion = React.memo(({ question, toggle }) => {
  console.log("PanelQuestion");

  return (
    <div className="panel-question" onClick={toggle}>
      {question}
    </div>
  );
});
```
- This should prevent unnecessary re-render. Try it. But you will see it re-render still every time you click the question! Why?
- The subtlety lies in th fact that the `toggle` callback prop is an inner function (a local variable within the `Panel` function) that gets recreated every time `Panel` runs, i.e. renders. Therefore, we need to prevent it from being recreated unnecessarily and this is where `React.useCallback` hook (used with callback props) comes in.
- Update `Panel` to wrap `toggle` using `React.useCallback`. This memoizes the function, and it shall be recreated only when its dependenc, i.e. `setOpen` is recreated (which never happens as the setter function for a state is stable).
```jsx
const toggle = React.useCallback(() => setOpen((s) => !s), [setOpen]);
```
- __IMPORTANT__: Using both `React.memo()` and `React.useCallback()` in tandem is key when optimizing deeply nested or frequently updated components (and passing callback props).

## Step 21: Performance optimization: `React.useMemo()` – Optimizing Expensive Computations inside components
- We see how to use `useMemo()` to optimize performance in React components. We'll walk through a real-world use case where filtering a large dataset can become a performance bottleneck when unrelated state changes occur.
- Set Up the App without `useMemo` in `15-memoizing-costly-computations-useMemo.html`. Create a large list of todos.
```html
<!-- ! + Enter -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

        <script type="text/babel">
            const getTodos = () => {
                const todos = [];

                for (let i = 0; i < 200000; ++i) {
                    todos.push({
                        id: i + 1,
                        task: "Task " + (i + 1),
                        done: Math.random() < 0.5,
                    });
                }

                return todos;
            };

            const todos = getTodos();

            const App = () => {
                const [tab, setTab] = React.useState("all");
                const [theme, setTheme] = React.useState("white");

                return (
                    <React.Fragment>
                        <button onClick={() => setTab("all")}>All</button>
                        <button onClick={() => setTab("done")}>Done</button>
                        <button onClick={() => setTab("not done")}>Not done</button>

                        <button onClick={() => setTheme(theme === "white" ? "black" : "white")}>
                            Toggle theme
                        </button>

                        <TodosFilter todos={todos} tab={tab} theme={theme} />
                    </React.Fragment>
                );
            };

            const filterTodos = (todos, tab) => {
                switch (tab) {
                    case "all":
                        return todos;
                    case "done":
                        return todos.filter((item) => item.done);
                    case "not done":
                        return todos.filter((item) => !item.done);
                }
            };

            const TodosFilter = ({ todos, tab, theme }) => {
                const filteredTodos = filterTodos(todos, tab);

                return (
                    <div
                        style={{
                            backgroundColor: theme,
                            color: theme === "white" ? "black" : "white",
                        }}
                    >
                        {
                            filteredTodos.map(
                                (todo) => (
                                    <div key={todo.id}>{todo.task}</div>
                                )
                            )
                        }
                    </div>
                );
            };


            const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
            root.render(
                <App />
            );
        </script>
    </body>
</html>
```
- The problem is when you try to change the theme by clicking on the "Toggle theme" button - it will take some time. Even though switching themes is unrelated to the todos list, the expensive filtering and mapping operations still run again, causing a slow UI.
- To avoid recomputation when `tab` or `todos` haven’t changed, use `React.useMemo()` to _memoize_ the filtered todos. Also memoize the list items. Use the memoized list items in the UI that is returned.
```jsx
const TodosFilter = ({ todos, tab, theme }) => {
    const filteredTodos = React.useMemo( () => filterTodos(todos, tab), [ todos, tab ] );

    const listItems = React.useMemo(
        () => {
            return filteredTodos.map((todo) => (
                <div key={todo.id}>{todo.task}</div>
            ))
        },
        [ todos, tab ]
    );

    return (
        <div
            style={{
                backgroundColor: theme,
                color: theme === "white" ? "black" : "white",
            }}
        >
            {listItems}
        </div>
    );
};
```
- Now the expensive computation of filtering and rendering the large todo list only happens when `tab` or `todos` change — not when you toggle the theme. This results in a **faster and more responsive** UI, especially noticeable with large datasets.

## Step 22: Error Boundary - Showing a fallback UI on errors
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ErrorBoundary</title>
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
            class ErrorBoundary extends React.Component {
                state = {
                    error: null
                };

                // called when a descendant throws an error and it is still not handled
                componentDidCatch(error) {
                    // set state to show the error message instead of the child which is throwing an error
                    this.setState({
                        error
                    });
                }

                render() {
                    const { error } = this.state;

                    if(error) {
                        return <div>{error.message}</div>
                    }

                    return this.props.children;
                }
            }

            const SomeComponent = ({ throwError }) => {
                if(throwError) {
                    throw new Error('Some error occured');
                }

                return <div>I am some component</div>;
            };

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(
                <React.Fragment>
                    <ErrorBoundary>
                        <SomeComponent throwError={true} />
                    </ErrorBoundary>
                    <SomeComponent throwError={false} />
                </React.Fragment>
            );
        </script>
    </body>
</html>
```

## Step 23: Render props
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Render props</title>
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
            /**
             * render props is a design pattern - for class components
             *
             * used when 2 component share ALL the functionality, EXCEPT the UI
             *
             * Intead of these 2 components
             * WorkshopsListGrid
             * WorkshopsListTable
             *
             * Have one component - WorkshopsList
             *
             * <WorkshopsList render={
             *  ( workshops ) => (
             *        <table>....</table>
             *  )
             * } />
             *
             * <WorkshopsList render={
             *  ( workshops ) => (
             *        <div className="grid">....</div>
             *  )
             * } />
             *
             * Internally WorkshopsList will call the passed render function to get the UI, then it will return the UI
             */

            const root = ReactDOM.createRoot(document.getElementById("root"));

            root.render(el);
        </script>
    </body>
</html>
```