import { Button, Container, Row, Col } from 'react-bootstrap';
import FooterLogo from "../images/inter-logo.png";
import LegorayLogo from "../images/legoray-logo.png";
import SVGCSA from "../images/SVGCSA.png";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return(
        <div className='footer'>
            <Container className="d-flex align-items-center justify-content-center developer-footer-bar text-white mt-auto" fluid>
                <Row>
                    <Col xg>
                        <p>&#169; {currentYear} - Inter American University of Puerto Rico. All Rights Reserved</p>
                    </Col>
                    <Col>
                        <p>
                            Developed by <a href="https://legoray.com" target="_blank"><img src={LegorayLogo} height={30} /></a> | <img src={SVGCSA} height={50} />
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default Footer;