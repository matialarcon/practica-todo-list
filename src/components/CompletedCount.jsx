import { useContext } from "react"
import { todoContext } from "../context/todoContext"

export function CompletedCount() {
    const { todos, dispatch } = useContext(todoContext)

    //Declaración de una constante en donde se almacenan solo los Todos que estan completados.
    const completedCount = todos.filter(todo => todo.completed).length
    
    //Creación de una función que recorre todos los Todos y que luego elimina los que esten completados utilizando el dispatch.
    const clearCompleted = () => {
        todos.forEach(todo => {
            if (todo.completed) {
                dispatch({ type: 'REMOVE_TODO', id: todo.id })
            }
        })
    }

    return(
        <span>
            {
                completedCount > 0 && (
                    <button className="clear-completed" onClick={clearCompleted}>
                        Borrar completados
                    </button>
                )
            }
        </span>
    )
}