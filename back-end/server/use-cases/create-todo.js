export default function makeCreateTodo({ backendDb }) {
    return async function createTodo(todoName, userId) {
        if (!todoName) {
            throw new Error("ToDo name is required!")
        }
        if (!userId) {
            throw new Error("UserId is required")
        }
        // const response = await callRemoteAPI({
        //     url: process.env.DEMO_API.concat('api/login'),
        //     method: "POST",
        //     json: { email, password },
        // })
        // if (!response.token) {
        //     throw new Error(response.error)
        // }
        // return response
    }
}