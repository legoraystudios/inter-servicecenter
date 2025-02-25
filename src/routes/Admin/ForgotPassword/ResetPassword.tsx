import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar2 from '../../../components/layout/Navbar2';
import Footer2 from '../../../components/layout/Footer2';

const ResetPassword: React.FC = () => {

  // Login Info
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Alert Messages
  const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

  // URL Parameters
  const [searchUrlParams, setSearchUrlParams] = useSearchParams();
  const token = searchUrlParams.get("token");

  const [isTokenValid, setIsTokenValid] = useState(false);

  const navigate = useNavigate()

  // Cookies Properties
  const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
  const [cookies, setCookie] = useCookies([cookieName]);

  // Loaders
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedBtn, setIsLoadedBtn] = useState(true);


  const resetPassword = async (event: any) => {

    event.preventDefault();

    setIsLoadedBtn(false);

      await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/forgot-password/reset`, 
      {
        token: token,
        password: password,
        confirmPassword: confirmPassword
      },
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Password changed successfully!", variant: "success" });
          setIsLoadedBtn(true);
        }
      }).catch(function (error) {
        if (error.response.data.msg) {
          setAlertMessage({message: error.response.data.msg, variant: "danger" });
          setIsLoadedBtn(true);
        } else {
          setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
          setIsLoadedBtn(true);
        }
      }

  )}

  const checkToken = async () => {

      await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/forgot-password/check-token/${token}`, 
      ).then(function (response) {
        if (response.status === 200) {
          setIsLoaded(true);
          setIsTokenValid(true);
        }
      }).catch(function (error) {
        if (error.response.data.msg) {
          setIsLoaded(true);
          setIsTokenValid(false);
        } else {
          setIsLoaded(true);
          setIsTokenValid(false);
        }
      }

  )}


  useEffect(() => {
      document.title = "Reset Password | Service Center";
      if (cookies[cookieName]) {
        navigate(`/admin/dashboard`);
      }
      checkToken();
    }, []);

  return(
      <div>
          <Navbar2 />
              <Container className="p-3 min-vh-100 w-25">
              { alertMessage?.message && (
                <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
              )}
              {
                isLoaded ? (
                  isTokenValid ? (
                  <Form onSubmit={resetPassword}>

                    <h4 className="text-center mb-4">Reset Password</h4>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Alert variant="info">
                        Password must have the following requirements:
                        <ul>
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one lowercase letter</li>
                          <li>At least one number</li>
                        </ul>
                      </Alert>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                      </Form.Group>
                      <Row className="mb-3">
                        <Col>
                        {
                          isLoadedBtn ? (
                            <Button variant="primary" type="submit">
                              Reset Password
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
                  ) : (
                    <Container className="text-center min-vh-100">
                        <Alert variant="danger">ERROR: The token is either expired or invalid. Please request a new password reset.</Alert>
                        <a href={`${process.env.REACT_APP_BASENAME}/admin/`} className="text-decoration-none"><i className="bi bi-arrow-left-circle me-2"></i>
                        Go Back to Login</a>
                    </Container>
                  )
                ) : (
                  <>
                    <Container className="text-center min-vh-100">
                      <Spinner animation="grow" variant="success"/>
                    </Container>
                  </>
                )

              }  
              </Container>
          <Footer2 />
      </div>
  )

}

export default ResetPassword;