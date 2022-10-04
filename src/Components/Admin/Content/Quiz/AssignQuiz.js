import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { wait } from '@testing-library/user-event/dist/utils';
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let dataQuiz = await getAllQuizAdmin();
        // console.log(res);
        if (dataQuiz && dataQuiz.EC === 0) {
            let newQuiz = dataQuiz.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res && res.EC === 0) {
            let user = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            })
            setListUser(user);
        }
    }
    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            selectedQuiz('');
            selectedUser('');
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className='assign-quiz-container row '>
            <div className='form-group col-6'>
                <label className='mb-2'>Select Quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='form-group  col-6'>
                <label className='mb-2'>Select User</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    onClick={() => handleAssign()}
                    className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz;