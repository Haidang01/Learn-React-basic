import videoHomePage from "../../assets/video-HomePage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="homePage-container">
            <video autoPlay muted loop  >
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
            <div className="homepage-container">
                <div className="title-1">
                    {t('hompage.title1')}
                </div>
                <div className="title-2">
                    {t('hompage.title2')}
                </div>
                <div className="title-3">
                    {isAuthenticated === false
                        ?
                        <button onClick={() => { navigate('/login') }}>{t('hompage.title3.login')}</button>
                        :
                        <button onClick={() => { navigate('/users') }}>Doing quiz now</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;