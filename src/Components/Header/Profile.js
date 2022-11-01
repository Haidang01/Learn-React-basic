import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Infor from './Infor';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateProFile } from "../../services/apiService";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const ProFile = (props) => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account);
    // console.log(account);
    const [email, setEmail] = useState(account.email);
    const [userName, setUserName] = useState(account.username);
    const [role, setRole] = useState(account.role);
    const [previewImage, setPreviewImage] = useState(`data:image/jpeg;base64,${account.image}`);
    const [image, setImage] = useState(account.image);
    const { showProFile, setShowProFile } = props;
    const handleClose = () => setShowProFile(false);

    const handleUpLoadImage = (event) => {
        setImage((event.target.files[0]));
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleSubmitCreateUser = async () => {
        if (!userName) {
            toast.error("Invalide userName")
            // toast.success('wwin')
            return
        }
        let res = await UpdateProFile(userName, previewImage);
        if (res && res.EC === 0) {

            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }


    }
    return (
        <>
            <Modal className="model-add-user" backdrop="static" show={showProFile} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>ProFile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title="Main Infor">
                            <Infor
                                userName={userName}
                                email={email}
                                role={role}
                                previewImage={previewImage}
                                image={image}
                                handleUpLoadImage={handleUpLoadImage}
                                setUserName={setUserName}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Password">
                            dsgsdfgsfdgf
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ProFile;