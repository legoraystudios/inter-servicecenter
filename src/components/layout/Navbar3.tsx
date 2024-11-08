import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLogo from "../images/Service-Center-Logo.png";
import ComponentBar from "./ComponentBar";

const Navbar3 = () => {

    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Brand href="/" target="_blank"><img src={NavLogo} height={70} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="/admin/dashboard">Dashboard Overview</Nav.Link>
                    <Nav.Link href="/admin/dashboard">Posts</Nav.Link>
                    <NavDropdown title="Tools" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#">Status Bar <span className="badge text-bg-success">New</span></NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                    <NavDropdown title={<span><i className="bi bi-person-fill"></i> Signed In, Raymond</span>} id="basic-nav-dropdown" className="me-3">
                      <NavDropdown.Item href="#"><i className="bi bi-person-fill"></i> My Account</NavDropdown.Item>
                      <NavDropdown.Item href="#"><i className="bi bi-shield-lock"></i> Employee Management</NavDropdown.Item>
                      <NavDropdown.Item href="#" className="text-danger"><i className="bi bi-box-arrow-in-right"></i> Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container fluid className='green-navbar'></Container>
        </div>
    )

}

export default Navbar3;