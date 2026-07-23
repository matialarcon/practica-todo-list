import { useReducer } from "react";
import { todoContext } from "./todoContext";
import { initialState } from "../consts";
import { todoReducer } from "../reducers/todoReducer";

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState)
    
    return(
        <todoContext.Provider value={{ todos, dispatch }}>
            {children}
        </todoContext.Provider>
    )
}