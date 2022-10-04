import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import './DetailQuiz.scss'
import _ from 'lodash';
import Question from "./Question";
import { useState } from "react";
import ModelResult from "./ModelResult";
import RightContent from "./Content/RightContent";
const DetailQuiz = (props) => {
    const location = useLocation();

    const params = useParams();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const quizId = params.id;
    const [isShowModelResult, setIsShowModelResult] = useState(false);
    const [dataModelResult, setDataModelResult] = useState('');
    useEffect(() => {
        fetchQuestions();
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log(res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            // console.log(raw);
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy('id')
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let questionsDescription, image = null;
                    let answers = [];
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionsDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })

                    // console.log(key, answers, questionsDescription, image);
                    return { questionId: key, answers, questionsDescription, image }
                })
                .value()
            // console.log(data);
            setDataQuiz(data)
        }
    }
    // console.log('check params', params);
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }

    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: [
            ],
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);

                    }
                })
                answers.push(
                    {
                        questionId: +questionId,
                        userAnswerId: +userAnswerId,
                    })
            })
            payload.answers = answers;
            //submit API
            let res = await postSubmitQuiz(payload);
            // console.log(res);
            if (res && res.EC === 0) {
                setDataModelResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,

                })
                setIsShowModelResult(true);
            } else {
                alert("something wrongs")
            }

        }
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;

                }
                return item;
            })

        }
        let index = dataQuiz.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            // console.log(dataQuizClone);
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    // console.log(dataQuiz[0]);
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                    gsdfgsdfgsdf
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        dataQuiz={
                            dataQuiz && dataQuiz.length > 0 ?
                                dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary " onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning " onClick={() => handleFinishQuiz()}>Finish</button>


                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                />
            </div>
            <ModelResult show={isShowModelResult} dataModelResult={dataModelResult} setShow={setIsShowModelResult} />
        </div>
    )
}
export default DetailQuiz;