import { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Signout = () => {

    // Cookies Properties
    const cookieName: string = `${process.env.REACT_APP_SESSION_COOKIE_NAME}`;
    const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
    const cookieContent = cookies[cookieName];

    const navigate = useNavigate()

    const signOut = async () => {
        removeCookie(cookieName);
        navigate("/admin");
    }

    useEffect(() => {
        signOut();
        // eslint-disable-next-line
      }, []);

    return(
        <div className="list-inline">
            <p className="list-inline-item">Hang on while we signed you out...</p>
            <div className="spinner-grow list-inline-item" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

}

export default Signout;