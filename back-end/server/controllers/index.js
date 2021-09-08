// import usecases
import {
  createLogin,
  getUser,
  createTodo
} from '../use-cases'

import notFound from './not-found'

import { getUserId, } from '../misc/utilities'

// import controllers
import makePostLogin from './login'
import makeGetUser from './get-user'
import makePostTodo from './create-todo'


const postLogin = makePostLogin({ createLogin })
const readUser = makeGetUser({ getUser, getUserId })
const postTodo = makePostTodo({ createTodo, getUserId })


const backendController = Object.freeze({
  notFound,
  postLogin,
  readUser,
  postTodo
})

export default backendController
export {
  notFound,
  postLogin,
  readUser,
  postTodo
}
