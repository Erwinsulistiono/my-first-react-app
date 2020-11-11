import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Item from './pages/Item'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/item' component={Item}></Route>
        <Route exact path='/user' component={User}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App