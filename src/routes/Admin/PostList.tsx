import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Image from '../../components/images/image.jpg';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Posts = () => {

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

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Status Bar Message Data
    const [posts, setPosts] = useState<PostContent[]>([]);

    // Alert Messages
    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

    // Truncate Content (Truncate words from a sentence to be more shorter).
    const truncateContent = (content: any, wordLimit: any) => {
      const words = content.split(' ');
      return words.slice(0, wordLimit).join(' ') + '...';
    };

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

    const getPosts = async () => {

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/post`,
        ).then(function (response) {
          if (response.status === 200) {
            setPosts(response.data.$values)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current posts.", variant: "danger" });
          } 
        }
    
    )}

    const deletePost = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/post/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Post deleted successfully!", variant: "success" });
          getPosts();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the post.", variant: "danger" });
        } 
      }
  
  )}
    

    useEffect(() => {
        document.title = "Posts | Service Center";
        checkIfSignedIn();
        getPosts();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5">
                    <Container>
                      <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/dashboard`}><i className="bi bi-arrow-90deg-up"></i> Go back to Dashboard</a>
                      <h3>Posts</h3>
                    </Container>

                    <Container className="mt-3">
                        { alertMessage?.message && (
                          <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                        )}
                    </Container>

                    <Container className="mt-3 d-flex justify-content-end">
                        <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/post/new`}><i className="bi bi-newspaper"></i> Create Post</Button>
                    </Container>

                    <div className='mt-3'>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Banner Preview</th>
                              <th>Title</th>
                              <th>Content</th>
                              <th>Published Date</th>
                              <th>Author</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                                posts.map(record => {
                                    return (
                                            <>
                                              <tr key={record.id}>
                                                <td>{record.id}</td>
                                                {
                                                  record.frontBannerFile ? (
                                                    <>
                                                      <td><img src={`${process.env.REACT_APP_BACKEND_HOST}/api/post/${record.id}/banner`} width={100} /></td>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <td><img src={Image} width={100} /></td>
                                                    </>
                                                  )
                                                }
                                                <td>{record.title}</td>
                                                <td>{truncateContent(record.content, 20)}</td>
                                                <td>{record.publishedAt}</td>
                                                <td>{record.authorName}</td>
                                                <td>
                                                  <Button className='mx-1' variant="info" href={`/admin/post/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                                                  <Button className='mx-1' variant="danger" data-bs-toggle="modal" data-bs-target={`#deletePost-${record.id}`}><i className="bi bi-trash3"></i></Button>
                                                  {/* Confirm Deletion Modal */}
                                                  <div className="modal fade" id={`deletePost-${record.id}`} tabIndex={-1} aria-labelledby={`deletePost-${record.id}`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                      <div className="modal-content">
                                                        <div className="modal-header">
                                                          <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | ID: #{record.id}</h1>
                                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                          Are you sure you want to delete this post? THIS ACTION CANNOT BE UNDONE!
                                                        </div>
                                                        <div className="modal-footer">
                                                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deletePost(record.id)}>DELETE POST</button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </>
                                )
                              })
                          }
                          </tbody>
                        </Table>            
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

}

export default Posts;