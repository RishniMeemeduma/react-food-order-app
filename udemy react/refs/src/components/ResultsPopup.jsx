import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultsPopup({result, targetTime, remainingTime }, ref) {
    const dialog = useRef(ref);
    const userLost = remainingTime <= 0;
    const timer = (remainingTime/1000).toFixed(2);
    const score = Math.round(( 1 - remainingTime / (targetTime * 1000)) * 100); 
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog className="result-modal" ref={dialog}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>You Score {score}</h2>}
            <p>The target time was : <strong>{targetTime}</strong> seconds </p>
            <p>You stopped the timer with <strong>{timer}</strong> seconds left</p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>, document.getElementById('modal')
    )
});

export default ResultModal;