import { Accordion, Alert, Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Navbar3 from "../../../components/layout/Navbar3";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PhoneNumbers = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface PhoneNumberContent {
      id: number,
      phoneNumber: string,
      facilityId: number,
      facilityName: string,
    }

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];
    
    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    const [isLoading, setIsLoading] = useState(false);

    // Facility Data
    const [phoneNumberData, setPhoneNumberData] = useState<PhoneNumberContent[]>([]);

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
          if (response.data.role !== "Admin" && response.data.role !== "Super Administrator") {
            navigate("/admin");
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            navigate("/admin");
          } 
        }
    
    )}

    const getPhoneNumbers = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setPhoneNumberData(response.data.$values);
          setIsLoading(true);
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while gathering the phone list.", variant: "danger" });
        } 
      }
  
    )}
    
    const deletePhoneNumber = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Phone Number deleted successfully!", variant: "success" });
          getPhoneNumbers();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the phone number.", variant: "danger" });
        } 
      }
  
    )}

    useEffect(() => {
        document.title = "My Phone Numbers - Facility Management | Service Center";
        checkIfSignedIn();
        getPhoneNumbers();
        // eslint-disable-next-line
    }, []);

    return (
      <div>
          <Navbar3 />
          <Container className="mt-5 min-vh-100">
            <Container className="mb-3">
              <Row>
                <Col>
                    <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/dashboard`}><i className="bi bi-arrow-90deg-up"></i> Go back to Dashboard</a>
                    <h3>My Phone Numbers</h3>
                </Col>
              </Row>
            </Container>

            <Row>
                <Col xxl>
                    <Tabs
                      defaultActiveKey="phoneNumbers"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab title={<a className="green-link" href={`${process.env.REACT_APP_BASENAME}/admin/facility`}>My Facilities</a>}></Tab>
                      <Tab eventKey="phoneNumbers" title={<a className="green-link" href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones`}>Phone Numbers</a>}></Tab>
                    </Tabs>
                </Col>
                <Col>
                    <Container className="my-3 d-flex justify-content-end">
                        <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones/new`}><i className="bi bi-telephone-plus"></i> Add Phone Number</Button>
                    </Container>
                </Col>
            </Row>

            <Accordion defaultActiveKey="0">
              {
                isLoading && phoneNumberData.map((record: PhoneNumberContent) => {
                  return (
                    <Accordion.Item className="my-2" eventKey={record.id.toString()} key={record.id}>
                      <Accordion.Header>
                        <Container className="d-flex justify-content-start">
                          {record.phoneNumber}
                        </Container>
                        <Container className='d-flex justify-content-end'>
                          <Button variant="info" className='me-2' href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                          <Button variant="danger" className='me-2' data-bs-toggle="modal" data-bs-target={`#deletePhoneNumber-${record.id}`}><i className="bi bi-trash3"></i></Button>
                          {/* Confirm Deletion Modal */}
                          <div className="modal fade" id={`deletePhoneNumber-${record.id}`} tabIndex={-1} aria-labelledby={`deletePhoneNumber-${record.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | {record.phoneNumber} - ID: #{record.id}</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  Are you sure you want to delete {record.phoneNumber} phone number? ALL RELATED DEPARMENTS AND CONTACTS LINKED WITH THIS PHONE NUMBER WILL ALSO BE DELETED. THIS ACTION CANNOT BE UNDONE!
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deletePhoneNumber(record.id)}>DELETE PHONE NUMBER</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Container>  
                      </Accordion.Header>
                      <Accordion.Body>

                      <Row>
                        <Col xs={1}>
                          <i className="bi bi-building"></i>
                        </Col>
                        <Col>
                          <p>
                            {record.facilityName}
                          </p>
                        </Col>
                      </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
              }
            </Accordion>

            <Container className="mt-3">
                { alertMessage?.message && (
                  <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                )}
            </Container>
          </Container>


      </div>
    );
}

export default PhoneNumbers;