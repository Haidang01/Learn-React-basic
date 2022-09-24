import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {
    const { listUsers, pageCount } = props;
    // const [pageCount, setPageCount] = useState(0);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        props.fetchListUserWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
    }


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
                                <tr key={`table user - ${index}`}>
                                    <td>{item.id}</td>
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
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}
export default TableUserPaginate;