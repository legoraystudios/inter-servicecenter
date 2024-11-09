import { useEffect, useState } from 'react'
import Navbar2 from '../../components/layout/Navbar2';
import Footer2 from '../../components/layout/Footer2';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Admin = () => {

  interface AlertProps {
    type: 'success' | 'danger';
    message: string;
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginAccount = async (event: any) => {

    event.preventDefault();

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login`, {
      Email: email,
      Password: password
    });

    if (response.status == 200) {

    } else {

    }

  }


  useEffect(() => {
      document.title = "Login | Service Center";
    }, []);

  return(
      <div>
          <Navbar2 />
              <Container className="w-25 p-3">
                  <Form onSubmit={loginAccount}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="someone@fajardo.inter.edu" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me for 30 days" />
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