import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SampleImage from '../../components/images/Status-Bar-Example.png';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Card, Alert, Badge, Accordion, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es-us';
import { useCookies } from 'react-cookie';

const PhoneDirectory = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface DirectoryContent {
      id: number,
      departmentName: string,
      departmentDescription: string,
      addressNote: string,
      facilityPhoneNumberId: number,
      phoneNumber: string,
      phoneExtension: string,
      facilityId: number,
      facility: DirectoryFacilityContent,
      people: DirectoryPeopleContent
    }

    interface DirectoryFacilityContent {
      id: number,
      facilityName: string,
      addressLineOne: string,
      addressLineTwo: string,
      city: string,
      state: number,
      stateName: string,
      stateCode: string,
      zipCode: string,
    }

    interface DirectoryPeopleContent {
      $values: [
        id: number,
        firstName: string,
        lastName: string,
        jobPosition: string,
        facilityPhoneNumberId: number,
        phoneNumber: string,
        phoneExtension: 2270,
        corporateCellphone: string,
        email: string,
        directoryDepartmentId: number,
        departmentName: string,
      ]
    }

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const [isLoading, setIsLoading] = useState(false);

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Directory Data
    const [directoryData, setDirectoryData] = useState<DirectoryContent[]>([]);

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

    const getDirectoryDepartments = async () => {

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department`, {
          headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
        }
        ).then(function (response) {
          if (response.status === 200) {
            setDirectoryData(response.data.$values);
            setIsLoading(true);
            console.log(directoryData);
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering the directory.", variant: "danger" });
          } 
        }
    
    )}

    const deleteDirectoryPerson = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/people/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Contact deleted successfully!", variant: "success" });
          getDirectoryDepartments();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the contact.", variant: "danger" });
        } 
      }
    )}

    const deleteDirectoryDepartment = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Department deleted successfully!", variant: "success" });
          getDirectoryDepartments();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting this department.", variant: "danger" });
        } 
      }
    )}
    

    useEffect(() => {
        document.title = "Phone Directory | Service Center";
        checkIfSignedIn();
        getDirectoryDepartments();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5 min-vh-100">
                    <Container>
                      <Row>
                        <Col>
                            <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/dashboard`}><i className="bi bi-arrow-90deg-up"></i> Go back to Dashboard</a>
                            <h3>My Phone Directory</h3>
                        </Col>
                      </Row>
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <Container className="mt-3 d-flex justify-content-end">
                        <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/directory/person/new`}><i className="bi bi-journal-plus"></i> Add Contacts</Button>
                        <Button className='mx-1' variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/directory/department/new`}><i className="bi bi-node-plus"></i> Add Department</Button>
                    </Container>

                    <div className='mt-3'>
                      <Accordion defaultActiveKey="1">

                        {
                          isLoading ? (
                            directoryData.map(record => {
                              return(
                                <>
                                    <Accordion.Item key={record.id} eventKey={record.id.toString()}>
                                      <Accordion.Header>
                                        {record.departmentName}
                                        <Container className='d-flex justify-content-end'>
                                          <Button variant="info" className='me-2' href={`${process.env.REACT_APP_BASENAME}/admin/directory/department/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                                          <Button variant="danger" className='me-2' data-bs-toggle="modal" data-bs-target={`#deleteDepartment-${record.id}`}><i className="bi bi-trash3"></i></Button>
                                            {/* Confirm Deletion Modal */}
                                            <div className="modal fade" id={`deleteDepartment-${record.id}`} tabIndex={-1} aria-labelledby={`deleteDepartment-${record.id}`} aria-hidden="true">
                                              <div className="modal-dialog">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | {record.departmentName} - ID: #{record.id}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                  </div>
                                                  <div className="modal-body">
                                                    Are you sure you want to delete {record.departmentName}'s department? ALL RELATED CONTACTS WOULD ALSO BE DELETED. THIS ACTION CANNOT BE UNDONE!
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteDirectoryDepartment(record.id)}>DELETE CONTACT</button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                        </Container>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                      <Container className="">
                                        <Container className='my-3'>
                                          <Row className='mb-2'>
                                            {
                                              record.departmentDescription && (
                                                <>
                                                  <Col xs={1}>
                                                    <i className="bi bi-info fs-5"></i>
                                                  </Col>
                                                  <Col>
                                                    {record.departmentDescription}
                                                  </Col>
                                                </>
                                              )
                                            }
                                          </Row>
                                          <Row>
                                            <Col xs={1}>
                                              <i className="bi bi-geo-alt"></i>
                                            </Col>
                                            <Col>
                                            <p>
                                              {
                                                record.addressNote ? (
                                                  <>
                                                  {record.addressNote} <br />
                                                  </>
                                                ) : (
                                                  <></>
                                                )
                                              }
                                              {record.facility.addressLineOne} <br />
                                              {
                                                record.facility.addressLineTwo ? (
                                                  <>
                                                  {record.facility.addressLineTwo} <br />
                                                  </>
                                                ) : (
                                                  <></>
                                                )
                                              }
                                              {record.facility.city}, {record.facility.stateCode} {record.facility.zipCode}
                                            </p>
                                            </Col>
                                            <Col xs={1}>
                                              <i className="bi bi-telephone"></i>
                                            </Col>
                                            <Col>
                                              <p>
                                                {record.phoneNumber}
                                              </p>
                                            </Col>
                                            <Col xs={1}>
                                              <i className="bi bi-list-ol"></i>
                                            </Col>
                                            <Col>
                                              <p>
                                              {record.phoneExtension}
                                              </p>
                                            </Col>
                                          </Row>
                                        </Container>
                                        <Container className='d-flex flex-wrap justify-content-center'>
                                            {
                                            record.people.$values.length > 0 ? (
                                              record.people.$values.map((person: any) => (
                                              <>
                                                <Card style={{ width: '24rem' }} className="m-1">
                                                <Card.Body>
                                                  <Row>
                                                  <Col md={12}>
                                                    <Card.Subtitle className="mb-2 text-muted">{person.firstName} {person.lastName}</Card.Subtitle>
                                                    <Badge bg="dark">{person.jobPosition}</Badge>
                                                    <Row>
                                                    <Col xs={1}>
                                                      <i className="bi bi-geo-alt"></i>
                                                    </Col>
                                                    <Col>
                                                      <p>
                                                        {
                                                        record.addressNote ? (
                                                          <>
                                                          {record.addressNote} <br />
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )
                                                        }
                                                        {record.facility.addressLineOne} <br />
                                                        {
                                                        record.facility.addressLineTwo ? (
                                                          <>
                                                          {record.facility.addressLineTwo} <br />
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )
                                                        }
                                                        {record.facility.city}, {record.facility.stateCode} {record.facility.zipCode}
                                                      </p>
                                                    </Col>
                                                    </Row>
                                                    <Row>
                                                    <Col xs={1}>
                                                      <i className="bi bi-telephone"></i>
                                                    </Col>
                                                    <Col>
                                                      <p>
                                                      {person.phoneNumber}
                                                      </p>
                                                    </Col>
                                                    <Col xs={1}>
                                                      <i className="bi bi-list-ol"></i>
                                                    </Col>
                                                    <Col>
                                                      <p>
                                                      {person.phoneExtension}
                                                      </p>
                                                    </Col>
                                                    </Row>
                                                    {
                                                    person.corporateCellphone ? (
                                                      <Row>
                                                      <Col xs={1}>
                                                        <i className="bi bi-phone"></i>
                                                      </Col>
                                                      <Col>
                                                        <p>
                                                        {person.corporateCellphone}
                                                        </p>
                                                      </Col>
                                                      </Row>
                                                    ) : (
                                                      <></>
                                                    )
                                                    }
                                                    {
                                                    person.email ? (
                                                      <Row>
                                                      <Col xs={1}>
                                                        <i className="bi bi-envelope"></i>
                                                      </Col>
                                                      <Col>
                                                        <p>
                                                        {person.email}
                                                        </p>
                                                      </Col>
                                                      </Row>
                                                    ) : (
                                                      <></>
                                                    )
                                                    }
                                                  </Col>
                                                  <Col md="auto" className='text-center'>
                                                    <Button variant="info" className='me-2' href={`${process.env.REACT_APP_BASENAME}/admin/directory/person/${person.id}`}><i className="bi bi-pencil-square"></i></Button>
                                                    <Button variant="danger" data-bs-toggle="modal" data-bs-target={`#deletePerson-${person.id}`}><i className="bi bi-trash3"></i></Button>
                                                      {/* Confirm Deletion Modal */}
                                                      <div className="modal fade" id={`deletePerson-${person.id}`} tabIndex={-1} aria-labelledby={`deletePerson-${person.id}`} aria-hidden="true">
                                                        <div className="modal-dialog">
                                                          <div className="modal-content">
                                                            <div className="modal-header">
                                                              <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | {person.firstName} {person.lastName} - ID: #{person.id}</h1>
                                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                              Are you sure you want to delete {person.firstName} {person.lastName}'s contact? THIS ACTION CANNOT BE UNDONE!
                                                            </div>
                                                            <div className="modal-footer">
                                                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteDirectoryPerson(person.id)}>DELETE CONTACT</button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                  </Col>
                                                  </Row>
                                                </Card.Body>
                                                </Card>
                                              </>
                                              ))
                                            ) : (
                                              <Container className='text-center'>
                                                <h5>People aren't assigned on this Department.</h5>
                                                <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/directory/person/new`}><i className="bi bi-journal-plus"></i> Add Contact</Button>
                                              </Container>
                                            )
                                            }
                                        </Container>
                                      </Container>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                </>
                              )
                            })
                          ) : (
                            <>
                              <Container className="text-center min-vh-100">
                                <Spinner animation="grow" variant="success"/>
                              </Container>
                            </>
                          )
                        }
                      </Accordion>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

}

export default PhoneDirectory;