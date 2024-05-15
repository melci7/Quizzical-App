import { useState, useEffect } from 'react'
import './App.css'
import he from 'he';
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [trivia, setTrivia] = useState([])
  const [start, setStart] = useState(true)
  const [score, setScore] = useState(0)
  const [check, setCheck] = useState(false)
  async function fetchData() {
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      const setArr = data.results.map((item) => {
        const decodeQuestion = he.decode(item.question)
        const decodeAnswers = item.incorrect_answers.map(answer => he.decode(answer))
        const decodeCorrectAnswer = he.decode(item.correct_answer)
        const randomIndex = Math.floor(Math.random() * (decodeAnswers.length + 1))
        decodeAnswers.splice(randomIndex, 0, decodeCorrectAnswer)
        return {
          id: decodeQuestion,
          question: decodeQuestion,
          answers: decodeAnswers,
          correctAnswer: decodeCorrectAnswer,
          selectedAnswer: -1,
          isCorrect: false
        }
      })
      setTrivia(setArr)
    } catch (error) {
      console.error("Error fetching trivia data:", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  function handleStart() {
    setStart(prevValue => !prevValue)
  }

  const triviaArr = trivia.map(item => {
    return <Quiz question={item.question}
      id={item.id}
      selectedAnswer={item.selectedAnswer}
      answers={item.answers}
      correctAnswer={item.correctAnswer}
      onSelectAnswer={onSelectAnswer}
      isCorrect={item.isCorrect}
      check={check}
    />
  })

  function onSelectAnswer(answer, questionId) {
    setTrivia(prevTrivia => prevTrivia.map((item) => {
      if (item.id === questionId) {
        return { ...item, selectedAnswer: answer }
      }
      return item;
    }))
  }

  function handleCheckAnswers() {
    setTrivia(prevTrivia => prevTrivia.map((item) => {
      if (item.selectedAnswer === item.correctAnswer) {
        setScore(prevScore => prevScore + 1)
        return { ...item, isCorrect: true }
      }
      return item
    }))

    setCheck(true)
  }

  function handleReset() {
    setStart(true)
    setScore(0)
    setCheck(false)
    fetchData()
  }
  return (
    <div className='container'>
      {start ? <Start handleClick={() => handleStart()} /> : triviaArr}
      <div className='answer'>
        {check && <p className='score-text'>You scored {score}/5 correct answers</p>}
        {!start && !check && <button className="check-btn" onClick={handleCheckAnswers}>Check answers</button>}
        {!start && check && <button className="reset-btn" onClick={handleReset}>Play Again</button>}
      </div>
    </div>
  )
}

export default App
