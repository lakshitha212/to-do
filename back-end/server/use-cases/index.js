// import usecases
import makeCreateLogin from './login'
import makeGetUser from './get-user'
import makeCreateTodo from './create-todo'

// import other resources
import backendDb from '../data-access'
import { callRemoteAPI } from '../misc/interface'


const createLogin = makeCreateLogin({ callRemoteAPI })
const getUser = makeGetUser({ callRemoteAPI })
const createTodo = makeCreateTodo({ backendDb })

const backendService = Object.freeze({
    createLogin,
    getUser,
    createTodo
})

export default backendService

export {
    createLogin,
    getUser,
    createTodo
}