import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from "../../../services/apiService";
const ModelDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let data = await DeleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser(); lay all nguoi dung
            props.setCurrentPage(1) // cap nhap data trang 1
            await props.fetchListUserWithPaginate(1)// lay data trang 1
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>
            <Modal show={show} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user.Email <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDeleteUser;