import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { PutUpdateUser } from '../../../services/apiService';
import _ from 'lodash';
const ModelUpdateUser = (props) => {
    const { show, setShow, dataUpdate, } = props;
    const handleClose = () => {
        setShow(false);
        props.resetUpdateDate()
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")
    // console.log(image);
    useEffect(() => {
        // console.log('userEfff', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            // update state
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])
    const handleUpLoadImage = (event) => {
        setImage((event.target.files[0]));
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitUpdateUser = async () => {
        // validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalide email")
            // toast.success('wwin')
            return
        }
        let data = await PutUpdateUser(dataUpdate.id, username, role, image);
        // console.log(">>>check res :", res.data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            // props.setCurrentPage(1) // cap nhap data trang 1
            await props.fetchListUserWithPaginate(props.currentPage)// lay data trang 1
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    // console.log('check data ', dataUpdate.id);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <Modal className="model-add-user" backdrop="static" show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" disabled value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" disabled value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload' >
                                <FcPlus />
                                Uploand File Image
                                <input type="file" hidden id='labelUpload' onChange={(event) => handleUpLoadImage(event)} />
                            </label>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelUpdateUser;