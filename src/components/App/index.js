/**
 * Imports de dépendances
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

/**
 * Imports locaux
 */
// Composants React
import Home from 'src/components/Home';
import About from 'src/components/About';
import Contact from 'src/components/Contact';
import Popup from 'src/components/Popup';
import NotFound from 'src/components/NotFound';
import WorkMenu from 'src/components/WorkMenu';
// Données
// Styles et assets
import './app.scss';
import 'semantic-ui-css/semantic.min.css';
import { useSelector } from 'react-redux';

/**
 * Code
 */
const App = () => {
  const { isVisible, isSuccess, message } = useSelector((globalState) => globalState.popup);
  const { isConnected } = useSelector((globalState) => globalState.userData);

  return (
    <Router as="div" id="app">
      <Switch>
        <Route exact path="/">
          {
            isConnected ? <Redirect from="/" to="/vos-tableaux/" /> : <Home />
          }
        </Route>
        <Route exact path="/a-propos/">
          <About />
        </Route>
        <Route exact path="/contact/">
          <Contact />
        </Route>
        <Route exact path="/vos-tableaux/">
          {
            !isConnected ? <Redirect from="/vos-tableaux/" to="/" /> : <WorkMenu />
          }
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Popup isVisible={isVisible} message={message} isSuccess={isSuccess} />
    </Router>
  );
};

/**
 * Export
 */
export default App;
