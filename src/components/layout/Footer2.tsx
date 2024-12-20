import { Button, Container, Row, Col } from 'react-bootstrap';
import FooterLogo from "../images/inter-logo.png";
import LegorayLogo from "../images/legoray-logo.png";
import SVGCSA from "../images/SVGCSA.png";

const Footer = () => {

    return(
        <div className='footer'>
            <Container className="developer-footer-bar text-white mt-auto" fluid>
                <p>
                    Developed and designed by <a href="https://legoray.com" target="_blank"><img src={LegorayLogo} height={30} /></a> on behalf from the <img src={SVGCSA} height={50} />
                </p>
            </Container>
        </div>
    )

}

export default Footer;