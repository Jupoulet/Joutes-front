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
import './App.css';
import Navbar from './components/Navbar/index'

const Wrapper = styled.div`
  height: 100%;
  padding: 0em 2em;
`
// DATABASE_URL : postgresql-tetrahedral-56838
const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Router>
        <Switch>
          <Route exatc path="/" component={Home} />
        </Switch>
      </Router>
    </Wrapper>
  )
}

export default App;
