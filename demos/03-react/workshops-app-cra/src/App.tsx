import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Alert, Container } from "react-bootstrap";
// import Container from "react-bootstrap/Container"

import Menu from './components/common/Menu/Menu';
import HomePage from './pages/page';
import WorkshopsListPage from './pages/workshops/page';
import AddWorkshopPage from './pages/workshops/add/page';
import NotFoundPage from './pages/not-found';

import './App.scss';

function App() {
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

            <Menu />

            <Container className="my-4">
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/workshops"
                        element={<WorkshopsListPage />}
                    />
                    <Route
                        path="/workshops/add"
                        element={<AddWorkshopPage />}
                    />
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Container>
        </>
    );
}

export default App;
