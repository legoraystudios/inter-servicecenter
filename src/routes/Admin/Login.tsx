import { useEffect, useState } from 'react'
import Navbar2 from '../../components/layout/Navbar2';
import Footer2 from '../../components/layout/Footer2';
import { Container, Form, Button } from 'react-bootstrap';

const Admin = () => {

    useEffect(() => {
        document.title = "Login | Service Center";
      }, []);

    return(
        <div>
            <Navbar2 />
                <Container className="w-25 p-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="someone@fajardo.inter.edu" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="********" />
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