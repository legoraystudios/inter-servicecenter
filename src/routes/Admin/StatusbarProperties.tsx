import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SampleImage from '../../components/images/Status-Bar-Example.png';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Table, Alert, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const StatusbarProperties = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface StatusBarProperties {
        message: string,
        icon: number,
        createdBy: number,
        createdByName: string,
        modifiedBy: number,
        modifiedByName: string,
        createdAt: any,
        modifiedAt: number,
        expiresIn: any,
        iconName: string
    }

    const { id } = useParams();

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Status Bar Message Data
    const [statusBarPropertiesData, setStatusBarPropertiesData] = useState<StatusBarProperties>();
    const [messageInterval, setMessageInterval] = useState("5");
    const [statusBarColor, setStatusBarColor] = useState("1");

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

    const getStatusBarProperties = async () => {

            await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/property`, {
              }).then(function (response) {
                if (response.status === 200) {
                  setStatusBarPropertiesData(response.data)
                  setMessageInterval(response.data.$values[0].messageInterval)
                  setStatusBarColor(response.data.$values[0].statusBarColor)
                }
              }).catch(function (error) {
                if (error.response.status !== 200) {
                  setAlertMessage({message: "ERROR: An error has occured while gathering current messages.", variant: "danger" });
                } 
              })
    }

    const modifyStatusBarProperty = async (event: any) => {

        event.preventDefault();
    
          await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/property`, 
            {
                MessageInterval: messageInterval,
                StatusBarColor: statusBarColor,
            },
            {
                headers: {
                    Authorization: `Bearer ${cookieContent}`,
                  },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Properties modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/statusbar");
                  }, 3000);
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {

            } 
          }
    
    )}
    

    useEffect(() => {
        document.title = "Status Bar | Service Center";
        checkIfSignedIn();
        getStatusBarProperties();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">
                    <Container>
                      <Row>
                        <Col>
                            <a className="link" href="/admin/statusbar"><i className="bi bi-arrow-90deg-up"></i> Go back to List</a>
                            <h3>Status Bar Properties</h3>
                                
                        </Col>
                      </Row>
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <div className='mt-5'>
                        <Form onSubmit={modifyStatusBarProperty}>

                          <Row>
                            <Col>
                              <FloatingLabel className="mt-3" controlId="floatingSelect" label="Message Interval (in seconds)">
                                <Form.Control placeholder="Message Interval (in seconds)" type='number' value={messageInterval} onChange={(e) => setMessageInterval(e.target.value)} />
                              </FloatingLabel>
                            </Col>
                            <Col>
                              <FloatingLabel className="mt-3" controlId="floatingSelect" label="Status Bar Background Color">
                                <Form.Select aria-label="Status Bar Color" value={statusBarColor} onChange={(e) => setStatusBarColor(e.target.value)}>
                                  <option value="1">Primary</option>
                                  <option value="2">Warning</option>
                                  <option value="3">Danger</option>
                                  <option value="4">Info</option>
                                </Form.Select>
                              </FloatingLabel>
                            </Col>
                          </Row>


                          <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href="/admin/statusbar">Cancel</Button>
                          </div>
                        </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

}

export default StatusbarProperties;