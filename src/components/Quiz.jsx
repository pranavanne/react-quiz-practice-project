import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImage from "../assets/quiz-complete.png";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {return [...prevState, selectedAnswer]});
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(isQuizComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImage} alt="Quiz Completed Image" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
                <h2>{QUESTIONS[activeQuestionIndex].id}){QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => <li key={answer} className="answer"><button onClick={() => { handleSelectAnswer(answer) }}>{answer}</button></li>)}
                </ul>
            </div>
        </div>
    );
}