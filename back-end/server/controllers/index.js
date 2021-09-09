// import usecases
import {
  createLogin,
  getUser,
  createTodo,
  getTodos
} from '../use-cases'

import notFound from './not-found'

import { getUserId, } from '../misc/utilities'

// import controllers
import makePostLogin from './login'
import makeGetUser from './get-user'
import makePostTodo from './create-todo'
import makeGetTodos from './get-todos'


const postLogin = makePostLogin({ createLogin })
const readUser = makeGetUser({ getUser, getUserId })
const postTodo = makePostTodo({ createTodo, getUserId })
const allTodos = makeGetTodos({ getTodos, getUserId })


const backendController = Object.freeze({
  notFound,
  postLogin,
  readUser,
  postTodo,
  allTodos
})

export default backendController
export {
  notFound,
  postLogin,
  readUser,
  postTodo,
  allTodos
}
