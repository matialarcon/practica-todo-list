import { useState, useContext } from "react"
import { todoContext } from "../context/todoContext"

export function CreateTodo() {
    const { dispatch } = useContext(todoContext)
    const [title, setTitle] = useState('')

    //Creación de una función que primero corta los espacios al principio y al final de el título escrito para el Todo, y luego comprueba que dicho título tenga un valor, de ser así, lo almacena en el estado global utilizando el dispatch.
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