import { useContext, useEffect } from 'react'
import { NavDropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { ThemContext } from '../../ThemContext'

const Header = () => {
    const contextValue = useContext(ThemContext);
    const [theme, setTheme] = contextValue || ['light', () => {}];

    const dark = theme === 'dark'; // ✅ moved up before useEffect

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    useEffect(() => {
        document.body.className = dark ? 'bg-dark text-light' : 'bg-light text-dark';
    }, [theme]);

    return (
        <Navbar
            expand="lg"
            bg={dark ? 'dark' : 'light'}
            variant={dark ? 'dark' : 'light'}
            className="border-bottom"
        >
            <Container>
               <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-decoration-none gap-1">
    <span className="fw-bold fs-5" style={{ letterSpacing: '-0.5px' }}>
        <span className="text-primary">AK</span>
        <span className={dark ? 'text-light' : 'text-dark'}> Real</span>
        <span className="text-primary"> Estate</span>
    </span>
</Navbar.Brand>

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/propertyListings">Buy / Rent</Nav.Link>

                        <NavDropdown title="Sell" id="sell-dropdown">
                            <NavDropdown.Item as={Link} to="/createPropertyListings">
                                Post Your Listing
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/sellerDashboard">
                                My Dashboard
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <button
                        className={`btn btn-sm ${dark ? 'btn-outline-light' : 'btn-outline-dark'}`}
                        onClick={toggleTheme}
                    >
                        {dark ? '☀ Light' : '🌙 Dark'}
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;