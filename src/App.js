import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import './App.css';
import Counties from './components/AllCounties/Counties';
import Home from './components/Home';
import County from './components/County/county';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" component={Home} />
        < Route path="/counties" component={Counties} />
        <Route path="/:name" component={County} />
        </div>
      </Router>

    </div>
  );
}

export default App;
