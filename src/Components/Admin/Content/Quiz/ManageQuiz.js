import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModelDeleteQuiz from './ModelDeleteQuiz';
import { getAllQuizAdmin } from "../../../../services/apiService";
import { useEffect } from 'react';
import ModelEditQuiz from './ModelEditQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const handleChangeFile = (event) => {
        setImage((event.target.files[0]));
    }
    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error("Name/Description is required");
            return
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);

        if (res && res.EC === 0) {
            await fetchQuiz()
            toast.success(res.EM)
            setName('');
            setImage('');
            setDescription('');
        } else {
            toast.error(res.EM)
        }
    }
    // get data quiz
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let dataQuiz = await getAllQuizAdmin();
        // console.log(res);
        if (dataQuiz && dataQuiz.EC === 0) {
            setListQuiz(dataQuiz.DT);
        }
    }
    const handleEditQuiz = (quiz) => {
        setShowEdit(true);
        setDataUpdateQuiz(quiz);

    }
    const handleDeleteQuiz = (quiz) => {
        setShowDelete(true);
        setDataDeleteQuiz(quiz);

    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="0" className='border-2  ' >
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 w-auto px-3">
                                <legend className="float-none w-auto px-3">Add new quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={name} className="form-control"
                                        placeholder="Your quiz name"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        value={description}
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className='more-action form-group mb-3'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type={"file"}
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3 mb-3'>
                                    <button className='btn btn-warning' onClick={() => handleSubmitQuiz()}>Save</button>
                                </div>
                            </fieldset>
                        </div >
                        <div className="list-detail">
                            <TableQuiz
                                handleDeleteQuiz={handleDeleteQuiz}
                                handleEditQuiz={handleEditQuiz}
                                listQuiz={listQuiz}
                                setListQuiz={setListQuiz}
                                fetchQuiz={fetchQuiz}
                            />
                        </div>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="1" >
                <Accordion.Item eventKey="1" className='border-2  mt-2 ' >
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="2" >
                <Accordion.Item eventKey="1" className='border-2  mt-2 ' >
                    <Accordion.Header>Assign to users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModelDeleteQuiz
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchQuiz={fetchQuiz}
            />
            <ModelEditQuiz
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchQuiz={fetchQuiz}

            />
        </div >
    )
}
export default ManageQuiz;