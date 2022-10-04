import CountDown from "./CountDown";


const RightContent = (props) => {
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz()
    }
    const getClassQuestion = (question, index) => {
        console.log(question.answers.length);
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.some(a => a.isSelected === false);
            if (isUnAnswered === false) {
                return "question selected"
            }
        }
    }
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={index} className={getClassQuestion(item)}>{index + 1}</div>
                        )
                    })
                }


            </div>
        </>
    )
}
export default RightContent;