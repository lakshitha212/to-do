export default function makeGetTodos({ backendDb }) {
    return async function getTodos({ userId } = {}) {
        if (!userId) {
            throw new Error('You must supply a user id.')
        }
        const query = { userId: userId }
        return await backendDb.findAll({
            query
        })
    }
}