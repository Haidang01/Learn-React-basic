import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser } from '../../../services/apiService';
import _ from "lodash";

const ModelViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            // update state
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            setImage("")
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }
        }

    })
    // console.log("check data", dataView);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal className="model-add-user" backdrop="static" show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title >View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" disabled value={email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" disabled value={username} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <input type="text" className="form-control" disabled value={role} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} width="100" height="100" />
                                :
                                <span>preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelViewUser;