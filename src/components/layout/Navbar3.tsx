import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLogo from "../images/Service-Center-Logo.png";
import userEvent from '@testing-library/user-event';

const Navbar3 = () => {

  interface UserProperties {
    id: number,
    firstName: any,
    lastName: string,
    email: string,
}

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const [user, setUser] = useState<UserProperties>();

    const navigate = useNavigate()

    const checkIfSignedIn = async () => {
    
      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/account/me`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setUser(response.data)
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
      )}
      useEffect(() => {
        checkIfSignedIn();
        // eslint-disable-next-line
      }, []);

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
                      <NavDropdown.Item href="/admin/statusbar">Status Bar <span className="badge text-bg-success">New</span></NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                    <NavDropdown title={
                      user && (
                        <span key={user.id}><i className="bi bi-person-fill"></i> Signed In, Raymond</span>
                      )} id="basic-nav-dropdown" className="me-3">
                      <NavDropdown.Item href="#"><i className="bi bi-person-fill"></i> My Account</NavDropdown.Item>
                      <NavDropdown.Item href="#"><i className="bi bi-shield-lock"></i> Employee Management</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/signout" className="text-danger"><i className="bi bi-box-arrow-in-right"></i> Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container fluid className='green-navbar'></Container>
        </div>
    )

}

export default Navbar3;