import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar3 from '../../../components/layout/Navbar3';
import Footer2 from '../../../components/layout/Footer2';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const PhoneNumberDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface PhoneNumberContent {
      id: number,
      phoneNumber: string,
      facilityId: number,
      facilityName: string,
    }

    interface FacilityListContent {
      id: number,
      facilityName: string,
    }

    const { id } = useParams();

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Directory Person Data
    const [phoneNumberData, setPhoneNumberData] = useState<PhoneNumberContent>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [facilityId, setFacilityId] = useState(0);

    
    // Facility Dropdown
    const [facilityList, setFacilityList] = useState<FacilityListContent[]>([]);

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

    const getPhoneNumber = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone/${id}`,
        ).then(function (response) {
          if (response.status === 200) {
            setPhoneNumberData(response.data)
            setPhoneNumber(response.data.phoneNumber)
            setFacilityId(response.data.facilityId)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current phone number.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const getFacilityList = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility`,
      ).then(function (response) {
        if (response.status === 200) {
          setFacilityList(response.data.$values)
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while gathering the list of available facilities.", variant: "danger" });
        } 
      }
      ) 
  }

    const newPhoneNumber = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone`, 
          {
              PhoneNumber: phoneNumber,
              FacilityId: facilityId
          },
          {
            headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
          }
      ).then(function (response) {
          if (response.status === 200) {
            setAlertMessage({message: "Phone Number added successfully!", variant: "success" });
            setTimeout(() => {
              navigate("/admin/facility/phones");
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

    const modifyPhoneNumber = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/phone`, 
            {
                Id: id,
                PhoneNumber: phoneNumber,
                FacilityId: facilityId
            },
            {
              headers: {
                Authorization: `Bearer ${cookieContent}`,
              },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Phone Number modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/facility/phones");
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
    
    const handlePhoneNumberChange = (value: string | undefined) => {
      setPhoneNumber(value);
    };

    useEffect(() => {
        document.title = "Department | Service Center";
        checkIfSignedIn();
        getPhoneNumber();
        getFacilityList();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5 min-vh-100">
                    <Container>
                      <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones`}><i className="bi bi-arrow-90deg-up"></i> Go back to My Phone Numbers</a>
                      {
                        phoneNumberData ? (
                          <h3>Modify Phone Number: {phoneNumberData.phoneNumber} (#{phoneNumberData.id})</h3>
                        ) : (
                          <h3>New Phone Number</h3>
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
                          newPhoneNumber
                        ) : (
                          modifyPhoneNumber
                        )
                      }>
                        <Row>
                          <Col>
                            <Form.Label htmlFor="addressNote">Phone Number</Form.Label>
                            <PhoneInput
                              placeholder="Enter phone number"
                              defaultCountry="PR"
                              className='form-control'
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
                            />
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
                    
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/facility/phones`}>Cancel</Button>
                        </div>
                      </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

  }

export default PhoneNumberDetail;