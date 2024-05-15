export default function Quiz(props) {

    const renderArr = props.answers.map((item, index) => {
        const id = `${props.id}-${index}`
        const inputStyles = props.check ? {
            backgroundColor: (props.isCorrect && item === props.correctAnswer) ? "#94D7A2" : item === props.correctAnswer ? "#94D7A2" : (props.selectedAnswer === item && !props.isCorrect) && "#F8BCBC"
        } : {}
        const disabledClass = props.check ? "radio-disabled" : "";
        return (
            <div className='radio-container'>
                <input type="radio" id={id} name={props.id} value={item} onChange={(event) => props.onSelectAnswer(event.target.value, props.id)} className={disabledClass} />
                <label style={inputStyles} htmlFor={id} className={`button ${disabledClass}`}>{item}</label>
            </div>
        );
    })

    return (
        <div className="quiz-container">
            <h3 className="quiz-text">{props.question}</h3>
            <div className='radio-main'>
                {renderArr}
            </div>
        </div>
    )
}