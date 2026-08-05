import { useEffect, useReducer } from "react";
import { todoContext } from "./todoContext";
import { initialState } from "../consts";
import { todoReducer } from "../reducers/todoReducer";

//Creación de la función init para poder obtener los datos del localStorage en caso de poder parsearse, sino mantener el initialState como valor inicial.
function init() {
    try {
        const todosGuard = localStorage.getItem('TODOS')
        return todosGuard ? JSON.parse(todosGuard) : initialState
    }
    catch {
        return initialState
    }
}

//Creación del provider para poder compartir datos entre toda la aplicación.
export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    //Guardado de los datos en localStorage.
    useEffect(() => {
        localStorage.setItem('TODOS', JSON.stringify(todos))
    }, [todos])
    
    return(
        <todoContext.Provider value={{ todos, dispatch }}>
            {children}
        </todoContext.Provider>
    )
}