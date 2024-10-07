import { Container, Button, Card, Row, Col } from "react-bootstrap";
import MainNavbar from "../components/layout/Navbar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Announcement1 from "../components/images/sample-images/announcement1.png";
import Announcement2 from "../components/images/sample-images/announcement2.png";
import Announcement3 from "../components/images/sample-images/announcement3.png";

const Home = () => {

    return(
        <div>
            <MainNavbar />

            <Container className="mt-5">
                <h2>Bienvenidos, estudiantes e invitados!</h2>
            </Container>

            <Container className="mt-4">
              <Row>
                <Col sm>                    
                    <Container>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement2} height={150} />
                          <Card.Body>
                            <Card.Title><a href="#">Apoya a nuestras Tigresas en el Torneo de Baloncesto Femenino</a></Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement3} height={150} />
                          <Card.Body>
                            <Card.Title><a href="#">Repasos de College Board - Libre de costo</a></Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col xs={6}>
                    <Container>
                        <Card>
                          <Card.Img variant="top" src={Announcement1} height={494} />
                          <Card.Body>
                            <Card.Title><a href="#">Regala vida aportando al Banco de Sangree</a></Card.Title>
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
                          <Card.Img variant="top" src={Announcement2} height={150} />
                          <Card.Body>
                            <Card.Title><a href="#">Apoya a nuestras Tigresas en el Torneo de Baloncesto Femenino</a></Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-2">
                          <Card.Img variant="top" src={Announcement3} height={150} />
                          <Card.Body>
                            <Card.Title><a href="#">Repasos de College Board - Libre de costo</a></Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    </Container>
                </Col>
              </Row>
            </Container>
        </div>
    )

}

export default Home;