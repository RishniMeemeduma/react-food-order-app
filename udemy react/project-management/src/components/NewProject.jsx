import Input from "./Input";
import {useRef} from 'react'
import Modal from "./Modal";
export default function NewProject({onSaveClick, onCancel}) {
    const title = useRef();
    const description = useRef();
    const duedate = useRef();
    const modal = useRef();

    function saveData() {
       let Enteredtitle =  title.current.value;
       let Entereddescription =  description.current.value;
       let Enteredduedate = duedate.current.value
        if(Enteredtitle.trim() === '' || Entereddescription.trim() === '' || Enteredduedate.trim() === '') {
            modal.current.open();
            return;
        }
        onSaveClick(Math.random(),Enteredtitle, Entereddescription, Enteredduedate )
    }
    return (
        <>
        <Modal ref={modal} buttonCaption='Ok'>
            <h2 className='text-xl font-bold text-stone-500 mt-4 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Oops !!, Looks like you forgot to enter values</p>
            <p className='text-stone-600 mb-4'>Please make sure you provide valid values for every input fields.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                </li>
                <li>
                    <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={saveData}>Save
                    </button>
                </li>
            </menu>
            <div className="flex flex-col gap-4">
                <Input type='text' label="Title" ref={title}/>
                <Input label="Description" textArea ref={description}/>
                <Input type='date' label="Due Date" ref={duedate}/>
            </div>
        </div>
        </>

    )
}