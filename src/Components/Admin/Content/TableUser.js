
import Table from 'react-bootstrap/Table';
import axios from "axios";

const TableUser = (props) => {
    const { listUsers } = props;
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table user -${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary ms-5 "
                                            onClick={() => props.handleClickViewUser(item)}
                                        >View</button>
                                        <button
                                            onClick={() => props.handleClickUpdateUser(item)}
                                            className="btn btn-warning mx-4">
                                            Update
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => props.handleClickDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={5}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}
export default TableUser;