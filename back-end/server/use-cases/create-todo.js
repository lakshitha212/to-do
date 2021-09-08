export default function makeCreateTodo({ backendDb }) {
    return async function createTodo(todoName, userId, token) {
        if (!todoName) {
            throw new Error("ToDo name is required!")
        }
        if (!userId) {
            throw new Error("UserId is required")
        }

        return await backendDb.insert({
            todoName,
            userId,
            token,
            status: 'TODO',
            addedAt: Date.now()
        })
    }
}