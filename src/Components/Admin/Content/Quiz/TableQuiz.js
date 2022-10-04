import { useEffect } from "react";
import { useState } from "react";
const TableQuiz = (props) => {
    const { listQuiz, setListQuiz, fetchQuiz } = props;
    useEffect(() => {
        fetchQuiz();
    }, [])


    return (
        <>

            <table className="table table-hover table-bordered mt-1">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td scope="row">{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "20px" }}>
                                    <button className="btn btn-warning" onClick={() => { props.handleEditQuiz(item) }}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => { props.handleDeleteQuiz(item) }}>Delete</button>

                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </>
    )
}
export default TableQuiz;