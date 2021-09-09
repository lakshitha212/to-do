// import usecases
import makeCreateLogin from './login'
import makeGetUser from './get-user'
import makeCreateTodo from './create-todo'
import makeGetTodos from './get-todos'
import makeUpdateTodo from './update-todo'
import makeDeleteTodo from './delete-todo'

// import other resources
import backendDb from '../data-access'
import { callRemoteAPI } from '../misc/interface'


const createLogin = makeCreateLogin({ callRemoteAPI })
const getUser = makeGetUser({ callRemoteAPI })
const createTodo = makeCreateTodo({ backendDb })
const getTodos = makeGetTodos({ backendDb })
const updateTodo = makeUpdateTodo({ backendDb })
const deleteTodo = makeDeleteTodo({ backendDb })

const backendService = Object.freeze({
    createLogin,
    getUser,
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
})

export default backendService

export {
    createLogin,
    getUser,
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}