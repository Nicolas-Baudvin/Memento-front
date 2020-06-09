/**
 * Imports de dépendances
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Imports locaux
 */
// Composants React
import Home from '../Home';
import Popup from '../Popup';
import NotFound from '../NotFound';
import WorkMenu from '../WorkMenu';
import WorkSpace from '../WorkSpace';
import ForgotPassword from '../ForgotPassword';
import NewPassword from '../NewPassword';
import EmailChange from '../EmailChange';
import Footer from '../Footer';
import LastNews from '../LastNews';
// Styles et assets
import './app.scss';
import 'semantic-ui-css/semantic.min.css';

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
        <Route exact path="/vos-tableaux/">
          {
            !isConnected ? <Redirect from="/vos-tableaux/" to="/" /> : <WorkMenu />
          }
        </Route>
        <Route exact path="/vos-tableaux/:name/:id([a-f\d]{24})">
          {
            !isConnected ? <Redirect from="/vos-tableaux/:id" to="/" /> : <WorkSpace isInvited={false} />
          }
        </Route>
        <Route exact path="/join/:friendTabId/:link/">
          {
            !isConnected ? <Redirect from="/join/:friendTabId/:link/" to="/" /> : <WorkSpace isInvited />
          }
        </Route>
        <Route exact path="/oublie-mot-de-passe/">
          <ForgotPassword />
        </Route>
        <Route exact path="/nouveau-mot-de-passe/:token">
          <NewPassword />
        </Route>
        <Route exact path="/confirmation-mail-changement/:emails">
          <EmailChange />
        </Route>
        <Route exact path="/nouveautes/">
          <LastNews />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
      <Popup isVisible={isVisible} message={message} isSuccess={isSuccess} />
    </Router>
  );
};

/**
 * Export
 */
export default App;
