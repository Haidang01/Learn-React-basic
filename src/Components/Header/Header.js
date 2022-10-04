
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // chuyen trang
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  // console.log(isAuthenticated);
  const account = useSelector(state => state.user.account)
  // console.log(account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }
  const handleSignup = () => {
    navigate('/signup')
  }
  const handleLogOut = async () => {
    let res = await logout("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      // CLEAR data redux
      dispatch(doLogOut())
      navigate('/login')
    } else {
      toast.error(res.EM)
    }
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className='navbar-brand'>
          {t('header.title1')}
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>
              {t('header.title2')}
            </NavLink>
            <NavLink to="/users" className='nav-link'>{t('header.title3')}</NavLink>
            <NavLink to="/admins" className='nav-link'>{t('header.title4')}</NavLink>
          </Nav>

          <Nav>
            {
              isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>{t('header.title5')}</button>
                  <button className='btn-signup' onClick={() => handleSignup()}>{t('header.title6')}</button>
                </>
                :
                <NavDropdown title={t('header.title9')} id="basic-nav-dropdown">
                  <NavDropdown.Item >{t('header.title7')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.title8')}</NavDropdown.Item>

                </NavDropdown>
            }
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;