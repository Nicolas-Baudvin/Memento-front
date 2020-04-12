/**
 * Imports de dépendances
 */
import '@babel/polyfill';

// La librairie 'react' fait un export par défaut, on fait donc un import par
// défaut (=> on commande le plat du jour)
import React from 'react';

// La librairie 'react-dom' fait plusieurs exports nommés, on fait donc un import
// nommé en désignant explicitement ce qui nous intéresse (=> on commande à la
// carte)
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';

// La librairie 'react-redux' fournit des utilitaires pour raccorder un composant
// React à un store implémenté selon le modèle Redux.
// Le Provider est un composant React capable de fournir des données à des
// consommateurs, notamment la fonction connect de 'react-redux'.
import { Provider } from 'react-redux';

/**
 * Imports locaux
 */
import App from 'src/components/App';
import appStore from 'src/store';

/**
 * Code
 */
const rootComponent = <Provider store={appStore}><App /></Provider>;
const renderingArea = document.querySelector('#root');
ReactDOM.render(rootComponent, renderingArea);
