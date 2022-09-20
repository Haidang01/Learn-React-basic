
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from 'react-router-dom';
import ModelCreateUser from './ModelCreateUser';
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUser from './TableUser';


const ManageUser = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className='btn-add-new'>
                    <button className='btn btn-primary'
                        onClick={(e) => setShowModelCreateUser(true)} >
                        <FcPlus /> Add news user
                    </button>
                </div>
                <div className='table-users-container'>
                    <TableUser />
                </div>

                <ModelCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                />

            </div>
        </div>
    )
}
export default ManageUser;