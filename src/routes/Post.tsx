import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es-us';
import MainNavbar from "../components/layout/Navbar";
import ComponentBar from "../components/layout/ComponentBar";
import Footer from "../components/layout/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Announcement1 from "../components/images/sample-images/announcement1.png";
import Announcement2 from "../components/images/sample-images/announcement2.png";
import Image from "../components/images/image.jpg";
import '../App.css';

const Post = () => {

    interface PostContent {
        id: number,
        title: string,
        content: string,
        publishedAt: any,
        publishedBy: number,
        frontBannerFile: string,
        authorName: string
    }

    const { id } = useParams();
    
    const [post, setPost] = useState<PostContent | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postContent, setPostContent] = useState('');

    const getPost = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/post/${id}`,
      ).then(function (response) {
        if (response.status === 200) {
          setPost(response.data);
          setPostContent(response.data.content);
          setIsLoaded(true);
        }
      }).catch(function (error) {
        
      }
    
    )}


    useEffect(() => {
        getPost();
        // eslint-disable-next-line
      }, []);

    const sanitizedContent = { __html: postContent };

    return(
        <div>
           <ComponentBar />
           <MainNavbar />
           {
                isLoaded ? (
                    <>
                        {
                             post !== null ? (
                                 <>
                                     <Container className="mt-5">
                                         <div className="mb-3">
                                             <a className="link" href={`${process.env.REACT_APP_BASENAME}/`}><i className="bi bi-arrow-90deg-up"></i> <i className="bi bi-house"></i> Inicio</a>
                                         </div>
                                         <Row>
                                             {/*Main Post*/}
                                             <Col xs={12} md={8}>    
                                                 <div className="main-post mb-5">
                                                 {
                                                     post.frontBannerFile ? (
                                                         <img src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${post.id}/banner`} alt="Announcement" width={800} className="main-img" />
                                                     ) : (
                                                         <img src={Image} alt="Announcement" width={800}className="main-img" />
                                                     )
                                                 }
                                                    <h4 className="my-2 text-green">{post.title}</h4>
                                                    <div dangerouslySetInnerHTML={sanitizedContent} />
                                                 </div>
                                             <hr className="mt-5"/>
                                             <div className="organizer-info mb-5">
                                                 <h4>Información del Autor</h4>
                                                 <p>
                                                     <i className="bi bi-person-fill organizer-icon"></i>
                                                      Publicado por: {post.authorName}
                                                 </p>
                                                 <p>
                                                     <i className="bi bi-calendar-week text-success me-1"></i> 
                                                      {moment(post.publishedAt).locale('es-us').format('LLLL')}
                                                  </p>
                                              </div>
                                                </Col>
                                             
                                             
                                              {/* Related Posts Column */}
                                              <Col xs={12} md={4}>
                                                     <h4 className="related-heading">Otros Posts</h4>
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
                                 </>
                             ) : (
                                 <>
                                     <Container className="text-center my-5">
                                         <h1 className="text-success">Error 404</h1>
                                         <h5 className="mb-4">Whoopsy! The post you are looking for does not exist.</h5>
                                         <Button variant="success" href="/"><i className="bi bi-house"></i> Go Home</Button>
                                     </Container>
                                 </>
                             )
                        }
                    </>
                ) : (
                    <>
                    <Container className="text-center mt-5">
                      <Spinner animation="grow" variant="success"/>
                    </Container>
                    </>
                )
           }
            
           <Footer />
        </div>
    )

}

export default Post;