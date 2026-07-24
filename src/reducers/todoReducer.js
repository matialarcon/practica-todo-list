export const todoReducer = (state, action) => {
    const { type, title, id } = action

    switch(type) {
        case 'ADD_TODO':
            return [...state, {
                id: crypto.randomUUID(),
                title: title,
                completed: false
            }]
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
        case 'REMOVE_TODO':
            return state.filter(i => i.id !== id)
        default:
            return state
    }
}