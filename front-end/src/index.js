import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./protected/route";
import { default as LoginPage } from "./components/login";
import { default as TodoLayout } from "./components/todo";
import { default as NotFound } from "./components/notfound";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute exact path="/todo" component={TodoLayout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
   document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
