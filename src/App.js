import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Movies from './components/movies';

class App extends Component {
  render() {
    return (
      <main className="container">
      <BrowserRouter>
        <Movies />
      </BrowserRouter>
      </main>
    )
  }
}

export default App;