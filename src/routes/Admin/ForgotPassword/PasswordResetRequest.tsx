import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar2 from '../../../components/layout/Navbar2';
import Footer2 from '../../../components/layout/Footer2';

const PasswordResetRequest: React.FC = () => {

  // Login Info
  const [email, setEmail] = useState("")

  // Alert Messages
  const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

  const navigate = useNavigate()

  // Cookies Properties
  const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
  const [cookies, setCookie] = useCookies([cookieName]);

  const [isLoaded, setIsLoaded] = useState(true);

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
      document.title = "Forgot Password | Service Center";
      if (cookies[cookieName]) {
        navigate(`/admin/dashboard`);
      }
    }, []);

  return(
      <div>
          <Navbar2 />
              <Container className="p-3 min-vh-100 w-25">
              { alertMessage?.message && (
                <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
              )}
                  <Form onSubmit={sendPasswordResetRequest}>

                    <h4 className="text-center mb-4">Forgot Password?</h4>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <p className='text-secondary'>Locked out? Type your email address linked to your account and we will send you a password reset link.</p>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="someone@fajardo.inter.edu" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Row className="mb-3">
                      <Col>
                      {
                        isLoaded ? (
                          <Button variant="primary" type="submit">
                            Request Password Reset
                          </Button>
                        ) : (
                          <>
                            <Container className="text-center min-vh-100">
                              <Spinner animation="grow" variant="success"/>
                            </Container>
                          </>
                        )
                      }
                      </Col>
                      <Col className='d-flex align-items-center justify-content-end'>
                        <a href={`${process.env.REACT_APP_BASENAME}/admin/`} className="text-decoration-none"><i className="bi bi-arrow-left-circle me-2"></i>
                         Go Back to Login</a>
                      </Col>
                    </Row>
                  </Form>    
              </Container>
          <Footer2 />
      </div>
  )

}

export default PasswordResetRequest;