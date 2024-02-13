import { useState,useRef } from "react";
import ResultsPopup from "./ResultsPopup";

export default function TimeerChallenge({title,targetTime}) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime *1000);
    const timer = useRef();
    const dialog = useRef();

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000);
        dialog.current.open()
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        },10);
    }
    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);

    }
    return (
        <>
        <ResultsPopup ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">{targetTime} Second{targetTime > 1 ? 's' : ''}</p>
            <p>
                <button onClick={!timeIsActive ? handleStart : handleStop}>
                    {timeIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timeIsActive ? 'active' : ''}>
                {timeIsActive  ? 'Time is Running' : 'Time has Expired'}
            </p>

        </section>
        </>
    )
}