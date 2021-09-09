import createError from 'http-errors'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'

import indexRouter from './routes/index'
import cors from 'cors';

import compression from "compression";

/**
 * Enable Loggin
 * Save log files in ../log
 */
import morgan from 'morgan'
const rfs = require("rotating-file-stream");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "../log"),
});

import {
  postLogin,
  readUser,
  postTodo,
  allTodos
} from './controllers'
import makeCallback from './express-callback'
dotenv.config()
var app = express()
app.use(express.static('public'))
app.use(cors())
app.use(compression());
app.use(bodyParser.json())

app.use(morgan("combined", { stream: accessLogStream }));
app.use('/', indexRouter)
app.use('/static', express.static('public'))
app.post('/login', makeCallback(postLogin))
app.get('/user', makeCallback(readUser))
app.post('/todo', makeCallback(postTodo))
app.get('/todos', makeCallback(allTodos))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.status(err.status).send({ error: err.message })
});

export default app;
