import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { EditQuiz } from '../../../../services/apiService';

import _ from 'lodash';
const ModelEditQuiz = (props) => {
    const { showEdit, setShowEdit, dataUpdateQuiz, } = props;
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [quizImage, setQuizImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [image, setImage] = useState(null);
    const handleClose = () => {
        setShowEdit(false);
        //     props.resetUpdateDate()
    }

    useEffect(() => {
        console.log('userEfff', dataUpdateQuiz);
        if (!_.isEmpty(dataUpdateQuiz)) {
            // update state
            setDescription(dataUpdateQuiz.description)
            setName(dataUpdateQuiz.name)
            setDifficulty(dataUpdateQuiz.quizImage)
            setPreviewImage("")
            if (dataUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
            }
        }
    }, [dataUpdateQuiz])
    const handleUpLoadImage = (event) => {
        setImage((event.target.files[0]));
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleSubmitUpdateQuiz = async () => {
        // validate
        let data = await EditQuiz(dataUpdateQuiz.id, description, name, difficulty, previewImage);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            // props.setCurrentPage(1) // cap nhap data trang 1
            await props.fetchQuiz()// lay data trang 1


        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    //     // console.log('check data ', dataUpdate.id);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <Modal className="model-add-user" backdrop="static" show={showEdit} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
                                <img src={previewImage} width="100px" height="100px" />
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelEditQuiz;