// import usecases
import {
  createLogin,
  getUser,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../use-cases'

import notFound from './not-found'

import { getUserId, } from '../misc/utilities'

// import controllers
import makePostLogin from './login'
import makeGetUser from './get-user'
import makePostTodo from './create-todo'
import makeGetTodos from './get-todos'
import makePutTodo from './update-todo'
import makeRemoveTodo from './delete-todo'


const postLogin = makePostLogin({ createLogin })
const readUser = makeGetUser({ getUser, getUserId })
const postTodo = makePostTodo({ createTodo, getUserId })
const allTodos = makeGetTodos({ getTodos, getUserId })
const edtTodo = makePutTodo({ updateTodo, getUserId })
const removeTodo = makeRemoveTodo({ deleteTodo, getUserId })


const backendController = Object.freeze({
  notFound,
  postLogin,
  readUser,
  postTodo,
  allTodos,
  edtTodo,
  removeTodo
})

export default backendController
export {
  notFound,
  postLogin,
  readUser,
  postTodo,
  allTodos,
  edtTodo,
  removeTodo
}
