import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" expand="lg" data-bs-theme="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Bookify</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <LinkContainer to="authors">
                <NavDropdown.Item>Authors</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="books">
                <NavDropdown.Item>Books</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="members">
                <NavDropdown.Item>Members</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="loan">
                <NavDropdown.Item>Loans</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
