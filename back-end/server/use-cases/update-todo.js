export default function makeUpdateTodo({ backendDb }) {
    return async function updateTodo({ todoInfo, todoId, userId, token }) {
        if (!todoId) {
            throw new Error("ToDo ID is required!")
        }
        if (!userId) {
            throw new Error("UserId is required")
        }

        return await backendDb.update({
            id: todoId,
            ...todoInfo
        })
    }
}