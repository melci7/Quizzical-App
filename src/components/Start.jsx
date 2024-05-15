
export default function Start(props) {
    return (
        <div className="start-container">
            <h1 className="start-h1">Quizzical</h1>
            <p className="start-text">Some description if needed</p>
            <button className="start-btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}