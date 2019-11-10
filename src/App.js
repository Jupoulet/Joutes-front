import React from 'react';
import styled from 'styled-components';
import "tabler-react/dist/Tabler.css";
// import init from './controllers/initDb';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Players from './pages/Players';
import './App.css';
import Navbar from './components/Navbar/index'

const Wrapper = styled.div`
  height: 100%;
  @media (max-width: 600px) {
    padding: 0em 1em;
  }
  padding: 0em 2em;
`
// DATABASE_URL : postgresql-tetrahedral-56838
const App = () => {
  return (
    <Wrapper>
      <Router>
        <Navbar />
        <Switch>
          <Route exatc path="/players" component={Players} />
          <Route exatc path="/" component={Home} />
        </Switch>
      </Router>
    </Wrapper>
  )
}

export default App;
