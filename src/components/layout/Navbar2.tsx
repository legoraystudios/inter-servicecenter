import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavLogo from "../images/Service-Center-Logo.png";

const Navbar2 = () => {

    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container className="d-flex justify-content-center" fluid>
                <Navbar.Brand href="/"><img src={NavLogo} height={70} /></Navbar.Brand>
              </Container>
            </Navbar>
            <Container fluid className='green-navbar'></Container>
        </div>
    )

}

export default Navbar2;