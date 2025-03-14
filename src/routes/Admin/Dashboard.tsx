import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar3 from '../../components/layout/Navbar3';
import Footer2 from '../../components/layout/Footer2';
import { Container, Spinner, Row, Col, Card, Badge } from 'react-bootstrap';
import { ChartsLegend, ChartsTooltip, ChartsXAxis, LinePlot, MarkPlot, ResponsiveChartContainer } from '@mui/x-charts'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Box, Tooltip } from '@mui/material';
import React from 'react';

const Dashboard = () => {

    interface UserProperties {
        id: number,
        firstName: any,
        lastName: string,
        email: string
    }

    interface PostMetrics {
      todaysYear: { [month: string]: number };
      lastYear: { [month: string]: number };
    }

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const currentHour = new Date().getHours();

    const [user, setUser] = useState<UserProperties>();
    const [isLoading, setIsLoading] = useState(false);

    // Chart Properties
    const [postMetrics, setPostMetrics] = useState<PostMetrics | null>(null);
    const [series, setSeries] = React.useState<any[]>([]);
    const [xAxis, setXAxis] = React.useState<string[]>([]);
    const [postMetricsChartLoaded, setPostMetricsChartLoaded] = useState(false);

    const navigate = useNavigate()

    const checkIfSignedIn = async () => {
    
        await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/account/me`, {
          headers: {
              Authorization: `Bearer ${cookieContent}`,
            },
        }
        ).then(function (response) {
          if (response.status === 200) {
            setUser(response.data);
            setIsLoading(true);
          }
        }).catch(function (error) {
          if (error.response.status !== 200) {
            navigate("/admin/signout");
          } 
        }
    
    )}

    const getPostMetrics = async () => {
    
      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/metrics/post/monthly`, {
        headers: {
            Authorization: `Bearer ${cookieContent}`,
          },
      }
      ).then(function (response) {
        if (response.status === 200) {
          setPostMetrics(response.data)
        }
      }).catch(function (error) {
        if (error.response.status !== 200) {
          
        } 
      }
  
    )}
    

    useEffect(() => {
        document.title = "Dashboard | Service Center";
        checkIfSignedIn();

        if (postMetrics) {
          const todayData = Object.entries(postMetrics.todaysYear).filter(([key]) => key !== '$id').map(([month, count]) => ({ month, count })).reverse();
          const lastYearData = Object.entries(postMetrics.lastYear).filter(([key]) => key !== '$id').map(([month, count]) => ({ month, count })).reverse();
          const allMonths = Object.entries(postMetrics.todaysYear)
          .filter(([key]) => key !== '$id')
          .map(([key]) => key).reverse();

          setSeries([
            { type: 'line', data: todayData.map(d => d.count), label: 'Posts TY', color: '#005c2f' },
            { type: 'line', data: lastYearData.map(d => d.count), label: 'Posts LY', color: '#ffd23f' },
          ]);
          setXAxis(allMonths);

          setPostMetricsChartLoaded(true);
        } else {
          getPostMetrics();
        }
        // eslint-disable-next-line
      }, [postMetrics]);

    return(
        <div>
            <Navbar3 />
              {
                isLoading ? (
                  <>
                    <Container className="my-5 d-flex flex-column min-vh-100">
                      {
                        user && (
                            <>
                            {
                              currentHour >= 0 && currentHour < 12 ? (
                              <h3>Good Morning, {user.firstName}</h3>
                              ) : currentHour >= 12 && currentHour < 18 ? (
                              <h3>Good Afternoon, {user.firstName}</h3>
                              ) : (
                              <h3>Good Evening, {user.firstName}</h3>
                              )
                            }
                            </>
                        )
                      }
                      <p>Welcome to your personal area!</p>
                        <Container>
                          <Row>
                            <Col sm>
                              <div className="d-flex flex-row">
                                <h5 className="me-1">Total Posts</h5>
                                <span> - (Last 12 months)</span>
                              </div>
                              {
                                postMetricsChartLoaded ? (
                                  <>
                                    <Box sx={{ width: '100%' }}>
                                      <ResponsiveChartContainer
                                        xAxis={[{ scaleType: 'point', data: xAxis, id: 'x-axis-id' }]}
                                        series={series}
                                        height={540}
                                       >
                                        <LinePlot />
                                        <MarkPlot />
                                        <ChartsLegend />
                                        <ChartsTooltip />
                                        <ChartsXAxis position="bottom" axisId="x-axis-id" />
                                      </ResponsiveChartContainer>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                  </>
                                )
                              }
                            </Col>
                            <Col sm>
                              <div className="d-flex flex-row">
                                <div className="me-1">
                                  <Badge bg="warning" text="dark">Coming Soon!</Badge>
                                </div>
                                <h5 className="me-1">
                                  Total Impresions
                                </h5>
                                <span> - (Last 12 months)</span>
                              </div>
                              {
                              postMetricsChartLoaded ? (
                                <>
                                  <Box sx={{ width: '100%' }}>
                                    <ResponsiveChartContainer
                                        xAxis={[{ scaleType: 'point', data: xAxis, id: 'x-axis-id' }]}
                                        series={[
                                        { type: 'line', data: [], label: 'Views TY', color: '#005c2f' },
                                        { type: 'line', data: [], label: 'Views LY', color: '#ffd23f' }
                                      ]}
                                      height={340}
                                     >
                                      <LinePlot />
                                      <MarkPlot />
                                      <ChartsLegend />
                                      <ChartsTooltip />
                                      <ChartsXAxis position="bottom" axisId="x-axis-id" />
                                    </ResponsiveChartContainer>
                                  </Box>
                                </>
                              ) : (
                                <>
                                </>
                              )
                            }
                                
                                
                            <h5 className="me-1">Quick Actions</h5>
                            <Container className="d-flex flex-wrap justify-content-center mt-3">
                              <a href={`${process.env.REACT_APP_BASENAME}/admin/posts`} className="text-decoration-none m-1">
                                <Card style={{ width: '12rem' }} className="text-success">
                                  <Card.Body>
                                    <Card.Title><i className="bi bi-file-earmark-plus-fill fs-1"></i></Card.Title>
                                    <Card.Subtitle className="mb-2">Create New Post</Card.Subtitle>
                                  </Card.Body>
                                </Card>
                              </a>
                              <a href={`${process.env.REACT_APP_BASENAME}/admin/statusbar`} className="text-decoration-none m-1">
                                <Card style={{ width: '12rem' }} className="text-secondary">
                                  <Card.Body>
                                    <Card.Title><i className="bi bi-segmented-nav fs-1"></i></Card.Title>
                                    <Card.Subtitle className="mb-2">Manage Status Bar</Card.Subtitle>
                                  </Card.Body>
                                </Card>
                              </a>
                              <a href={`${process.env.REACT_APP_BASENAME}/admin/directory`} className="text-decoration-none m-1">
                                <Card style={{ width: '12rem' }} className="text-warning">
                                  <Card.Body>
                                    <Card.Title><i className="bi bi-journal-richtext fs-1"></i></Card.Title>
                                    <Card.Subtitle className="mb-2">Manage Directory</Card.Subtitle>
                                  </Card.Body>
                                </Card>
                              </a>
                            </Container>
                                
                            </Col>
                          </Row>
                        </Container>
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

export default Dashboard;