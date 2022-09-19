
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from 'react-router-dom';
import ModelCreateUser from './ModelCreateUser';
import "./ManageUser.scss";


const ManageUser = (props) => {
    return (
        <div class="manage-user-container">
            <div class="title">
                Manage User
            </div>
            <div class="user-content">
                <div>
                    <button>Add news user</button>
                </div>
                <div>
                    Table User
                </div>

                <ModelCreateUser />

            </div>
        </div>
    )
}
export default ManageUser;