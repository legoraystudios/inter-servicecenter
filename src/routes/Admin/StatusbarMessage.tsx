import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SampleImage from '../../components/images/Status-Bar-Example.png';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Table, Alert, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const StatusbarMessage = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface StatusBarContent {
        id: number,
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
    const [statusBarData, setStatusBarData] = useState<StatusBarContent>();
    const [message, setMessage] = useState("");
    const [icon, setIcon] = useState("1");

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

    const getStatusBarMessage = async () => {

        if (id != "new") {
            await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookieContent}`,
                  },
              }
              ).then(function (response) {
                if (response.status === 200) {
                  setStatusBarData(response.data)
                  setMessage(response.data.message)
                  setIcon(response.data.icon)
                }
              }).catch(function (error) {
                if (error.response.status !== 200) {
                  setAlertMessage({message: "ERROR: An error has occured while gathering current messages.", variant: "danger" });
                } 
              })
        }
    }

    const newStatusBar = async (event: any) => {

        event.preventDefault();
    
          await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages`, 
            {
                Message: message,
                Icon: icon,
            },
            {
                headers: {
                    Authorization: `Bearer ${cookieContent}`,
                  },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Message created successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/statusbar");
                  }, 3000);
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {

            } 
          }
    
    )}

    const modifyStatusBar = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages`, 
            {
                Id: id,
                Message: message,
                Icon: icon,
            },
            {
                headers: {
                    Authorization: `Bearer ${cookieContent}`,
                  },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Message modified successfully!", variant: "success" });
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
        getStatusBarMessage();
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
                            
                                    {
                                        statusBarData ? (
                                                    <>
                                                        <h3>Status Bar Message #{statusBarData.id}</h3>
                                                    </>
                                            ) : (
                                                <>
                                                    <h3>New Status Message</h3>
                                                </>
                                            )
                                    }
                                
                        </Col>
                      </Row>
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <div className='mt-5'>
                        <Form onSubmit={
                            id == "new" ? (
                                newStatusBar
                            ) : (
                                modifyStatusBar
                            )
                        }>
                          <Form.Control
                                as="textarea"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ height: '100px' }}
                              />

                          <FloatingLabel className="mt-3" controlId="floatingSelect" label="Status Bar Icon">
                            <Form.Select aria-label="Status Bar Icon" value={icon} onChange={(e) => setIcon(e.target.value)}>
                              <option value="1">None</option>
                              <option value="2">Info</option>
                              <option value="3">Warning</option>
                              <option value="4">Success</option>
                              <option value="5">Question</option>
                            </Form.Select>
                          </FloatingLabel>

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

export default StatusbarMessage;