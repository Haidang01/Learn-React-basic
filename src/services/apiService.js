import { FcAnswers } from 'react-icons/fc';
import axios from '../utils/axiosCustomize';// lay bien instance tu utils

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)

}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const PutUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)

}
const DeleteUser = (UserId) => {
    return axios.delete('api/v1/participant', { data: { id: UserId } })
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 })

}
const Resgister = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);

}
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });

}
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)

}
const getAllQuizAdmin = () => {
    return axios.get(`api/v1/quiz/all`);

}
// Quizzes
const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}
const EditQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage)
    return axios.put('api/v1/quiz', data)
}
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}
const postCreateNewAnswerForQuiz = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description,
        correct_answer,
        question_id
    })
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}
const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    })
}
export {
    DeleteUser,
    postCreateNewUser,
    getAllUsers,
    PutUpdateUser,
    getUserWithPaginate,
    postLogin,
    Resgister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizAdmin,
    deleteQuiz,
    EditQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuiz,
    postAssignQuiz,
    logout
}