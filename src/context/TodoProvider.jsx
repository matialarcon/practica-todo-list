import { useEffect, useReducer } from "react";
import { todoContext } from "./todoContext";
import { initialState } from "../consts";
import { todoReducer } from "../reducers/todoReducer";

function init() {
    try {
        const todosGuard = localStorage.getItem('TODOS')
        return todosGuard ? JSON.parse(todosGuard) : initialState
    }
    catch {
        return initialState
    }
}

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('TODOS', JSON.stringify(todos))
    }, [todos])
    
    return(
        <todoContext.Provider value={{ todos, dispatch }}>
            {children}
        </todoContext.Provider>
    )
}