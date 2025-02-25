import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col, ListGroup, Spinner, Alert, Accordion, Badge } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es-us';
import MainNavbar from "../components/layout/Navbar";
import ComponentBar from "../components/layout/ComponentBar";
import Footer from "../components/layout/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from "../components/images/image.jpg";

const Directory = () => {

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
    code: string,
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [departmentData, setDepartmentData] = useState<DirectoryContent[]>([]);
  const [facilityData, setFacilityData] = useState<DirectoryFacilityContent[]>([]);

  const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

  // Truncate Content (Truncate words from a sentence to be more shorter).
  const truncateContent = (content: any, wordLimit: any) => {
    const words = content.split(' ');
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Strip HTML (Remove HTML tags from Post Content, so it can show on the table without it.).
  const stripHtml = (html: any) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  useEffect(() => {

    const getDepartments = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department`,
      ).then(function (response) {
        if (response.status === 200) {
          setDepartmentData(response.data.$values);
          setIsLoaded(true);
        }
      }).catch(function (error) {
        setAlertMessage({message: "Se ha producido un error al cargar el directorio. Por favor, intentelo más tarde.", variant: "danger" });
      }
  
    )}

    const getFacilities = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility`,
      ).then(function (response) {
        if (response.status === 200) {
          setFacilityData(response.data.$values);
          setIsLoaded(true);
        }
      }).catch(function (error) {
        setAlertMessage({message: "Se ha producido un error al cargar la lista de instalaciones. Por favor, intentelo más tarde.", variant: "danger" });
      }
  
    )}

    getDepartments();
    getFacilities();
    // eslint-disable-next-line
  }, []);

    return(
        <div>
            <ComponentBar />
            <MainNavbar />

            <Container className="mt-3">
              { alertMessage?.message && (
                <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
              )}
            </Container>

            <Container className="mt-5">
              <a className="link" href={`${process.env.REACT_APP_BASENAME}/`}><i className="bi bi-arrow-90deg-up"></i> Volver al Inicio</a>
            </Container>

            <Container className="mt-4">

            
            <Container className="mb-3">
              <h2>Nuestras Facilidades</h2>
            </Container>

            <Container className="d-flex flex-wrap justify-content-center">
              {
                facilityData.map(record => {
                  return(
                  <>
                      <Card className="m-2" style={{ width: '25rem' }}>
                        <Card.Body>
                          <h6 className="text-green">{record.facilityName}</h6>
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
                        </Card.Body>
                      </Card>
                  </>
                )})
              }  
            </Container>

            <Container className="mb-3">
              <h2>Directorio Telefónico</h2>
            </Container>

              <Accordion defaultActiveKey="1">
                {
                  isLoaded ? (
                    departmentData.map(record => {
                      return(
                        <>
                          <Accordion.Item key={record.id} eventKey={record.id.toString()}>
                            <Accordion.Header>
                              {record.departmentName}
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
                                          <Card.Subtitle className="mb-2 text-green">{person.firstName} {person.lastName}</Card.Subtitle>
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
                    <Container className="text-center min-vh-100">
                      <Spinner animation="grow" variant="success"/>
                    </Container>
                  )
                }
              </Accordion>

            </Container>
            <Footer />
        </div>
    )

}

export default Directory;