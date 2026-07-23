import { useContext, useState } from "react"
import { todoContext } from "./context/todoContext"

function App() {
  return (
    <>
      <header>
        <h1>TODO List</h1>
      </header>

      <main>
        <CreateTodo />
      </main>
    </>
  )
}

function CreateTodo() {
  const { dispatch } = useContext(todoContext)
  const [title, setTitle] = useState('')

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      dispatch({type: 'ADD_TODO', title: title})
      setTitle('')
    }}>
      <input type="text" placeholder="¿Qué quieres hacer?" value={title} onChange={(event) => setTitle(event.target.value)} className="title-todo-input" name="add-todo-input"/>
    </form>
  )
}

export default App
