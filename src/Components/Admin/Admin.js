import SideBar from "./SideBar";
import './Admin.scss';
import { FaHeart, FaBars } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import SimpleBar from 'simplebar-react';
import Language from "../Header/Language";
import { useTranslation, Trans } from 'react-i18next';
import { NavDropdown } from "react-bootstrap";
const Admin = (props) => {
    const { t } = useTranslation();

    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="admin-container" >
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setcollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title={t('header.title9')} id="basic-nav-dropdown">
                            <NavDropdown.Item >{t('header.title7')}</NavDropdown.Item>
                            <NavDropdown.Item >{t('header.title8')}</NavDropdown.Item>

                        </NavDropdown>

                    </div>
                </div>
                <div>

                    <SimpleBar style={{ maxHeight: 400 }}>
                        <div className="admin-main">
                            <Outlet />
                        </div>
                    </SimpleBar>

                </div>
            </div>

        </div>
    )
}
export default Admin;