import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AssignmentIcon from '@material-ui/icons/Assignment';
import GavelIcon from '@material-ui/icons/Gavel';
import ContactMailIcon from '@material-ui/icons/ContactMail';

export default ({ classes }) => {
  const history = useHistory();

  const contact = () => {
    window.location.href = "mailto:support@mymemento.fr";
  };

  return <nav className="homePage-header-nav">
    <Button onClick={() => history.push("/nouveautes/")} variant="text" className={classes.button} startIcon={<AssignmentIcon />}>
      Changelogs
    </Button>
    <Button onClick={contact} variant="text" className={classes.button} startIcon={<ContactMailIcon />}>
      Contact
    </Button>
    <Button onClick={() => history.push("/mentions-legales/")} variant="text" className={classes.button} startIcon={<GavelIcon />}>
      Mentions légales
    </Button>
  </nav>;
};
