import React, { useState } from 'react';
import { Alert } from "react-bootstrap";

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

    const [show, setShow] = useState(true);

    return (
        <>
            <Alert
                variant="warning"
                dismissible
                onClose={() => setShow(false)}
            >
                <Alert.Heading>Note on React Version</Alert.Heading>
                <p>
                    The current version of React is v19. This app is built
                    using React v18. The way an app was built using React
                    v16.7 or earlier was significantly different.
                </p>
            </Alert>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>
        </>
    );
}

export default App;
