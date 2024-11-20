import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import axios from 'axios';
import MainNavbar from "../components/layout/Navbar";
import ComponentBar from "../components/layout/ComponentBar";
import Footer from "../components/layout/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Announcement1 from "../components/images/sample-images/announcement1.png";
import Announcement2 from "../components/images/sample-images/announcement2.png";
import Announcement3 from "../components/images/sample-images/announcement3.png";
import Image from "../components/images/image.jpg";

const Home = () => {

  interface PostContent {
    id: number,
    title: string,
    content: string,
    publishedAt: any,
    publishedBy: number,
    frontBannerFile: string,
    authorName: string
  }

  const [posts, setPosts] = useState<PostContent[]>([]);
  const [currentPage, setCurrentPage] = useState(5);
  const postsPerPage = 10;

  // Truncate Content (Truncate words from a sentence to be more shorter).
  const truncateContent = (content: any, wordLimit: any) => {
    const words = content.split(' ');
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const getPosts = async () => {

    await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/post`,
    ).then(function (response) {
      if (response.status === 200) {
        setPosts(response.data.$values)
      }
    }).catch(function (error) {

    }

  )}


  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

    return(
        <div>
            <ComponentBar />
            <MainNavbar />

            <Container className="mt-5">
                <h2>Bienvenidos, estudiantes e invitados!</h2>
            </Container>

            <Container className="mt-4">
              {
                posts && posts.length > 0 && (
                  <>
                    <Row>
                      <Col sm>                    
                          <Container>
                          {
                                posts[1] && (
                                  <Card className="mb-2">
                                    {
                                        posts[1].frontBannerFile ? (
                                          <>
                                            <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${posts[1].id}/banner`} height={187} />
                                          </>
                                        ) : (
                                          <>
                                            <Card.Img variant="top" src={Image} height={185} />
                                          </>
                                        )
                                    }
                                    <Card.Body>
                                      <Card.Text><a className="green-link" href="#">{posts[1].title}</a></Card.Text>
                                    </Card.Body>
                                  </Card>
                                )
                              }
                              {
                                posts[2] && (
                                  <Card className="mb-2">
                                    {
                                        posts[2].frontBannerFile ? (
                                          <>
                                            <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${posts[2].id}/banner`} height={187} />
                                          </>
                                        ) : (
                                          <>
                                            <Card.Img variant="top" src={Image} height={185} />
                                          </>
                                        )
                                    }
                                    <Card.Body>
                                      <Card.Text><a className="green-link" href="#">{posts[2].title}</a></Card.Text>
                                    </Card.Body>
                                  </Card>
                                )
                              }
                          </Container>
                      </Col>
                      <Col xs={6}>
                          <Container>
                            {
                              posts[0] && (
                                <Card>
                                  {
                                    posts[0].frontBannerFile ? (
                                      <>
                                        <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${posts[0].id}/banner`} height={380} />
                                      </>
                                    ) : (
                                      <>
                                        <Card.Img variant="top" src={Image} height={380} />
                                      </>
                                    )
                                  }
                                  <Card.Body>
                                    <Card.Title><a className="green-link" href="#">{posts[0].title}</a></Card.Title>
                                    <Card.Text>
                                    {truncateContent(posts[0].content, 20)}
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              )
                            }

                          </Container>
                      </Col>
                      <Col sm>
                          <Container>
                          {
                                posts[3] && (
                                  <Card className="mb-2">
                                    {
                                        posts[3].frontBannerFile ? (
                                          <>
                                            <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${posts[3].id}/banner`} height={187} />
                                          </>
                                        ) : (
                                          <>
                                            <Card.Img variant="top" src={Image} height={185} />
                                          </>
                                        )
                                    }
                                    <Card.Body>
                                      <Card.Text><a className="green-link" href="#">{posts[3].title}</a></Card.Text>
                                    </Card.Body>
                                  </Card>
                                )
                              }
                              {
                                posts[4] && (
                                  <Card className="mb-2">
                                    {
                                        posts[4].frontBannerFile ? (
                                          <>
                                            <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${posts[4].id}/banner`} height={187} />
                                          </>
                                        ) : (
                                          <>
                                            <Card.Img variant="top" src={Image} height={185} />
                                          </>
                                        )
                                    }
                                    <Card.Body>
                                      <Card.Text><a className="green-link" href="#">{posts[4].title}</a></Card.Text>
                                    </Card.Body>
                                  </Card>
                                )
                              }
                          </Container>
                      </Col>
                    </Row>
                  </>
                )
              }
            </Container>
            <Container className="d-flex justify-content-center mt-3">
              <Button variant="link" className="nav-link nav-dropdown-item">View past posts <i className="bi bi-chevron-double-down"></i></Button>
            </Container>

            <Container className="my-3 p-3 border border-1 rounded" >
              <Row>
                <Col xs={2}>
                  <img src={Image} height={120} />
                </Col>
                <Col>
                  <Card.Title><a className="green-link" href="#">Lorem Ipsum</a></Card.Title>
                  <Card.Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </Card.Text>
                  <div>
                    <p>
                      <i className="bi bi-calendar-week text-success"></i> 20 de diciembre de 2024 <br />
                      <i className="bi bi-person-fill text-success"></i> Creado por Raymond Negron
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>

            {/*<Container className="mt-3 d-flex justify-content-center">
              <ListGroup className="" horizontal>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Dom 13</h5></li>
                  </ul>
                  <p>No hay eventos.</p>
                </ListGroup.Item>
                <ListGroup.Item className="calendar-active-color text-white">
                  <ul className="list-inline">
                    <li className="list-inline-item text-warning"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item text-warning"><h5>Lun 14</h5></li>
                  </ul>
                  <ul className="list-inline text-wrap" style={{ width: '10rem' }}>
                    <li className="list-inline-item"><i className="bi bi-clock-fill"></i></li>
                    <li className="list-inline-item"><p>8:00am - 5:00pm | Bienvenida Estudiantil</p></li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Mar 15</h5></li>
                  </ul>
                  <p>No hay eventos.</p>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Mie 16</h5></li>
                  </ul>
                  <ul className="list-inline text-wrap" style={{ width: '10rem' }}>
                    <li className="list-inline-item"><i className="bi bi-clock-fill"></i></li>
                    <li className="list-inline-item"><p>12:00pm - 2:00pm | Feria de Salud</p></li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Jue 17</h5></li>
                  </ul>
                  <p>No hay eventos.</p>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Vie 18</h5></li>
                  </ul>
                  <p>No hay eventos.</p>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="bi bi-calendar-fill"></i></li>
                    <li className="list-inline-item"><h5>Sab 19</h5></li>
                  </ul>
                  <p>No hay eventos.</p>
                </ListGroup.Item>
              </ListGroup>
            </Container>*/}

            <Footer />
        </div>
    )

}

export default Home;