
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from 'react-router-dom';
import ModelCreateUser from './ModelCreateUser';
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUser from './TableUser';
import { useEffect } from 'react';
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModelUpdateUser from './ModelUpdateUser';
import ModelViewUser from './ModelViewUser';
import ModelDeleteUser from './ModelDeleteUser';
import TableUserPaginate from './TableUserPaginate';
const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [currentPage, setCurrentPage] = useState(1);//dang o trang nao
    const [pageCount, setPageCount] = useState(0);
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false)
    const [showModelViewUser, setShowModelViewUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDateUpdate] = useState({});
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);
    //lay du lieu
    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            // console.log('RED.DT=', res.DT);
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
            // console.log(res.DT.totalPages);
        }
    }
    // button update user
    const handleClickUpdateUser = (user) => {
        setShowModelUpdateUser(true);
        setDateUpdate(user);
    }
    const resetUpdateDate = () => {
        setDateUpdate({});
    }
    // button view user 
    const handleClickViewUser = (user) => {
        setShowModelViewUser(true)
        setDataView(user)
    }
    //button delete user
    const handleClickDeleteUser = (user) => {
        setDataDelete(user);
        setShowModelDeleteUser(true)
    }
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
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    /> */}
                    <TableUserPaginate
                        pageCount={pageCount}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        listUsers={listUsers}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModelCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}


                />
                <ModelUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateDate={resetUpdateDate}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                />
                <ModelViewUser
                    setShow={setShowModelViewUser}
                    show={showModelViewUser}
                    dataView={dataView}
                />
                <ModelDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModelDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                />
            </div>
        </div>
    )
}
export default ManageUser;