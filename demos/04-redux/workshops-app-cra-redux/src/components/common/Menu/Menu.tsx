import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { /*Link, */ NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../features/themeSlice';

import './Menu.scss';

const Menu = () => {
    const dispatch = useDispatch();
    const { value : theme, contrastValue : contrastTheme } = useSelector( state => (state as any).theme );

    return (
        <Navbar collapseOnSelect expand="lg" bg={theme} data-bs-theme={theme}>
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
                    <NavDropdown title="Personalize" id="basic-nav-dropdown" className={`text-${contrastTheme}`}>
                        <NavDropdown.Item
                            to="/workshops/favorites"
                            as={NavLink}
                        >
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={() => dispatch( toggleTheme() )}>
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;