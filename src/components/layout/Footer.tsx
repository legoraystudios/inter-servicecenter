import { Button, Container } from 'react-bootstrap';
import FooterLogo from "../images/inter-logo.png";
import LegorayLogo from "../images/legoray-logo.png";

const Footer = () => {

    return(
        <div>
            <footer className="py-3 mt-5 dark-grey-background text-white">
              <Container className="my-5 d-flex justify-content-center">
                  <img className="mx-auto" src={FooterLogo} />
              </Container>
              <Container className="text-center">
                  <h4 className="fw-normal">Encuéntranos</h4>
              </Container>
              <Container>
                  <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><i className="bi bi-facebook me-1 fs-4"></i></a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><i className="bi bi-twitter-x me-1 fs-4"></i></a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><i className="bi bi-linkedin me-1 fs-4"></i></a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><i className="bi bi-instagram me-1 fs-4"></i></a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><i className="bi bi-tiktok me-1 fs-4"></i></a></li>
                  </ul>
              </Container>
              <p className="footer-disclaimer text-center text-white">La Universidad Interamericana de Puerto Rico (UIPR) posee Licencia de Renovación de la Junta de Instituciones Postsecundarias de Puerto Rico y todos los programas académicos, incluyendo los programas de educación en línea, están autorizados por dicha Agencia. La UIPR es una institución acreditada y miembro de la Middle States Commission on Higher Education (MSCHE) www.msche.org. El estatus de acreditación de la Universidad Interamericana de Puerto Rico es “Acreditación Reafirmada”. La acción más reciente de la Comisión sobre el estatus de acreditación de la Institución el 22 de junio de 2023 fue reafirmar el estatus de acreditación. La MSCHE está reconocida por la Secretaría de Educación de los Estados Unidos para llevar a cabo actividades de acreditación y preacreditación (estatus de candidato) para instituciones de educación superior, incluyendo educación a distancia, por correspondencia y programas de evaluación directa ofrecidos en dichas instituciones. El área geográfica de las actividades de acreditación de la Comisión se extiende por todo Estados Unidos. La Institución está aprobada por la Agencia Estatal de Servicios Educativos a Veteranos para proveer formación académica a los estudiantes bajo diversos programas GI Bill®. GI Bill® es una marca registrada del Departamento de Asuntos al Veterano (VA).</p>
              <Container className='d-flex justify-content-end' fluid>
                <Button variant="link" className='text-danger'>Admin Mode</Button>
              </Container>
            </footer>
            <Container className="developer-footer-bar text-white" fluid>
                <p>
                    Developed and designed by <a href="https://legoray.com" target="_blank"><img src={LegorayLogo} height={30} /></a>
                </p>
            </Container>
        </div>
    )

}

export default Footer;