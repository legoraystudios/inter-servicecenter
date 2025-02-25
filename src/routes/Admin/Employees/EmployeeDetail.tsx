import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../../components/images/image.jpg';
import Navbar3 from '../../../components/layout/Navbar3';
import Footer2 from '../../../components/layout/Footer2';
import { Container, Button, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Tiptap from '../../../components/layout/Tiptap';

const EmployeeDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface AccountProperties {
      id: number,
      firstName: string,
      lastName: string,
      email: any,
      role: number,
      profilePhotoFile: string,
      createdAt: string
  }

    const { id } = useParams();

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const [isLoaded, setIsLoaded] = useState(true);

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Post Data
    const [account, setAccount] = useState<AccountProperties>();
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

    // Alert Messages
    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

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

    const getAccount = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/account/${id}`, {
          headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
        }
        ).then(function (response) {
          if (response.status === 200) {
            setAccount(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setRole(response.data.role);
            setProfilePicture(response.data.profilePhotoFile);
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current account.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const newAccount = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/register`, 
          {
              FirstName: firstName,
              LastName: lastName,
              Email: email,
              Password: password,
              ConfirmPassword: confirmPassword,
          },
          {
            headers: {
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Employee created successfully!", variant: "success" });
              setTimeout(() => {
                  navigate("/admin/employees");
                }, 3000);
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

    const modifyAccount = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/account/`, 
            {
                Id: id,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Role: role,
            },
            {
              headers: {
                  Authorization: `Bearer ${cookieContent}`,
              },
            }
        ).then(function (response) {

          if (profilePicture !== null && account?.profilePhotoFile == null) {
            uploadProfilePicture(event);
          }

            if (response.status === 200) {
                setAlertMessage({message: "Employee modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/employees");
                  }, 3000);
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
  
        await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/account/${id}/profile-photo`, 
          {
            headers: {
               'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Profile Photo removed successfully!", variant: "success" });
              getAccount();
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

    const uploadProfilePicture = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/account/profile-photo`, 
          {
            Id: id,
            ...(profilePicture !== null && { ImageFile: profilePicture }),
          },
          {
            headers: {
               'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Profile Photo uploaded successfully!", variant: "success" });
              getAccount();
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

    const sendPasswordResetRequest = async (event: any) => {

      event.preventDefault();
  
      setIsLoaded(false);
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/forgot-password/${email}`
        ).then(function (response) {
          if (response.status === 200) {
            setAlertMessage({message: "A confirmation email with a password reset link was sent to " + email, variant: "success" });
            setIsLoaded(true);
          }
        }).catch(function (error) {
          if (error.response.data.msg) {
            setAlertMessage({message: error.response.data.msg, variant: "danger" });
            setIsLoaded(true);
          } else {
            setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
            setIsLoaded(true);
          }
        }
  
      )}

    useEffect(() => {
        document.title = "Post | Service Center";
        checkIfSignedIn();
        getAccount();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5 min-vh-100">
                    <Container>
                      <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/employees`}><i className="bi bi-arrow-90deg-up"></i> Go back to Employee List</a>
                      {
                        account ? (
                          <h3>Modify Employee: {account.firstName} {account.lastName} - #{account.id}</h3>
                        ) : (
                          <h3>New Employee</h3>
                        )
                      }
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <div className='mt-3'>
                      <Form onSubmit={
                        id == "new" ? (
                          newAccount
                        ) : (
                          modifyAccount
                        )
                      }>

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

                        {
                          account ? (
                            <>
                              <Row>
                                <Col>
                                  <Form.Label htmlFor="postTitle">Email</Form.Label>
                                  <Form.Control className="mb-3" placeholder="someone@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                                <Col>
                                  <Form.Label htmlFor="role">Role</Form.Label>
                                  <Form.Select value={role} onChange={(e: any) => setRole(e.target.value)}>
                                    <option value="Employee">Employee</option>
                                    <option value="Admin">Administrator</option>
                                    <option value="Super Administrator">Super Administrator</option>
                                  </Form.Select>
                                </Col>
                              </Row>
                              <div className="d-flex align-items-center">
                                <p>Trying to change the password?</p>
                                {
                                  isLoaded ? (
                                    <Button className="mx-3" variant="dark" onClick={sendPasswordResetRequest}><i className="bi bi-key"></i> Request Password Reset Link</Button>
                                  ) : (
                                    <Container className="text-center">
                                      <Spinner animation="grow" variant="success"/>
                                    </Container>
                                  )
                                }
                              </div>
                            </>
                          ) : (
                            <>
                              <Form.Label htmlFor="postTitle">Email</Form.Label>
                              <Form.Control className="mb-3" placeholder="someone@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </>
                          )
                        }

                        {
                          !account && (
                            <>
                              <Row>
                                <Col>
                                  <Form.Label htmlFor="postTitle">Password</Form.Label>
                                  <Form.Control className="mb-3" placeholder="********" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Col>
                                <Col>
                                  <Form.Label htmlFor="postTitle">Confirm Password</Form.Label>
                                  <Form.Control className="mb-3" placeholder="********" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Col>
                              </Row>
                            </>
                          )
                        }

                        {
                          account ? (
                            <>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile Picture (allowed extensions: .png, .jpg and .jpeg).</Form.Label>
                                {
                                  account?.profilePhotoFile ? (
                                    <>
                                      <Alert variant="secondary">
                                        Profile Picture uploaded: 
                                          <Alert.Link className="ms-1" href={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${account.id}/banner`} target='_blank'>
                                            {account.profilePhotoFile} 
                                          </Alert.Link>
                                        <Button variant="outline-danger" className="mx-3" onClick={removeProfilePicture}>Remove</Button>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Form.Control type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
                                    </>
                                  )
                                }
                              </Form.Group>
                            </>
                          ) : (
                            <Alert variant="info">
                              Password must have the following requirements:
                              <ul>
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                              </ul>
                            </Alert>
                          )
                        }
                        
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/employees`}>Cancel</Button>
                        </div>
                      </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

  }

export default EmployeeDetail;