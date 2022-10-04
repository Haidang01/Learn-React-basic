import _ from 'lodash';

const Question = (props) => {
    const { dataQuiz, index } = props;
    if (_.isEmpty(dataQuiz)) {
        return (<>hahahaha</>)
    }
    const handleCheckBox = (event, aid, qid) => {
        props.handleCheckbox(aid, qid)
    }
    console.log(dataQuiz);
    return (
        <>
            {dataQuiz.image ?
                <div className='q-image'>
                    <img src={`dataQuiz:image/jpeg;base64,${dataQuiz.image}`} />
                </div> :
                <div className='q-image'>

                </div>
            }
            <div className="question"> Questin {index + 1} : {dataQuiz.questionsDescription}</div>
            <div className="answer">
                {dataQuiz.answers && dataQuiz.answers.length &&
                    dataQuiz.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        checked={a.isSelected}
                                        className="form-check-input "
                                        onChange={(event) => {
                                            handleCheckBox(event, a.id, dataQuiz.questionId)
                                        }}
                                        type="checkbox"
                                        id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {a.description}
                                    </label>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;