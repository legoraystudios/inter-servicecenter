import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
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

    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);
    
    const [post, setPost] = useState<PostContent | null>(null);
    const [otherPosts, setOtherPosts] = useState<PostContent[]>([]);
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
        setAlertMessage({message: "ERROR: An error has occured while gathering current post.", variant: "danger" });
      }
    
    )}

    const getOtherPosts = async () => {

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/post`,
        ).then(function (response) {
          if (response.status === 200) {
            if (response.data.$values.length > 1) {
                // Filter Current Post from List
                const filteredPosts = response.data.$values.filter((post: PostContent) => post.id !== parseInt(id!));
                const shuffledPosts = filteredPosts.sort(() => 0.5 - Math.random());

                // Select First 10 Posts
                const firstTen = shuffledPosts.slice(0, Math.min(10, filteredPosts.length));

                // Randomly select two from the first 10
                if (firstTen.length > 1) {
                    const selectedPosts = firstTen.sort(() => 0.5 - Math.random()).slice(0, 2);
                    setOtherPosts(selectedPosts);
                } else if (firstTen.length === 1) {
                    setOtherPosts(firstTen);
                } else {
                    setOtherPosts([]);
                }
            }
            setIsLoaded(true);
          }
        }).catch(function (error) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current posts.", variant: "danger" });
        }
    
      )}

    useEffect(() => {
        getPost();
        getOtherPosts();
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
                                        <Container className="mt-3">
                                            { alertMessage?.message && (
                                              <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                                            )}
                                        </Container>
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
                                              {
                                                otherPosts.length > 0 && (
                                                    <>
                                                        <Col xs={12} md={4}>
                                                             <h4 className="related-heading">Otros Posts</h4>
                                                             {
                                                                    otherPosts.map((post: PostContent) => (
                                                                        <Card key={post.id} className="related-post">
                                                                            <Card.Img src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${post.id}/banner`} alt={post.title} />
                                                                            <Card.Body>
                                                                                <Card.Title><a className="green-link" href={`${process.env.REACT_APP_BASENAME}/post/${post.id}`}>{post.title}</a></Card.Title>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    ))
                                                             }
                                                        </Col>
                                                    </>
                                                )
                                              }
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