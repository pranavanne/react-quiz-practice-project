import {useState, useEffect} from 'react';

export default function QuestionTimer({timeout, onTimeout}) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout();
        }, timeout);
        return () => {clearTimeout(timer)}  // clean up functions that run when the timer is removed from dom.
    },[timeout, onTimeout]); // dependencies for useEffect.

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevState) => (prevState - 100));
        }, 100);
        return () => {
            clearInterval(interval);   // clean up function
        }
    },[]);

    return (
        <progress id="question-time" max={timeout} value={remainingTime}></progress>
    );
}