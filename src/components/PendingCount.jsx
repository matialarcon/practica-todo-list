import { useContext } from "react"
import { todoContext } from "../context/todoContext"

export function PendingCount() {
    const { todos } = useContext(todoContext)
    //Declaración de una constante en donde se almacenan los Todos que no esten completados.
    const pendingCount = todos.filter(todo => !todo.completed).length

    return(
        <span className="todo-count">
            {pendingCount} {pendingCount === 1 ? 'Tarea pendiente' : 'Tareas pendientes'}
        </span>
    )
}