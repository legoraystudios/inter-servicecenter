import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import UserImage from '../../components/images/user.png';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLogo from "../images/Service-Center-Logo.png";
import userEvent from '@testing-library/user-event';
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap';

const Navbar3 = () => {

  interface UserProperties {
    id: number,
    firstName: any,
    lastName: string,
    email: string,
    role: string,
    profilePhotoFile: string
}

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const [user, setUser] = useState<UserProperties>();

    // Alert Messages
    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

    // Post Data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setProfilePicture(file);
      } else {
        setProfilePicture(null);
      }
    }

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
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setRole(response.data.role);
          setProfilePicture(response.data.profilePhotoFile);
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
    )}

    const modifyAccount = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/account/`, 
            {
                Id: user?.id,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
            },
            {
              headers: {
                  Authorization: `Bearer ${cookieContent}`,
              },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Employee modified successfully!", variant: "success" });
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {
              if (error.response.data.msg) {
                setAlertMessage({message: error.response.data.msg, variant: "danger" });
              } else {
                setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
              }
            } 
          }
        
    )}

    const removeProfilePicture = async (event: any) => {

      event.preventDefault();
  
        await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/account/${user?.id}/profile-photo`, 
          {
            headers: {
               'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Profile Photo removed successfully!", variant: "success" });
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            if (!error.response.data.msg) {
              setAlertMessage({message: error.response.data.msg, variant: "danger" });
            } else {
              setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
            }
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
                <Navbar.Brand href={`${process.env.REACT_APP_BASENAME}/`}><img src={NavLogo} height={70} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href={`${process.env.REACT_APP_BASENAME}/admin/dashboard`}>Dashboard Overview</Nav.Link>
                    <Nav.Link href={`${process.env.REACT_APP_BASENAME}/admin/posts`}>Posts</Nav.Link>
                    <NavDropdown title="Tools" id="basic-nav-dropdown">
                      <NavDropdown.Item href={`${process.env.REACT_APP_BASENAME}/admin/statusbar`}>Status Bar</NavDropdown.Item>
                      <NavDropdown.Item href={`${process.env.REACT_APP_BASENAME}/admin/directory`}>Phone Directory <span className="badge text-bg-success">New</span></NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                    <NavDropdown title={
                      user && (
                        <div className="list-inline-item">
                          {
                            user.profilePhotoFile ? (
                              <img className="rounded-circle list-inline-item" src={`${process.env.REACT_APP_BACKEND_HOST}/api/account/${user.id}/profile-photo`} width={35} /> 
                            ) : (
                              <img className="rounded-circle list-inline-item" src={UserImage} width={35} /> 
                            )
                          }
                          <span className="list-inline-item" key={user.id}>
                           Signed In, Raymond
                          </span>
                        </div>
                      )} id="basic-nav-dropdown" className="list-inline me-3">

                      <NavDropdown.Item data-bs-toggle="modal" data-bs-target={`#myAccountModal`}><i className="bi bi-person-fill"></i> My Account</NavDropdown.Item>

                      {
                        user && (user.role == "Super Administrator" || user.role == "Admin") && (
                          <>
                            <NavDropdown.Item href={`${process.env.REACT_APP_BASENAME}/admin/employees/`}><i className="bi bi-shield-lock"></i> Employee Management</NavDropdown.Item>
                            <NavDropdown.Item href={`${process.env.REACT_APP_BASENAME}/admin/facility/`}><i className="bi bi-building-gear"></i> Facility Management</NavDropdown.Item>
                          </>
                        )
                      }
                      <NavDropdown.Item href={`${process.env.REACT_APP_BASENAME}/admin/signout`} className="text-danger"><i className="bi bi-box-arrow-in-right"></i> Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container fluid className='green-navbar'></Container>

            {/* My Account */}
            <div className="modal fade" id={`myAccountModal`} tabIndex={-1} aria-labelledby={`myAccountModal`} data-bs-backdrop="static" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">My Account</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => window.location.reload()}></button>
                  </div>
                  <div className="modal-body">
                    <Container className="mt-3">
                      { alertMessage?.message && (
                        <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                      )}
                    </Container>
                    <Form onSubmit={modifyAccount}>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="postTitle">First Name</Form.Label>
                          <Form.Control className="mb-3" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="postTitle">Last Name</Form.Label>
                          <Form.Control className="mb-3" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Col>
                      </Row>
                        <Form.Label htmlFor="postTitle">Email</Form.Label>
                        <Form.Control className="mb-3" placeholder="someone@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Label htmlFor="postTitle">Role</Form.Label>
                        {
                          user?.role == "Super Administrator" || user?.role == "Admin" ? (
                            <Badge className="mx-2" bg="danger">{user?.role}</Badge>
                          ) : (
                            <Badge className="mx-2" bg="primary">{user?.role}</Badge>
                          )
                        }
                        <div className="d-flex align-items-center">
                          <p>Trying to change the password?</p>
                          <Button className="mx-3" variant="dark"><i className="bi bi-key"></i> Request Password Reset Link</Button>
                        </div>
                      <div className="modal-footer mt-5">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => window.location.reload()}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )

}

export default Navbar3;

function setAlertMessage(arg0: { message: string; variant: string; }) {
  throw new Error('Function not implemented.');
}
