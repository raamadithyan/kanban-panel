import './App.css'
import KanbanBoard from './components/KanbanBoard'

function App() {

  return (
    <>
  <h1 className='font-bold font-sans text-center py-6 text-2xl fixed left-[50%] translate-x-[-50%]  '>Kanban Board</h1>

  <div className=' flex gap-12 justify-center items-center h-[100vh] '>
    <KanbanBoard/>
  </div>
    </>
  )
}

export default App
