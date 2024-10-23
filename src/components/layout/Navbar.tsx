import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLogo from "../images/Service-Center-Logo.png";
import ComponentBar from "./ComponentBar";

const MainNavbar = () => {

    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = todaysDate.toLocaleString('es', { month: 'long' });
    const day = todaysDate.getDate();
    var fullDate = "Hoy es " + day + " de " + month + ", " + year;

    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Brand href="https://fajardo.inter.edu" target="_blank"><img src={NavLogo} height={70} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <NavDropdown className="nav-link" title="Herramientas de Estudio" id="navbarScrollingDropdown">
                        <Container className="nav-dropdown-menu">
                            <h5>Blackboard Learn</h5>
                            <NavDropdown.Divider />
                            <a className="nav-link nav-dropdown-item" href="https://interbb.blackboard.edu" target="_blank">Blackboard Learn</a>
                            <h5>Educosoft (Para clases selectas solamente)</h5>
                            <NavDropdown.Divider />
                            <a className="nav-link nav-dropdown-item" href="https://educosoft.com/" target="_blank">Educosoft.com</a>
                            <h5>Lockdown Browser</h5>
                            <NavDropdown.Divider />
                            <Row>
                              <Col><a className="nav-link nav-dropdown-item" href="https://help.inter.edu/hc/es-419/articles/1500004121781-Gu%C3%ADa-para-la-Instalaci%C3%B3n-de-Respondus-LockDown-Browser-Estudiantes" target="_blank">Respondus Lockdown Browser</a></Col>
                              <Col><a className="nav-link nav-dropdown-item" href="https://help.inter.edu/hc/es-419/articles/1500004085922--C%C3%B3mo-instalo-Remote-Proctor-Now" target="_blank">PSI Software (RPNow)</a></Col>
                            </Row>
                            <h5>Microsoft Office 365</h5>
                            <NavDropdown.Divider />
                            <Row>
                              <Col><a className="nav-link nav-dropdown-item" href="https://portal.office.com/" target="_blank">Todas las Herramientas</a></Col>
                              <Col><a className="nav-link nav-dropdown-item" href="https://outlook.com/" target="_blank">Correo Electrónico (Outlook)</a></Col>
                              <Col><a className="nav-link nav-dropdown-item" href="#">SharePoint</a></Col>
                            </Row>
                        </Container>

                    </NavDropdown>
                    <NavDropdown className="nav-link" title="Servicios al Estudiante" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown className="nav-link" title="Enlaces Útiles" id="navbarScrollingDropdown">
                    <Container className="nav-dropdown-menu">
                            <h5>Cuenta Estudiantil - Okta</h5>
                            <NavDropdown.Divider />
                            <Row>
                              <Col><a className="nav-link nav-dropdown-item" href="#">Okta Dashboard</a></Col>
                              <Col><a className="nav-link nav-dropdown-item" href="#">Unlock Account</a></Col>
                              <Col><a className="nav-link nav-dropdown-item" href="#">Reset Password</a></Col>
                            </Row>
                            <Row>
                              <Col><a className="nav-link nav-dropdown-item" href="#">Change Password</a></Col>
                            </Row>
                            <h5>Contáctanos</h5>
                            <NavDropdown.Divider />
                            <Row>
                              <Col>
                                <a className="nav-link nav-dropdown-item" href="tel:7878603100">
                                  <i className="bi bi-telephone-fill me-1"></i>
                                  (787) 860-3100
                                </a>
                              </Col>
                              <Col>
                                <a className="nav-link nav-dropdown-item" href="#">
                                  <i className="bi bi-journal-text me-1"></i>
                                  Directorio Telefónico
                                </a>
                              </Col>
                              <Col>
                                <a className="nav-link nav-dropdown-item" href="mailto:admisiones@fajardo.inter.edu">
                                  <i className="bi bi-envelope-fill me-1"></i>
                                  admisiones@fajardo.inter.edu
                                </a>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <a className="nav-link nav-dropdown-item" href="https://help.inter.edu/" target="_blank">
                                  <i className="bi bi-question-circle-fill me-1"></i>
                                  Centro de Ayuda
                                </a>
                              </Col>
                            </Row>
                        </Container>
                    </NavDropdown>
                  </Nav>
                  {/*<i className="bi bi-calendar-check-fill nav-link"></i>
                  <Nav.Item className="nav-link mx-2">{fullDate}</Nav.Item>*/}
                  <Nav.Link className='d-flex' href="https://fajardo.inter.edu" target="_blank">
                    <i className="bi bi-box-arrow-up-right me-1"></i>
                        Ir a fajardo.inter.edu
                  </Nav.Link>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container fluid className='green-navbar'></Container>
        </div>
    )

}

export default MainNavbar;