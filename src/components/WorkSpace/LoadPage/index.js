import React from 'react';
import './style.scss';
import { Loader, Dimmer } from 'semantic-ui-react';

export default ({ active }) => <div className="loadPage">
  <Dimmer active={active}>
    <Loader content="Chargement de votre espace de travail en cours..." size="massive" inline="centered" active={active} />
  </Dimmer>
</div>;
