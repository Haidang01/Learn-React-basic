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
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>

                <Route path="/admins" element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

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
        </>
    )
}
export default Layout;