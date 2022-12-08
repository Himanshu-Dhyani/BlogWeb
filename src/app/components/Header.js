import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand>Blog</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav><Link to="/BlogWeb" className="link">Users</Link> </Nav>
                        {/* <Nav><Link to="/BlogWeb" className="link">Home</Link> </Nav> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;