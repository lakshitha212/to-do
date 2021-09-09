export default function makeDeleteTodo({ backendDb }) {
    return async function deleteTodo({ todoId }) {
        if (!todoId) {
            throw new Error("ToDo ID is required!")
        }

        return await backendDb.delete({
            id: todoId
        })
    }
}