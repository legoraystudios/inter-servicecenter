import { Container, Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import MainNavbar from "../components/layout/Navbar";
import ComponentBar from "../components/layout/ComponentBar";
import Footer from "../components/layout/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Announcement1 from "../components/images/sample-images/announcement1.png";
import Announcement2 from "../components/images/sample-images/announcement2.png";
import Announcement3 from "../components/images/sample-images/announcement3.png";

const Home = () => {

    return(
        <div>
            <ComponentBar />
            <MainNavbar />

            <Container className="mt-5">
                <h2>Bienvenidos, estudiantes e invitados!</h2>
            </Container>

            <Container className="mt-4">
              <Row>
                <Col sm>                    
                    <Container>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement2} height={185} />
                          <Card.Body>
                            <Card.Text><a className="green-link" href="#">Apoya a nuestras Tigresas en el Torneo de Baloncesto Femenino</a></Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement3} height={185} />
                          <Card.Body>
                            <Card.Text><a className="green-link" href="http://localhost:3000/post">Repasos de College Board - Libre de costo</a></Card.Text>
                          </Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col xs={6}>
                    <Container>
                        <Card>
                          <Card.Img variant="top" src={Announcement1} height={380} />
                          <Card.Body>
                            <Card.Title><a className="green-link" href="#">Regala vida aportando al Banco de Sangree</a></Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col sm>
                    <Container>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement2} height={185} />
                          <Card.Body>
                            <Card.Text><a className="green-link" href="#">Apoya a nuestras Tigresas en el Torneo de Baloncesto Femenino</a></Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement3} height={185} />
                          <Card.Body>
                            <Card.Text><a className="green-link" href="http://localhost:3000/post">Repasos de College Board - Libre de costo</a></Card.Text>
                          </Card.Body>
                        </Card>
                    </Container>
                </Col>
              </Row>
            </Container>

            <Container className="mt-3 d-flex justify-content-center">
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
            </Container>

            <Footer />
        </div>
    )

}

export default Home;