import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../components/images/image.jpg';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const PostDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

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

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Post Data
    const [post, setPost] = useState<PostContent>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [frontBanner, setFrontBanner] = useState<File | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFrontBanner(file);
      } else {
        setFrontBanner(null);
      }
    }

    // Alert Messages
    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

    const navigate = useNavigate()

    const checkIfSignedIn = async () => {
    
      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/account/me`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setUser(response.data)
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
    )}

    const getPost = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/post/${id}`,
        ).then(function (response) {
          if (response.status === 200) {
            setPost(response.data)
            setTitle(response.data.title)
            setContent(response.data.content)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current posts.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const newPost = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/post/`, 
          {
              Title: title,
              Content: content,
              frontBanner: frontBanner
          },
          {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Post created successfully!", variant: "success" });
              setTimeout(() => {
                  navigate("/admin/posts");
                }, 3000);
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            if (!error.response.data.msg) {
              setAlertMessage({message: error.response.data.msg, variant: "danger" });
            } else {
              setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
            }
          } 
        }
  
    )}

    const modifyPost = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/post/`, 
            {
                Id: id,
                Title: title,
                Content: content,
                ...(frontBanner !== null && { frontBanner: frontBanner }),
            },
            {
              headers: {
                 'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${cookieContent}`,
                },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Post modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/posts");
                  }, 3000);
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {
              if (!error.response.data.msg) {
                setAlertMessage({message: error.response.data.msg, variant: "danger" });
              } else {
                setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
              }
            } 
          }
        
    )}

    const removeBanner = async (event: any) => {

      event.preventDefault();
  
        await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/post/${id}/banner`, 
          {
            headers: {
               'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Banner removed successfully!", variant: "success" });
              getPost();
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            if (!error.response.data.msg) {
              setAlertMessage({message: error.response.data.msg, variant: "danger" });
            } else {
              setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
            }
          } 
        }
      
    )}
    

    useEffect(() => {
        document.title = "Post | Service Center";
        checkIfSignedIn();
        getPost();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">
                    <Container>
                      <a className="link" href="/admin/posts"><i className="bi bi-arrow-90deg-up"></i> Go back to Post List</a>
                      {
                        post ? (
                          <h3>Post #{post.id}</h3>
                        ) : (
                          <h3>New Post</h3>
                        )
                      }
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <div className='mt-3'>
                      <Form onSubmit={
                        id == "new" ? (
                          newPost
                        ) : (
                          modifyPost
                        )
                      }>
                        <Form.Control className="mb-3" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Form.Control
                        	            as="textarea"
                        	            placeholder="Content"
                                      value={content} 
                                      onChange={(e) => setContent(e.target.value)}
                        	            style={{ height: '300px' }}
                                      className="mb-3"
                        	          />
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Post Banner (allowed extensions: .png, .jpg and .jpeg).</Form.Label>
                          {
                            post?.frontBannerFile ? (
                              <>
                                <Alert variant="secondary">
                                  Banner uploaded: 
                                    <Alert.Link className="ms-1" href={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${post.id}/banner`} target='_blank'>
                                      {post.frontBannerFile} 
                                    </Alert.Link>
                                  <Button variant="outline-danger" className="mx-3" onClick={removeBanner}>Remove</Button>
                                </Alert>
                              </>
                            ) : (
                              <>
                                <Form.Control type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
                              </>
                            )
                          }
                        </Form.Group>
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href="/admin/posts">Cancel</Button>
                        </div>
                      </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

  }

export default PostDetail;