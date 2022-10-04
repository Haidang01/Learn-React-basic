import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
const ModelDeleteQuiz = (props) => {

    const { showDelete, setShowDelete, dataDeleteQuiz } = props;
    const handleClose = () => setShowDelete(false);
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDeleteQuiz.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
            // await props.fetchListUser(); lay all nguoi dung
            // props.setCurrentPage(1) // cap nhap data trang 1
            // await props.fetchListUserWithPaginate(1)// lay data trang 1
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>
            <Modal show={showDelete} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this Quiz.id <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDeleteQuiz;