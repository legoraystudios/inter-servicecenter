import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SampleImage from '../../components/images/Status-Bar-Example.png';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Card, Alert, Badge, Accordion } from 'react-bootstrap';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(5);

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

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/messages?page=1&pageSize=10`, {
          headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
        }
        ).then(function (response) {
          if (response.status === 200) {
            setStatusBarData(response.data.items.$values)
            setTotalPages(response.data.totalPages);
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

  const handlePageClick = (event: { selected: number; }) => {
    setCurrentPage(event.selected + 1);
    getStatusBarMessages();
  };
    

    useEffect(() => {
        document.title = "Phone Directory | Service Center";
        checkIfSignedIn();
        getStatusBarMessages();
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
                        <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/directory/new`}><i className="bi bi-journal-plus"></i> Add Contact</Button>
                        <Button className='mx-1' variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/directory/department/new`}><i className="bi bi-node-plus"></i> Add Department</Button>
                    </Container>

                    <div className='mt-3'>

                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Asistencia Económica
                          <Container className='d-flex justify-content-end'>
                            <Button variant="info" className='me-2'><i className="bi bi-pencil-square"></i></Button>
                            <Button variant="danger"><i className="bi bi-trash3"></i></Button>
                          </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Container className="">
                          <Container className='my-3'>
                            <Row className='mb-2'>
                              <Col xs={1}>
                                <i className="bi bi-info fs-5"></i>
                              </Col>
                              <Col>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={1}>
                                <i className="bi bi-geo-alt"></i>
                              </Col>
                              <Col>
                              <p>
                                La Casona - 1er Nivel <br />
                                Calle Unión Batey Central Carr. 195 <br />
                                Fajardo, PR 00738-7003
                              </p>
                              </Col>
                              <Col xs={1}>
                                <i className="bi bi-telephone"></i>
                              </Col>
                              <Col>
                                <p>
                                  (787) 863-2390
                                </p>
                              </Col>
                              <Col xs={1}>
                                <i className="bi bi-list-ol"></i>
                              </Col>
                              <Col>
                                <p>
                                2309
                                </p>
                              </Col>
                            </Row>
                          </Container>
                          <Container className='d-flex flex-wrap'>
                            
                            <Card style={{ width: '25rem' }}>
                              <Card.Body>
                                <Row>
                                  <Col>
                                    <Card.Subtitle className="mb-2 text-muted">Marilyn Martínez</Card.Subtitle>
                                    <Badge bg="dark">Técnica de Servicio de Matrícula</Badge>
                                    <Row>
                                      <Col xs={1}>
                                        <i className="bi bi-geo-alt"></i>
                                      </Col>
                                      <Col>
                                        <p>
                                          La Casona - 1er Nivel <br />
                                          Calle Unión Batey Central Carr. 195 <br />
                                          Fajardo, PR 00738-7003
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={1}>
                                        <i className="bi bi-telephone"></i>
                                      </Col>
                                      <Col>
                                        <p>
                                          (787) 863-2390
                                        </p>
                                      </Col>
                                      <Col xs={1}>
                                        <i className="bi bi-list-ol"></i>
                                      </Col>
                                      <Col>
                                        <p>
                                        2309
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={1}>
                                        <i className="bi bi-phone"></i>
                                      </Col>
                                      <Col>
                                        <p>
                                          (939) 000-0000
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={1}>
                                        <i className="bi bi-envelope"></i>
                                      </Col>
                                      <Col>
                                        <p>
                                          ivonne.velez@fajardo.inter.edu
                                        </p>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col className='text-center'>
                                    <Button variant="info" className='me-2'><i className="bi bi-pencil-square"></i></Button>
                                    <Button variant="danger"><i className="bi bi-trash3"></i></Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                          </Container>
                        </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                        <div className="d-flex justify-content-center mt-5">
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="›"
                            pageRangeDisplayed={5}
                            previousLabel="‹"
                            onPageChange={handlePageClick}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            pageCount={totalPages} 
                            marginPagesDisplayed={0}
                          />
                        </div>

                    </div>


                </Container>
            <Footer2 />
        </div>
    )

}

export default PhoneDirectory;