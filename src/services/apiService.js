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
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword })

}
const Resgister = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })

}
export {
    DeleteUser,
    postCreateNewUser,
    getAllUsers,
    PutUpdateUser,
    getUserWithPaginate,
    postLogin,
    Resgister
}