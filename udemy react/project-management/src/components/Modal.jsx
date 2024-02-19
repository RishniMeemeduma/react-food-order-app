import {createPortal} from 'react-dom';
import {forwardRef, useImperativeHandle, useRef } from 'react';
import Button from './Button';

let Modal =  forwardRef(function Modal({children, buttonCaption}, ref) {
    const dialog = useRef(ref);
    useImperativeHandle(ref,() => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4  rounded-md shadow-md ">
            <form method='dialog' className='mt-4 text-right '>
                <Button name={buttonCaption} />
            </form>
            {children}
        </dialog>, document.getElementById('modal-root')
    )
})

export default Modal;