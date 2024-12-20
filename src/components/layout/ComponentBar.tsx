import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';


const ComponentBar = () => {

    interface StatusBarMessage {
        id: number,
        message: string,
        icon: number,
        iconName: string,
    }

    interface StatusBarProperties {
        id: number,
        messageInterval: number,
        statusBarColor: number,
        statusBarColorName: string
    }

    const [messages, setMessages] = useState<StatusBarMessage[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [properties, setProperties] = useState<StatusBarProperties[]>([]);
    const [messageInterval, setMessageInterval] = useState(0);


    useEffect(() => {

        const getMessages = async () => {
    
          await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/public/messages`,
          ).then(function (response) {
            if (response.status === 200) {
                setMessages(response.data.$values);
            }
          }).catch(function (error) {
      
          }
      
        )}

        const getProperties = async () => {
    
            await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/statusbar/property`,
            ).then(function (response) {
              if (response.status === 200) {
                  setProperties(response.data.$values);
                  setMessageInterval(response.data.$values[0].messageInterval * 1000)
              }
            }).catch(function (error) {
        
            }
        
        )}
    
        getMessages();
        getProperties();
        // eslint-disable-next-line
      }, []);

      useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (messages.length > 0 && properties.length > 0) {
            intervalId = setInterval(() => {
                setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            }, messageInterval)
        }

        return () => clearInterval(intervalId);
      }, [messages])

      const currentMessage = messages[currentMessageIndex];

    return(
        <div>
            <Container className={
                                properties[0]?.statusBarColorName === "Primary" ? (
                                    'component-green-bar text-white'
                                ) : properties[0]?.statusBarColorName === "Warning" ? (
                                    'bg-warning text-secondary-emphasis'
                                ) : properties[0]?.statusBarColorName === "Danger" ? (
                                    'bg-danger text-white'
                                ) : properties[0]?.statusBarColorName === "Info" ? (
                                    'bg-primary text-white'
                                ) : (
                                    'component-green-bar text-white'
                                )
            } fluid>
                <p className="text-center">
                    {
                        currentMessage?.iconName === "None" ? (
                            <></>
                        ) : currentMessage?.iconName === "Info" ? (
                            <i className="bi bi-info-circle"></i>
                        ) : currentMessage?.iconName === "Warning" ? (
                            <i className="bi bi-exclamation-triangle me-1"></i>
                        ) : currentMessage?.iconName === "Success" ? (
                            <i className="bi bi-check-circle"></i>
                        ) : currentMessage?.iconName === "Question" ? (
                            <i className="bi bi-question-circle"></i>
                        ) : (
                            <></>
                        )
                    }
                    <b></b> {currentMessage?.message}
                </p>
            </Container>
        </div>
    )

}

export default ComponentBar;