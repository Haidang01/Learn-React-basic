import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModelResult = (props) => {
    const { show, setShow, dataModelResult } = props;

    const handleClose = () => setShow(false);



    return (
        <>
            <Modal show={show} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question :<b> {dataModelResult.countTotal}</b></div>
                    <div>Total Correct answers :<b> {dataModelResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelResult;