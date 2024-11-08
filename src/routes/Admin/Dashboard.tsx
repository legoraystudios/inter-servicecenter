import { useState, useEffect } from 'react'
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Dashboard = () => {

    useEffect(() => {
        document.title = "Dashboard | Service Center";
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">
                    <h3>Good Morning, Raymond</h3>
                    <p>Welcome to your personal area!</p>

                    <div className="d-flex justify-content-center mt-5">
                        <i className="bi bi-cone-striped text-warning" style={{ fontSize: '100px' }}></i>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h4 className="text-center text-secondary">Dashboard Overview is under construction and will be available soon! In the meantime you can use the options on the top of the panel.</h4>
                    </div>
                </Container>
            <Footer2 />
        </div>
    )

}

export default Dashboard;