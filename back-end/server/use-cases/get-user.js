export default function makeGetUser({ callRemoteAPI }) {
    return async function getUser({ userId } = {}) {
        if (!userId) {
            throw new Error('You must supply a user id.')
        }
        const response = await callRemoteAPI({
            url: process.env.DEMO_API.concat(`api/users/${userId}`),
            method: "GET",
            json: true
        })
        if (!response) {
            throw new Error("User not found")
        }
        return response;
    }
}