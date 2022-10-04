
import { useState } from 'react';
import Select from 'react-select';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import './Questions.scss';
import { v4 as uuidv4 } from 'uuid';
import _, { isEmpty } from 'lodash';
import { getAllQuizAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuiz } from "../../../../services/apiService";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

uuidv4();
const Questions = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: "",
            image: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },

            ]
        },

    ];
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let dataQuiz = await getAllQuizAdmin();
        // console.log(res);
        if (dataQuiz && dataQuiz.EC === 0) {
            let newQuiz = dataQuiz.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }
    // console.log('check lisst quiz ', listQuiz);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(initQuestion)
    const handleAddRemoveQuestion = (type, id, question) => {
        console.log('check ques', question);
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                image: "",
                imageFile: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
        console.log('>>>check :', type, id);
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log(type, questionId, answerId);
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            // console.log('checsdfsd', questionsClone[0]);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone)

        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.clone(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone)
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.clone(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            console.log(event.target.files[0].name);
            questionsClone[index].imageName = event.target.files[0].name;

            setQuestions(questionsClone)
        }

    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.clone(questions);
        // console.log(type, answerId, questionId, value);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map((answer) => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }


    }
    // postCreateNewQuestionForQuiz, postCreateNewAnswerForQuiz
    const handleSubmitQuestionForQuiz = async () => {
        // validate 
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz');
            return;
        }
        // validate question 
        let isValidQ = true;
        let indexQ1;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for question ${indexQ1 + 1}`);
            return
        }
        //validate answer
        let isValidA = true;
        let indexQ, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidA = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidA === false) break;
        }
        if (isValidA === false) {
            toast.error(`Not empty answer ${indexA + 1} at question ${indexQ + 1} `);
            return
        }




        //     console.log('check question', questions, selectedQuiz);
        //     //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                selectedQuiz.value,
                question.description,
                question.imageFile,
            );
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuiz(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }


        }
        toast.success('Create questions and answer succed !');
        setQuestions(initQuestion);
    }
    return (
        <div className="question-container">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className='form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description ">
                                        <input
                                            type="text" className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label> Question {index + 1} Description :</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`} >

                                            <RiImageAddFill className='label-up' />

                                        </label>
                                        <input type={'file'} hidden
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>{question.imageName ? question.imageName : '0 file is uploaded'}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', question)}>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <FaMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className='form-check-input iscorrect'
                                                    type={"checkbox"}
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}

                                                    />
                                                    <label> Answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusSquare className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>

                                        )
                                    })
                                }

                            </div>
                        )
                    })}
                {questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-outline-primary'> Save </button>
                    </div>
                }

            </div>
        </div>
    )
}
export default Questions;