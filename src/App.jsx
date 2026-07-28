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

  const submitTodo = (event) => {
    event.preventDefault()
    const titleTrimmed = title.trim()

    if (titleTrimmed !== '') {
      dispatch({type: 'ADD_TODO', title: titleTrimmed})
      setTitle('')
    }
  }

  return(
    <form onSubmit={submitTodo}>
      <input type="text" placeholder="¿Qué quieres hacer?" value={title} onChange={(event) => setTitle(event.target.value)} className="new-todo" name="add-todo-input" autoFocus/>
    </form>
  )
}

function Todos() {
  const { todos, dispatch } = useContext(todoContext)
  const [editTodoId, setEditTodoId] = useState(null)
  const [editTodoTitle, setEditTodoTitle] = useState('')

  if (todos.length === 0) return null

  const editingTodo = (todo) => {
    setEditTodoId(todo.id)
    setEditTodoTitle(todo.title)
  }

  const submitEdit = (event) => {
    event.preventDefault()
    const todoTitleTrimmed = editTodoTitle.trim()

    if (todoTitleTrimmed === '') {
      dispatch({ type: 'REMOVE_TODO', id: editTodoId})
    }
    else {
      dispatch({ type: 'EDIT_TODO', title: todoTitleTrimmed, id: editTodoId})
      setEditTodoTitle('')
    }

    setEditTodoId(null)
  }

  return(
    <section className="main">
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="view">
              <input type="checkbox" className="toggle" checked={todo.completed} onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id})}/>
              {editTodoId === todo.id ? (
                <form onSubmit={submitEdit}>
                  <input type="text" className="new-todo" name="edit-todo-input" value={editTodoTitle} onChange={(event) => setEditTodoTitle(event.target.value)} onBlur={submitEdit} autoFocus/>
                </form>
              ) : (
                <>
                  <label onDoubleClick={() => editingTodo(todo)}>{todo.title}</label>
                  <button className="destroy" onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id})}></button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App
