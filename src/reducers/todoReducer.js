export const todoReducer = (state, action) => {
    const { type, title } = action

    switch(type) {
        case 'ADD_TODO':
            return [...state, {
                id: crypto.randomUUID(),
                title: title,
                completed: false
            }]
        default:
            return state
    }
}