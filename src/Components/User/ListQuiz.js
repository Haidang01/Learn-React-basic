import { assign } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizDaTa()
    }, [])
    const getQuizDaTa = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    }
    console.log(arrQuiz);
    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "10rem", height: "276px" }}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} style={{ width: "6rem", height: "9rem" }} className="card-img-top m-auto" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary" onClick={() => { navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } }) }}>Start now</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuiz && arrQuiz.length === 0
                &&
                <div>You don't have any quizz now...</div>
            }


        </div>
    )
}
export default ListQuiz;