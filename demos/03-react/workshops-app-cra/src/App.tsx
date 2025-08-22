import React, { useState } from 'react';
import './App.scss';

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
        </>
    );
}

export default App;
