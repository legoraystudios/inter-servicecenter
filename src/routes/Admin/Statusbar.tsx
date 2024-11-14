import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SampleImage from '../../components/images/Status-Bar-Example.png';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Statusbar = () => {

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

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Status Bar Message Data
    const [statusBarData, setStatusBarData] = useState<StatusBarContent[]>([]);

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

    const getStatusBarMessages = async () => {

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages`, {
          headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
        }
        ).then(function (response) {
          if (response.status === 200) {
            setStatusBarData(response.data.$values)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current messages.", variant: "danger" });
          } 
        }
    
    )}

    const deleteStatusMessage = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Message deleted successfully!", variant: "success" });
          getStatusBarMessages();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the message.", variant: "danger" });
        } 
      }
  
  )}
    

    useEffect(() => {
        document.title = "Status Bar | Service Center";
        checkIfSignedIn();
        getStatusBarMessages();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">
                    <Container>
                      <Row>
                        <Col>
                            <a className="link" href="/admin/dashboard"><i className="bi bi-arrow-90deg-up"></i> Go back to Dashboard</a>
                            <h3>Status Bar</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                            <img src={SampleImage} height={80} />
                        </Col>
                        <Col>
                            <p>Now you can add a customizable status bar for any important announcement!</p>
                        </Col>
                      </Row>
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <Container className="mt-3 d-flex justify-content-end">
                        <Button className='mx-1' variant="primary" href="/admin/statusbar/new"><i className="bi bi-plus"></i> Add Message</Button>
                        <Button className='mx-1' variant="secondary" href="/admin/statusbar/properties"><i className="bi bi-gear"></i> Properties</Button>
                    </Container>

                    <div className='mt-3'>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Message</th>
                              <th>Icon</th>
                              <th>Created By</th>
                              <th>Modified By</th>
                              <th>Created At</th>
                              <th>Expiration Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                                statusBarData.map(record => {
                                    return (
                                            <>
                                                <tr key={record.id}>
                                                  <td>{record.id}</td>
                                                  <td>{record.message}</td>
                                                  <td>{record.iconName}</td>
                                                  <td>{record.createdByName}</td>
                                                  <td>{record.modifiedByName}</td>
                                                  <td>{record.createdAt}</td>
                                                  <td>{record.expiresIn}</td>
                                                  <td className='px-3'>
                                                    <Button className='mx-1' variant="info" href={`/admin/statusbar/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                                                    <Button className='mx-1' variant="danger" data-bs-toggle="modal" data-bs-target={`#deleteMessage-${record.id}`}><i className="bi bi-trash3"></i></Button>
                                                      {/* Confirm Deletion Modal */}
                                                      <div className="modal fade" id={`deleteMessage-${record.id}`} tabIndex={-1} aria-labelledby={`deleteMessage-${record.id}`} aria-hidden="true">
                                                        <div className="modal-dialog">
                                                          <div className="modal-content">
                                                            <div className="modal-header">
                                                              <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | ID: #{record.id}</h1>
                                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                              Are you sure you want to delete this message? THIS ACTION CANNOT BE UNDONE!
                                                            </div>
                                                            <div className="modal-footer">
                                                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteStatusMessage(record.id)}>DELETE MESSAGE</button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                  </td>
                                                </tr>
                                            </>
                                    )
                                })
                            }
                          </tbody>
                        </Table>            
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

}

export default Statusbar;