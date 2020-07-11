import React from "react";
import { Container, Tooltip, IconButton } from "@material-ui/core";
import cx from 'classnames';

import GroupIcon from '@material-ui/icons/Group';

export default ({ classes, setOpen, isOpen }) => {
  return (
    <Container className={cx(classes.container, classes.menu)}>
      <Tooltip title="Votre liste d'amis">
        <IconButton onClick={() => setOpen(!isOpen)} className={classes.menuButton}>
          <GroupIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </Container>
  );
};
