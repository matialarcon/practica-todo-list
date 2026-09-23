import { useState, useContext } from "react"
import { todoContext } from "../context/todoContext"

export function Todos({ filterSelected }) {
    const { todos, dispatch } = useContext(todoContext)
    const [editTodoId, setEditTodoId] = useState(null)
    const [editTodoTitle, setEditTodoTitle] = useState('')

    //Declaración de una constante en donde se almacenan los Todos filtrados según el filtro seleccionado.
    const filteredTodos = 
        filterSelected === 'Activos' ? todos.filter(todo => !todo.completed) :
        filterSelected === 'Completados' ? todos.filter(todo => todo.completed) :
        todos

    //Creación de una función en donde se modifica el valor de dos estados almacenando el id y título del Todo que se desea modificar.
    const editingTodo = (todo) => {
        setEditTodoId(todo.id)
        setEditTodoTitle(todo.title)
    }

    //Creación de una función que primero corta los espacios al principio y al final de el título escrito para modificar el Todo, y luego comprueba que dicho título tenga un valor, de ser así, lo almacena en el estado global utilizando el dispatch, en caso contrario, elimina el Todo modificado. Por último, se vuelve a su estado inicial al estado que almacena el id del Todo a modificar, para así terminar el proceso de modificación.
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
                            <input type="checkbox" className="toggle" checked={todo.completed} onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id})} id={`toggle${todo.id}`}/>
                            {editTodoId === todo.id ? (
                            <form onSubmit={submitEdit}>
                                <input type="text" className="new-todo" name="edit-todo-input" value={editTodoTitle} onChange={(event) => setEditTodoTitle(event.target.value)} onBlur={submitEdit} autoFocus/>
                            </form>
                            ) : (
                            <>
                                <label onDoubleClick={() => editingTodo(todo)} htmlFor={`toggle${todo.id}`} style={{ cursor: 'pointer' }}>{todo.title}</label>
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