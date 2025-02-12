import { Accordion, Alert, Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Navbar3 from "../../../components/layout/Navbar3";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Facilities = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface FacilityContent {
      id: number,
      facilityName: string,
      addressLineOne: string,
      addressLineTwo: string,
      city: string,
      state: string,
      code: string,
      name: string,
      zipCode: string,
    }

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];
    
    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    const [isLoading, setIsLoading] = useState(false);

    // Facility Data
    const [facilityData, setFacilityData] = useState<FacilityContent[]>([]);


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

    const getFacilities = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setFacilityData(response.data.$values);
          setIsLoading(true);
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while gathering the facility list.", variant: "danger" });
        } 
      }
  
    )}
    
    const deleteFacility = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Facility deleted successfully!", variant: "success" });
          getFacilities();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the facility.", variant: "danger" });
        } 
      }
  
    )}

    useEffect(() => {
        document.title = "My Facilities - Facility Management | Service Center";
        checkIfSignedIn();
        getFacilities();
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
                    <h3>My Facilities</h3>
                </Col>
              </Row>
            </Container>

            <Row>
                <Col xxl>
                    <Tabs
                      defaultActiveKey="addresses"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="addresses" title={<a className="green-link" href={`${process.env.REACT_APP_BASENAME}/admin/facility`}>My Facilities</a>}></Tab>
                      <Tab title={<a className="green-link" href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones`}>Phone Numbers</a>}></Tab>
                    </Tabs>
                </Col>
                <Col>
                    <Container className="my-3 d-flex justify-content-end">
                        <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/facility/new`}><i className="bi bi-building-add"></i> Add Facility</Button>
                    </Container>
                </Col>
            </Row>

            <Accordion defaultActiveKey="0">
              {
                isLoading && facilityData.map((record: FacilityContent) => {
                  return (
                    <Accordion.Item className="my-2" eventKey={record.id.toString()} key={record.id}>
                      <Accordion.Header>
                        {record.facilityName}
                        <Container className='d-flex justify-content-end'>
                          <Button variant="info" className='me-2' href={`${process.env.REACT_APP_BASENAME}/admin/facility/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                          <Button variant="danger" className='me-2' data-bs-toggle="modal" data-bs-target={`#deleteFacility-${record.id}`}><i className="bi bi-trash3"></i></Button>
                          {/* Confirm Deletion Modal */}
                          <div className="modal fade" id={`deleteFacility-${record.id}`} tabIndex={-1} aria-labelledby={`deleteFacility-${record.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | {record.facilityName} - ID: #{record.id}</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  Are you sure you want to delete {record.facilityName}'s facility? ALL RELATED DEPARMENTS AND CONTACTS LINKED ON THE PHONE DIRECTORY WOULD ALSO BE DELETED. THIS ACTION CANNOT BE UNDONE!
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteFacility(record.id)}>DELETE FACILITY</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Container>  
                      </Accordion.Header>
                      <Accordion.Body>

                      <Row>
                        <Col xs={1}>
                          <i className="bi bi-geo-alt"></i>
                        </Col>
                        <Col>
                          <p>
                            {record.addressLineOne} <br />
                            {
                              record.addressLineTwo ? (
                                <>
                                {record.addressLineTwo} <br />
                                </>
                              ) : (
                                <></>
                              )
                            }
                            {record.city}, {record.code} {record.zipCode}
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

export default Facilities;