export default function makeCreateLogin({ callRemoteAPI }) {
    return async function createLogin(email, password) {
        if (!email) {
            throw new Error("Email is required!")
        }
        if (!password) {
            throw new Error("Password is required")
        }
        const response = await callRemoteAPI({
            url: process.env.DEMO_API.concat('api/login'),
            method: "POST",
            json: { email, password },
        })
        if (!response.token) {
            throw new Error(response.error)
        }
        return response
    }
}