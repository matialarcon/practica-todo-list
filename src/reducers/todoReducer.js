export const todoReducer = (state, action) => {
    const { type, title, id } = action

    switch(type) {
        //En caso de querer agregar un Todo al estado global, primero copiamos el estado anterior usando el Spread Operator y luego agregamos un nuevo Todo, dandole valores a sus atributos.
        case 'ADD_TODO':
            return [...state, {
                id: crypto.randomUUID(),
                title: title,
                completed: false
            }]
        //En caso de querer marcar o desmarcar un Todo, primero mapeamos el estado global y luego invertimos el valor del atributo completed, usando el id del Todo a modificar
        case 'TOGGLE_TODO':
            return state.map(i => {
                if (i.id === id) {
                    return {
                        ...i,
                        completed: !i.completed
                    }
                }

                return i
            })
        //En caso de querer editar un Todo, primero mapeamos el estado global y luego cambiamos el valor del atributo title, usando el id de el Todo a editar.
        case 'EDIT_TODO':
            return state.map(i => {
                if (i.id === id) {
                    return {
                        ...i,
                        title: title
                    }
                }

                return i
            })
        //En caso de querer eliminar un Todo filtramos del estado global, eliminando el Todo usando su id.
        case 'REMOVE_TODO':
            return state.filter(i => i.id !== id)
        default:
            return state
    }
}