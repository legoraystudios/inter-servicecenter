import { Button, Container, Row, Col } from 'react-bootstrap';
import FooterLogo from "../images/inter-logo.png";
import LegorayLogo from "../images/legoray-logo.png";
import SVGCSA from "../images/SVGCSA.png";

const Footer = () => {

    return(
        <div>
            <footer className="py-3 mt-5 dark-grey-background text-white">
            <Container>
              <Row>
                <Col sm={5}>
                    <Container className="my-5 d-flex justify-content-center">
                      <img className="mx-auto" src={FooterLogo} />
                    </Container>
                    <Container className="text-center">
                        <h4 className="fw-normal">Encuéntranos</h4>
                    </Container>
                    <Container>
                        <ul className="nav justify-content-center pb-3 mb-3">
                          <li className="nav-item"><a href="https://www.facebook.com/inter.fajardo.edu/" target="_blank" className="nav-link px-2 text-white"><i className="bi bi-facebook me-1 fs-4"></i></a></li>
                          <li className="nav-item"><a href="https://x.com/inter_fajardo" target="_blank" className="nav-link px-2 text-white"><i className="bi bi-twitter-x me-1 fs-4"></i></a></li>
                          <li className="nav-item"><a href="https://www.linkedin.com/in/interfajardo/" target="_blank" className="nav-link px-2 text-white"><i className="bi bi-linkedin me-1 fs-4"></i></a></li>
                          <li className="nav-item"><a href="https://www.instagram.com/inter_fajardo" target="_blank" className="nav-link px-2 text-white"><i className="bi bi-instagram me-1 fs-4"></i></a></li>
                          <li className="nav-item"><a href="http://www.tiktok.com/@inter.fajardo" target="_blank" className="nav-link px-2 text-white"><i className="bi bi-tiktok me-1 fs-4"></i></a></li>
                        </ul>
                    </Container>
                </Col>
                <Col sm={3}>
                    <Container className="my-5 justify-content-center">
                        <h5>Enlaces de Interés</h5>
                        <div className='border-bottom mb-5 border-secondary'></div>
                        <ul className="list-unstyled">
                          <li className="nav-item"><a className="text-white text-decoration-none" href="http://fajardo.inter.edu/directorio/instrucciones-red-wireless/" target="_blank">Instrucciones Red Wireless</a></li>
                          <li className="nav-item"><a className="text-white text-decoration-none" href="http://fajardo.inter.edu/student-achievement/" target="_blank">Student Achievement</a></li>
                          <li className="nav-item"><a className="text-white text-decoration-none" href="http://fajardo.inter.edu/acreditaciones/" target="_blank">Acreditaciones</a></li>
                          <li className="nav-item"><a className="text-white text-decoration-none" href="https://uis.inter.edu/prod/" target="_blank">Banner 9 Prod</a></li>
                          <li className="nav-item"><a className="text-white text-decoration-none" href="https://oficinas-centrales.kronos.net/wfc/logon" target="_blank">Kronos</a></li>
                        </ul>
                    </Container>
                </Col>
                <Col sm={3}>
                    <Container className="my-5 justify-content-center">
                        <h5>Servicios</h5>
                        <div className='border-bottom mb-5 border-secondary'></div>
                        <Button href="https://www.inter.edu/professional-licensure-notifications/" target="_blank">Professional Licensure Notification</Button>
                    </Container>
                </Col>
              </Row>
            </Container>

            <div className='border-bottom mb-3 border-secondary'></div>
              
              <p className="footer-disclaimer text-secondary">La Universidad Interamericana de Puerto Rico posee Licencia de Renovación de la Junta de Instituciones Postsecundarias de Puerto Rico y todos los programas académicos, incluyendo los programas de educación en línea, están autorizados por dicha Agencia. La Universidad Interamericana está acreditada por la Middle States Commission on Higher Education(MSCHE)1007 North Orange Street 4th Floor, MB #166, Wilmington, DE 19801 (267-284-5000). La MSCHE es una agencia de acreditación institucional reconocida por el Secretario de Educación de los Estados Unidos de Norteamérica y por el Council on Higher Education Accreditation (CHEA).</p>
            </footer>
            <Container className="developer-footer-bar text-white" fluid>
                <p>
                    Developed and designed by <a href="https://legoray.com" target="_blank"><img src={LegorayLogo} height={30} /></a> on behalf from the <img src={SVGCSA} height={50} />
                </p>
            </Container>
        </div>
    )

}

export default Footer;