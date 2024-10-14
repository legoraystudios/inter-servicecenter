import Container from 'react-bootstrap/Container';

const ComponentBar = () => {

    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = todaysDate.toLocaleString('es', { month: 'long' });
    const day = todaysDate.getDate();
    var fullDate = "Hoy es " + day + " de " + month + ", " + year;

    return(
        <div>
            <Container className="component-green-bar" fluid>
                <p className="text-center text-white">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    <b></b> Conoce las <a className="text-white" href="#">expresiones del presidente</a> por el paso del Huracán Milton
                </p>
            </Container>
        </div>
    )

}

export default ComponentBar;