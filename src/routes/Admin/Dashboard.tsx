import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {

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
        document.title = "Dashboard | Service Center";
        checkIfSignedIn();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">

                    {
                      user && (
                        <h3>Good Morning, {user.firstName}</h3>
                      )
                    }

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