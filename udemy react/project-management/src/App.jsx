import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import {useState} from 'react'
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projects, setProjects] = useState({
    selectedProjectId:undefined,
    projects: []
  })

  function handleStartAddProject() {
    setProjects(prevProjects => { 
      return {
        ...prevProjects,
        selectedProjectId: null,

      }
    })
  }

  function handleProjectSave(id, title, description, duedate) {
    setProjects(prevProjects => {
      const newProject = {
        'id':id,
        'title' :title,
        'description': description,
        'duedate': duedate
      }
      return {
        ...prevProjects,
        selectedProjectId: undefined,
        projects: [...prevProjects.projects, newProject]
      }
    });
 
  }

  function handleCancleProject() {
    setProjects(prevProjects => {

      return {
        ...prevProjects,
        selectedProjectId: undefined,
      }
    });
  }

  function handleSelectProject(id) {
    setProjects(prevProjects => {

      return {
        ...prevProjects,
        selectedProjectId: id,
      }
    });
  }

  function handleDeleteProject() {
    setProjects((prevState) => {
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: prevState.projects.filter((proj) => proj.id !== prevState.selectedProjectId)
      }
    })
  }
  let selectedProject = projects.projects.find((proj) => proj.id === projects.selectedProjectId)
  let content = <SelectedProject project={selectedProject} deleteProject={handleDeleteProject}/>;
  if(projects.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAdd={handleStartAddProject}/>
  }else if(projects.selectedProjectId === null) {
    content =  <NewProject onSaveClick={handleProjectSave} onCancel={handleCancleProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar selected_project_id={projects.id} onStartAdd={handleStartAddProject} projects={projects.projects} onSelectProject={handleSelectProject} selectedProjectId/>
      {content}
    </main>
  );
}

export default App;
