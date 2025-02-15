import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import UserImage from '../../../components/images/user.png';
import Navbar3 from '../../../components/layout/Navbar3';
import Footer2 from '../../../components/layout/Footer2';
import { Container, Button, Row, Col, Table, Alert, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es-us';
import { useCookies } from 'react-cookie';

const EmployeeList = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface AccountProperties {
        id: number,
        firstName: string,
        lastName: string,
        email: any,
        role: number,
        profilePhotoFile: string,
        createdAt: string
    }

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const [isLoading, setIsLoading] = useState(false);

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Post Data
    const [accounts, setAccounts] = useState<AccountProperties[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(5);

    // Alert Messages
    const [alertMessage, setAlertMessage] = useState<{ message: string; variant: string } | null>(null);

    // Truncate Content (Truncate words from a sentence to be more shorter).
    const truncateContent = (content: any, wordLimit: any) => {
      const words = content.split(' ');
      return words.slice(0, wordLimit).join(' ') + '...';
    };

    // Strip HTML (Remove HTML tags from Post Content, so it can show on the table without it.).
    const stripHtml = (html: any) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
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
        if (response.data.role !== "Admin" && response.data.role !== "Super Administrator") {
          navigate("/admin");
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
      )}

    const getAccounts = async () => {
      
      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/account?page=${currentPage}&pageSize=${postsPerPage}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAccounts(response.data.items.$values)
          setTotalPages(response.data.totalPages);
          setIsLoading(true);
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while gathering accounts.", variant: "danger" });
        } 
      }
    
    )}

    const deleteAccount = async (id: number) => {

      await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/api/account/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setAlertMessage({message: "Account deleted successfully!", variant: "success" });
          getAccounts();
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while deleting the account.", variant: "danger" });
        } 
      }
    )}

    const handlePageClick = (event: { selected: number; }) => {
      setCurrentPage(event.selected + 1);
      getAccounts();
    };
    

    useEffect(() => {
        document.title = "Employees | Service Center";
        checkIfSignedIn();
        getAccounts();
        // eslint-disable-next-line
      }, [currentPage]);

    return(
        <div>
            <Navbar3 />
              {
                isLoading ? (
                  <>
                    <Container className="mt-5 min-vh-100">
                        <Container>
                          <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/dashboard`}><i className="bi bi-arrow-90deg-up"></i> Go back to Dashboard</a>
                          <h3>My Employees</h3>
                        </Container>

                        <Container className="mt-3">
                            { alertMessage?.message && (
                              <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
                            )}
                        </Container>
                          
                        <Container className="mt-3 d-flex justify-content-end">
                            <Button className='mx-1' variant="primary" href={`${process.env.REACT_APP_BASENAME}/admin/employees/new`}><i className="bi bi-person-add"></i> Add Employee</Button>
                        </Container>
                          
                        <div className='my-3'>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th></th>
                                  <th>Employee Name</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Created At</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                    accounts.map(record => {
                                        return (
                                                <>
                                                  <tr key={record.id}>
                                                    <td>{record.id}</td>
                                                    {
                                                      record.profilePhotoFile ? (
                                                        <td>
                                                            <div className="text-center">
                                                                <img className="rounded-circle" src={`${process.env.REACT_APP_BACKEND_HOST}/api/account/${record.id}/profile-photo`} width={35} />
                                                            </div>
                                                        </td>
                                                      ) : (
                                                        <td>
                                                            <div className="text-center">
                                                                <img src={UserImage} width={35} />
                                                            </div>    
                                                        </td>                    
                                                      )
                                                    }
                                                    <td>{record.firstName} {record.lastName}</td>
                                                    <td>{record.email}</td>
                                                    <td>{record.role}</td>
                                                    <td>{moment(record.createdAt).locale('es-us').format('L hh:mm:ss a')}</td>
                                                    <td>
                                                      {
                                                        record.id === user?.id ? (
                                                            <>
                                                                <Button className='mx-1' variant="info" disabled><i className="bi bi-pencil-square"></i></Button>
                                                                <Button className='mx-1' variant="danger" disabled><i className="bi bi-trash3"></i></Button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Button className='mx-1' variant="info" href={`${process.env.REACT_APP_BASENAME}/admin/employees/${record.id}`}><i className="bi bi-pencil-square"></i></Button>
                                                                <Button className='mx-1' variant="danger" data-bs-toggle="modal" data-bs-target={`#deleteAccount-${record.id}`}><i className="bi bi-trash3"></i></Button>
                                                            </>
                                                        )
                                                      }
                                                      {/* Confirm Deletion Modal */}
                                                      <div className="modal fade" id={`deleteAccount-${record.id}`} tabIndex={-1} aria-labelledby={`deleteAccount-${record.id}`} aria-hidden="true">
                                                        <div className="modal-dialog">
                                                          <div className="modal-content">
                                                            <div className="modal-header">
                                                              <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion | {record.firstName} {record.lastName} - ID: #{record.id}</h1>
                                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                              Are you sure you want to delete {record.firstName} {record.lastName}'s ({record.email}) account? THIS ACTION CANNOT BE UNDONE!
                                                            </div>
                                                            <div className="modal-footer">
                                                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteAccount(record.id)}>DELETE POST</button>
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
                            
                            <div className="d-flex justify-content-center">
                              <ReactPaginate
                                breakLabel="..."
                                nextLabel="›"
                                pageRangeDisplayed={5}
                                previousLabel="‹"
                                onPageChange={handlePageClick}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                pageCount={totalPages} 
                                marginPagesDisplayed={0}
                              />
                            </div>
                            
                        </div>
                            
                            
                    </Container>
                  </>
                ) : (
                  <>
                    <Container className="text-center min-vh-100">
                      <Spinner animation="grow" variant="success"/>
                    </Container>
                  </>
                )
              }
            <Footer2 />
        </div>
    )

}

export default EmployeeList;