import { useContext, useState } from "react"
import { todoContext } from "./context/todoContext"

function App() {
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todo</h1>
          <CreateTodo />
        </header>
        <Todos />
      </section>
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
      <input type="text" placeholder="¿Qué quieres hacer?" value={title} onChange={(event) => setTitle(event.target.value)} className="new-todo" name="add-todo-input" autoFocus/>
    </form>
  )
}

function Todos() {
  const { todos, dispatch } = useContext(todoContext)

  if (todos.length === 0) return null

  return(
    <section className="main">
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="view">
              <input type="checkbox" className="toggle" checked={todo.completed} onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id})}/>
              <label>{todo.title}</label>
              <button className="destroy" onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id})}></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App
