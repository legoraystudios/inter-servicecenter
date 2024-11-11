import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar2 from '../../components/layout/Navbar2';
import Footer2 from '../../components/layout/Footer2';

const Admin: React.FC = () => {

  // Login Info
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberSession, setRememberSession] = useState(false)

  // Alert Messages
  const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

  const navigate = useNavigate()

  // Cookies Properties
  const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
  const [cookies, setCookie] = useCookies([cookieName]);

  const loginAccount = async (event: any) => {

    event.preventDefault();

      await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login`, {
        Email: email,
        Password: password,
        Remember: rememberSession
      }).then(function (response) {
        if (response.status === 200) {
          setCookie(cookieName, response.data.msg)
          navigate("/admin/dashboard");
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: Email and/or password are incorrect.", variant: "danger" });
        } 
      }

    )}


  useEffect(() => {
      document.title = "Login | Service Center";
    }, []);

  return(
      <div>
          <Navbar2 />
              <Container className="w-25 p-3">
              { alertMessage?.message && (
                <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
              )}
                  <Form onSubmit={loginAccount}>

                    <h4 className="text-center mb-4">Sign In with your Credentials</h4>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="someone@fajardo.inter.edu" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me for 30 days" checked={rememberSession} onChange={(e) => setRememberSession(e.target.checked)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Form>    
              </Container>
          <Footer2 />
      </div>
  )

}

export default Admin;