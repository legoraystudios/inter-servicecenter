import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const DirectoryPersonDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface PersonContent {
        id: number,
        firstName: string,
        lastName: string,
        jobPosition: string,
        FacilityPhoneNumberId: number,
        phoneExtension: string,
        corporateCellphone: string,
        email: string,
        directoryDepartmentId: number
    }

    interface DepartmentList {
        id: number,
        departmentName: string,
        phoneExtension: string
    }

    interface PhoneNumberList {
        id: number,
        phoneNumber: string,
        facilityName: string
    }

    const { id } = useParams();

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Directory Person Data
    const [person, setPerson] = useState<PersonContent>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [facilityPhoneNumberId, setFacilityPhoneNumberId] = useState(0);
    const [phoneExtension, setPhoneExtension] = useState("");
    const [corporateCellphone, setCorporateCellphone] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState("");
    const [directoryDepartmentId, setDirectoryDepartmentId] = useState(0);


    // Dropdown Lists
    const [departmentList, setDepartmentList] = useState<DepartmentList[]>([]);
    const [phoneNumberList, setPhoneNumberList] = useState<PhoneNumberList[]>([]);

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
        if (response.data.role !== "Admin" && response.data.role !== "Super Administrator") {
          navigate("/admin");
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
    )}

    const getPerson = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/people/${id}`,
        ).then(function (response) {
          if (response.status === 200) {
            setPerson(response.data)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setJobPosition(response.data.jobPosition)
            setFacilityPhoneNumberId(response.data.facilityPhoneNumberId)
            setPhoneExtension(response.data.phoneExtension)
            setCorporateCellphone(response.data.corporateCellphone)
            setEmail(response.data.email)
            setDirectoryDepartmentId(response.data.directoryDepartmentId)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering contact.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const getDepartments = async () => {

          await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department`,
          ).then(function (response) {
            if (response.status === 200) {
              setDepartmentList(response.data.$values)
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {
              setAlertMessage({message: "ERROR: An error has occured while gathering list of available departments.", variant: "danger" });
            } 
          }
      ) 
    }

    const getPhoneNumbers = async () => {

        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone`,
        ).then(function (response) {
          if (response.status === 200) {
            setPhoneNumberList(response.data.$values)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering list of available facilities.", variant: "danger" });
          } 
        }
        ) 
    }

    const handleCorporateCellphoneChange = (value: string | undefined) => {
      setCorporateCellphone(value);
    };

    const newPerson = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/people/`, 
          {
              FirstName: firstName,
              LastName: lastName,
              JobPosition: jobPosition,
              FacilityPhoneNumberId: facilityPhoneNumberId,
              PhoneExtension: phoneExtension,
              CorporateCellphone: corporateCellphone,
              Email: email,
              DirectoryDepartmentId: directoryDepartmentId
          },
          {
            headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
          }
      ).then(function (response) {
          if (response.status === 200) {
            setAlertMessage({message: "Contact created successfully!", variant: "success" });
            setTimeout(() => {
              navigate("/admin/directory");
            }, 3000);
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            if (error.response.data.msg) {
              setAlertMessage({message: error.response.data.msg, variant: "danger" });
            } else {
              setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
            }
          } 
        }
  
    )}

    const modifyPerson = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/people/`, 
            {
                Id: id,
                FirstName: firstName,
                LastName: lastName,
                JobPosition: jobPosition,
                FacilityPhoneNumberId: facilityPhoneNumberId,
                PhoneExtension: phoneExtension,
                CorporateCellphone: corporateCellphone,
                Email: email,
                DirectoryDepartmentId: directoryDepartmentId
            },
            {
              headers: {
                Authorization: `Bearer ${cookieContent}`,
              },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Contact modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/directory");
                  }, 3000);
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {
              if (error.response.data.msg) {
                setAlertMessage({message: error.response.data.msg, variant: "danger" });
              } else {
                setAlertMessage({message: "An error has occurred while performing this action.", variant: "danger" });
              }
            } 
          }
        
    )}

    useEffect(() => {
        document.title = "Department | Service Center";
        checkIfSignedIn();
        getPerson();
        getDepartments();
        getPhoneNumbers();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5 min-vh-100">
                    <Container>
                      <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/directory`}><i className="bi bi-arrow-90deg-up"></i> Go back to Directory List</a>
                      {
                        person ? (
                          <h3>Edit {person.firstName} {person.lastName} (#{person.id})</h3>
                        ) : (
                          <h3>New Contact</h3>
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
                          newPerson
                        ) : (
                          modifyPerson
                        )
                      }>
                        <Row>
                          <Col>
                            <Form.Label htmlFor="departmentName">First Name</Form.Label>
                            <Form.Control className="mb-3" placeholder="" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                          </Col>
                          <Col>
                            <Form.Label htmlFor="departmentName">Last Name</Form.Label>
                            <Form.Control className="mb-3" placeholder="" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                          </Col>
                          <Col>
                            <Form.Label htmlFor="departmentName">Job Position</Form.Label>
                            <Form.Control className="mb-3" placeholder="" id="jobPosition" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />
                          </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                                <Form.Select id="phoneNumber" value={facilityPhoneNumberId} onChange={(e: any) => setFacilityPhoneNumberId(e.target.value)}>
                                  <option>Please Select...</option>
                                  {
                                    phoneNumberList.map(record  => {
                                        return (
                                            <option value={record.id}>{record.phoneNumber}</option>
                                        )
                                    })
                                  }
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="phoneExtension">Phone Extension</Form.Label>
                                <Form.Control
                                  placeholder="Phone Extension"
                                  id="phoneExtension"
                                  type="number"
                                  aria-describedby="passwordHelpBlock"
                                  value={phoneExtension}
                                  onChange={(e: any) => setPhoneExtension(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col>
                                <Form.Label htmlFor="addressNote">Corportate Cellphone</Form.Label>
                                <PhoneInput
                                  placeholder="Enter phone number"
                                  defaultCountry="PR"
                                  className='form-control'
                                  value={corporateCellphone}
                                  onChange={handleCorporateCellphoneChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="addressNote">Email</Form.Label>
                                <Form.Control className="mb-3" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="facilityId">Department</Form.Label>
                                <Form.Select value={directoryDepartmentId} onChange={(e: any) => setDirectoryDepartmentId(e.target.value)}>
                                  <option>Please Select...</option>
                                  {
                                    departmentList.map(record  => {
                                        return (
                                            <option value={record.id}>{record.id} | {record.departmentName}</option>
                                        )
                                    })
                                  }
                                </Form.Select>
                            </Col>
                        </Row>
                    
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/directory`}>Cancel</Button>
                        </div>
                      </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

  }

export default DirectoryPersonDetail;