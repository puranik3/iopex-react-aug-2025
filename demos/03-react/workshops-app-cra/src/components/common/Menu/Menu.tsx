import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { /*Link, */ NavLink } from 'react-router-dom';

import './Menu.scss';

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand to="/" as={NavLink}>Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Link to="/workshops">List of workshops</Link> */}
                        <Nav.Link
                            to="/"
                            as={NavLink}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            to="/workshops"
                            as={NavLink}
                            end
                        >
                            List of workshops
                        </Nav.Link>
                        <Nav.Link
                            to="/workshops/add"
                            as={NavLink}
                        >
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            to="/workshops/favorites"
                            as={NavLink}
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
};

export default Menu;