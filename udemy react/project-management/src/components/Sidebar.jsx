import Button from "./Button"
export default function Sidebar({onStartAdd, projects, onSelectProject, selected_project_id}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="text-xl font-bold text-stone-700 my-4">Your Projects</h2>
            <div>
                <Button name="+ Add Projects" onClick={onStartAdd}></Button>
            </div>
            <ul className="mt-8">
                {projects.map((project, key) => {
                    let classes ="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"

                    if(project.id === selected_project_id) {
                        classes += ' bg-stone-800 text-stone-200'
                    }else {
                        classes += ' text-stone-400'
                    }
                    return (
                    <li key={key}>
                        <button onClick={() => onSelectProject(project.id)} className={classes}>{project.title}</button>
                    </li>
                )}
                )}
                
            </ul>
        </aside>
    )
}