import React from 'react';
import './style.scss';
import { Loader, Dimmer } from 'semantic-ui-react';

export default ({ active, title }) => <div className="loadPage">
  <Dimmer active={active}>
    <Loader content={title} size="massive" inline="centered" active={active} />
  </Dimmer>
</div>;
