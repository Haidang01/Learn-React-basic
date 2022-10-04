import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageUser from "./Components/Admin/Content/ManageUser";
import Dashboard from "./Components/Admin/Content/DashBoard";
import Login from "./Components/Auth/Login";
import HomePage from "./Components/Home/HomePage";
import User from "./Components/User/User";
import Admin from "./Components/Admin/Admin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import Signup from "./Components/Auth/Signup";
import ListQuiz from "./Components/User/ListQuiz";
import DetailQuiz from "./Components/User/DetailQuiz";
import ManageQuiz from "./Components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./Components/Admin/Content/Questions/Questions";
import PrivateRoute from "./routers/PrivateRoute";
import React, { Suspense } from "react";
const NotFound = () => {
    return (
        <div className="alert-danger container mt-2">
            404.NotFound data with your current URL
        </div>
    )
}

const Layout = (props) => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Suspense>
    )
}
export default Layout;