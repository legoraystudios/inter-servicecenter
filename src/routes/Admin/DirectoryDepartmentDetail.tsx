import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../components/images/image.jpg';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const DirectoryDepartmentDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface DepartmentContent {
        id: number,
        departmentName: string,
        departmentDescription: string,
        AddressNote: string,
        FacilityPhoneNumberId: number,
        PhoneExtension: string,
        FacilityId: number
    }

    interface FacilityList {
        id: number,
        facilityName: string,
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

    // Post Data
    const [department, setDepartment] = useState<DepartmentContent>();
    const [departmentName, setDepartmentName] = useState("");
    const [departmentDesc, setDepartmentDesc] = useState("");
    const [addressNote, setAddressNote] = useState("");
    const [facilityPhoneNumberId, setFacilityPhoneNumberId] = useState(0);
    const [phoneExtension, setPhoneExtension] = useState("");
    const [facilityId, setFacilityId] = useState("");

    // Dropdown Lists
    const [facilityList, setFacilityList] = useState<FacilityList[]>([]);
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
      }).catch(function (error) {
        if (error.response.status !== 200) {
          navigate("/admin");
        } 
      }
  
    )}

    const getDepartment = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department/${id}`,
        ).then(function (response) {
          if (response.status === 200) {
            setDepartment(response.data)
            setDepartmentName(response.data.departmentName)
            setDepartmentDesc(response.data.departmentDescription)
            setAddressNote(response.data.addressNote)
            setFacilityPhoneNumberId(response.data.facilityPhoneNumberId)
            setPhoneExtension(response.data.phoneExtension)
            setFacilityId(response.data.facilityId)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering department.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const getFacilities = async () => {

          await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility`,
          ).then(function (response) {
            if (response.status === 200) {
              setFacilityList(response.data.$values)
            }
          }).catch(function (error) {
            if (error.response.status !== 200) {
              setAlertMessage({message: "ERROR: An error has occured while gathering list of available facilities.", variant: "danger" });
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

    const newDepartment = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department/`, 
          {
              DepartmentName: departmentName,
              DepartmentDescription: departmentDesc,
              AddressNote: addressNote,
              FacilityPhoneNumberId: facilityPhoneNumberId,
              PhoneExtension: phoneExtension,
              FacilityId: facilityId
          },
          {
            headers: {
                Authorization: `Bearer ${cookieContent}`,
              },
          }
      ).then(function (response) {
          if (response.status === 200) {
              setAlertMessage({message: "Department created successfully!", variant: "success" });
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

    const modifyDepartment = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/directory/department/`, 
            {
                Id: id,
                DepartmentName: departmentName,
                DepartmentDescription: departmentDesc,
                AddressNote: addressNote,
                FacilityPhoneNumberId: facilityPhoneNumberId,
                PhoneExtension: phoneExtension,
                FacilityId: facilityId
            },
            {
              headers: {
                  Authorization: `Bearer ${cookieContent}`,
                },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Department modified successfully!", variant: "success" });
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
        getDepartment();
        getFacilities();
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
                        department ? (
                          <h3>{department.departmentName} - Department (#{department.id})</h3>
                        ) : (
                          <h3>New Department</h3>
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
                          newDepartment
                        ) : (
                          modifyDepartment
                        )
                      }>
                        <Form.Label htmlFor="departmentName">Department Name</Form.Label>
                        <Form.Control className="mb-3" placeholder="" id="departmentName" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                        <Form.Label htmlFor="departmentDescription">Department Description</Form.Label>
                        <Form.Control
                        	as="textarea"
                        	placeholder=""
                            id="departmentDescription"
                            value={departmentDesc} 
                            onChange={(e) => setDepartmentDesc(e.target.value)}
                        	style={{ height: '100px' }}
                            className="mb-3"
                        />
                        <Row>
                            <Col>
                                <Form.Label htmlFor="addressNote">Address Note</Form.Label>
                                <Form.Control className="mb-3" placeholder="" id="addressNote" value={addressNote} onChange={(e) => setAddressNote(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="facilityId">Facility</Form.Label>
                                <Form.Select value={facilityId} onChange={(e: any) => setFacilityId(e.target.value)}>
                                  <option>Please Select...</option>
                                  {
                                    facilityList.map(record  => {
                                        return (
                                            <option value={record.id}>{record.facilityName}</option>
                                        )
                                    })
                                  }
                                </Form.Select>
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

export default DirectoryDepartmentDetail;