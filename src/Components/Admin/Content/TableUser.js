import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { getAllUsers } from "../../../services/apiService";
const TableUser = (props) => {
    const [listUser, setListUser] = useState([
    ])
    useEffect(() => {
        fetchListUser();

    }, []);
    const fetchListUser = async () => {
        let res = await getAllUsers();

        if (res.EC === 0) {
            setListUser(res.DT)
        }

    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table user -${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary ms-5 ">View</button>
                                        <button className="btn btn-warning mx-4">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}
export default TableUser;