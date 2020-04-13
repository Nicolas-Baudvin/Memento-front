/**
 * Imports de dépendances
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Imports locaux
 */
// Composants React
import Home from 'src/components/Home';
import About from 'src/components/About';
import Contact from 'src/components/Contact';
// Données
// Styles et assets
import './app.scss';
import 'semantic-ui-css/semantic.min.css';

/**
 * Code
 */
const App = () => {
  return (
    <Router as="div" id="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/a-propos/">
          <About />
        </Route>
        <Route exact path="/contact/">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
};

/**
 * Export
 */
export default App;
