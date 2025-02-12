import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar3 from '../../../components/layout/Navbar3';
import Footer2 from '../../../components/layout/Footer2';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const FacilityDetail = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string,
    }

    interface FacilityContent {
        id: number,
        facilityName: string,
        addressLineOne: string,
        addressLineTwo: string,
        city: string,
        state: number,
        code: string,
        name: string,
        zipCode: string,
    }

    interface StateList {
      id: number,
      code: string,
      name: string,
  }

    const { id } = useParams();

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    // Logged User Data
    const [user, setUser] = useState<UserProperties>();

    // Directory Person Data
    const [facility, setFacility] = useState<FacilityContent>();
    const [facilityName, setFacilityName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState(0);
    const [zipCode, setZipCode] = useState("");

    // Dropdown Lists
    const [stateList, setStateList] = useState<StateList[]>([]);

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

    const getFacility = async () => {

      if (id !== "new") {
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/${id}`,
        ).then(function (response) {
          if (response.status === 200) {
            setFacility(response.data)
            setFacilityName(response.data.facilityName)
            setAddressLineOne(response.data.addressLineOne)
            setAddressLineTwo(response.data.addressLineTwo)
            setCity(response.data.city)
            setState(response.data.state)
            setZipCode(response.data.zipCode)
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            setAlertMessage({message: "ERROR: An error has occured while gathering current facility.", variant: "danger" });
          } 
        }
    ) 
      }
    }

    const getStateList = async () => {

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/us-states`,
      ).then(function (response) {
        if (response.status === 200) {
          setStateList(response.data.$values)
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          setAlertMessage({message: "ERROR: An error has occured while gathering list of available states.", variant: "danger" });
        } 
      }
      ) 
  }

    const newFacility = async (event: any) => {

      event.preventDefault();
  
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/`, 
          {
              FacilityName: facilityName,
              AddressLineOne: addressLineOne,
              AddressLineTwo: addressLineTwo,
              City: city,
              State: state,
              ZipCode: zipCode,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
          }
      ).then(function (response) {
          if (response.status === 200) {
            setAlertMessage({message: "Facility created successfully!", variant: "success" });
            setTimeout(() => {
              navigate("/admin/facility");
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

    const modifyFacility = async (event: any) => {

        event.preventDefault();
    
          await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/facility/`, 
            {
                Id: id,
                FacilityName: facilityName,
                AddressLineOne: addressLineOne,
                AddressLineTwo: addressLineTwo,
                City: city,
                State: state,
                ZipCode: zipCode,
            },
            {
              headers: {
                Authorization: `Bearer ${cookieContent}`,
              },
            }
        ).then(function (response) {
            if (response.status === 200) {
                setAlertMessage({message: "Facility modified successfully!", variant: "success" });
                setTimeout(() => {
                    navigate("/admin/facility");
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
        getFacility();
        getStateList();
        // eslint-disable-next-line
      }, []);

    return(
        <div>
            <Navbar3 />
                <Container className="mt-5 min-vh-100">
                    <Container>
                      <a className="link" href={`${process.env.REACT_APP_BASENAME}/admin/directory`}><i className="bi bi-arrow-90deg-up"></i> Go back to Directory List</a>
                      {
                        facility ? (
                          <h3>Edit Facility: {facility.facilityName} (#{facility.id})</h3>
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
                          newFacility
                        ) : (
                          modifyFacility
                        )
                      }>
                        <Row>
                          <Col>
                            <Form.Label htmlFor="facilityName">Facility Name</Form.Label>
                            <Form.Control className="mb-3" placeholder="" id="facilityName" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Form.Label htmlFor="addressLineOne">Address Line 1</Form.Label>
                            <Form.Control className="mb-3" id="addressLineOne" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                          </Col>
                          <Col>
                            <Form.Label htmlFor="addressLineTwo">Address Line 2</Form.Label>
                            <Form.Control className="mb-3" id="addressLineTwo" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                          </Col>
                          <Col>
                            <Form.Label htmlFor="city">City</Form.Label>
                            <Form.Control className="mb-3" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                          </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col>
                                <Form.Label htmlFor="state">State</Form.Label>
                                <Form.Select value={state} onChange={(e: any) => setState(e.target.value)}>
                                  <option>Please Select...</option>
                                  {
                                    stateList.map(record  => {
                                        return (
                                            <option value={record.id}>{record.code} | {record.name}</option>
                                        )
                                    })
                                  }
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="zipCode">Zip Code</Form.Label>
                                <Form.Control className="mb-3" type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                            </Col>
                        </Row>
                    
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mx-2' variant="primary" type='submit'>Save Changes</Button>
                            <Button variant="secondary" href={`${process.env.REACT_APP_BASENAME}/admin/facility`}>Cancel</Button>
                        </div>
                      </Form>
                    </div>


                </Container>
            <Footer2 />
        </div>
    )

  }

export default FacilityDetail;