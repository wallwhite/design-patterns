import React, { Component } from 'react';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Counter />
          <Counter2 />
        </header>
      </div>
    );
  }
}

export default App;
