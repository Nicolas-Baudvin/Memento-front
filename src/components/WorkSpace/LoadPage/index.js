import React from 'react';
import './style.scss';
import { Loader, Dimmer } from 'semantic-ui-react';

export default ({ active }) => <div className="loadPage">
  <Dimmer active={active}>
    <Loader content="Chargement de vos listes en cours..." size="massive" inline="centered" active={active} />
  </Dimmer>
</div>;
