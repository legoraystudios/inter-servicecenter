import { Container, Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import MainNavbar from "../components/layout/Navbar";
import ComponentBar from "../components/layout/ComponentBar";
import Footer from "../components/layout/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Announcement1 from "../components/images/sample-images/announcement1.png";
import Announcement2 from "../components/images/sample-images/announcement2.png";
import Announcement3 from "../components/images/sample-images/announcement3.png";
import './Post.css';
const Post = () => {

    return(
        <div>
           <ComponentBar />
           <MainNavbar />
            <Container>
            <Row>
                <h2>Titulo del Post</h2>
            </Row>
            <Row>
                {/*Main Post*/}
                <Col xs={12} md={8}>    
                <div className="main-post">
                <img src={Announcement3} alt="Announcement" className="main-img" />
                    <h4>Announcement</h4>
                     <p>
                        This is a sample announcement post. Here you can add the details about the announcement, along with an image to make it more engaging.
                     </p>
                </div>
                <hr/>
                <div className="organizer-info">
                    <h4>For more Information</h4>
                    <p>
                        <i className="bi bi-person-fill organizer-icon"></i>
                         Organizer Name

                    </p>
                    <p>
                         <i className="bi bi-envelope-fill email-icon"></i>
                        <a href="#" className="email-link"> example.com</a>
                    </p>
                    <p>
                        <i className="bi bi-telephone-fill phone-icon"></i> 
                        <a href="tel:+1234567890" className="phone-link">+1 234 567 890</a> 
                     </p>
                 </div>
                </Col>
               

                 {/* Related Posts Column */}
                 <Col xs={12} md={4}>
                        <h4 className="related-heading">Other Posts</h4>
                        <Card className="related-post">
                            <Card.Img  src={Announcement1} alt="Related Post 1" />
                            <Card.Body>
                                <Card.Title>Related Post 1</Card.Title>
                                <Card.Text>Brief description of related post 1.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="related-post">
                            <Card.Img  src={Announcement2} alt="Related Post 2" />
                            <Card.Body>
                                <Card.Title>Related Post 2</Card.Title>
                                <Card.Text>Brief description of related post 2.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
           <Footer />
        </div>
    )

}

export default Post;