import { useContext, useState } from "react"
import { todoContext } from "./context/todoContext"

const filterOptions = [
  {
    id: 1,
    name: 'Todos'
  },
  {
    id: 2,
    name: 'Activos'
  },
  {
    id: 3,
    name: 'Completados'
  }
]

function App() {
  const [filterSelected, setFilterSelected] = useState(filterOptions[0].name)

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todo</h1>
          <CreateTodo />
        </header>
        <Todos filterSelected={filterSelected}/>
        <footer className="footer">
          <Footer setFilterSelected={setFilterSelected}/>
        </footer>
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

function Todos({ filterSelected }) {
  const { todos, dispatch } = useContext(todoContext)
  const [editTodoId, setEditTodoId] = useState(null)
  const [editTodoTitle, setEditTodoTitle] = useState('')

  const filteredTodos = 
    filterSelected === 'Activos' ? todos.filter(todo => !todo.completed) :
    filterSelected === 'Completados' ? todos.filter(todo => todo.completed) :
    todos

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
        {filteredTodos.map(todo => (
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

function Footer({ setFilterSelected }) {
  const { todos, dispatch } = useContext(todoContext)
  const pendingCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  const clearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        dispatch({ type: 'REMOVE_TODO', id: todo.id })
      }
    })
  }

  return(
    <>
      <span className="todo-count">
        {pendingCount} {pendingCount === 1 ? 'Tarea pendiente' : 'Tareas pendientes'}
      </span>

      <div>
        <Filters setFilterSelected={setFilterSelected} />
      </div>

      {
        completedCount > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
              Borrar completados
          </button>
        )
      }
    </>
  )
}

function Filters({ setFilterSelected }) {
  return(
    <ul className="filters">
      {filterOptions.map(option => (
        <li key={option.id}>
          <a href="#" onClick={() => setFilterSelected(option.name)}>
            {option.name}
          </a>
        </li>
      ))
      }
    </ul>
  )
}

export default App
