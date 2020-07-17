import React from "react";
import cx from 'classnames';
import { Paper, Typography, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteNotif, acceptFriendInvitation } from "../../../../store/Socket/actions";

export default ({ list, classes }) => {
  const dispatch = useDispatch();
  const declineNotif = (notif) => () => {
    dispatch(deleteNotif(notif));
  };

  const acceptNotif = (notif) => () => {
    dispatch(acceptFriendInvitation(notif.from, true, notif._id));
  };
  return (<>
    {
      list && list.map((notif) => <Paper key={notif.from} className={classes.notif}>
        <Typography className={classes.notifTitle} component="p"> {notif.title} </Typography>
        <div className={classes.groupButton}>
          <Button onClick={acceptNotif(notif)} variant="contained" className={cx(classes.buttons, classes.accept)}>
            Accepter
          </Button>
          <Button onClick={declineNotif(notif)} variant="contained" color="secondary" className={cx(classes.buttons, classes.decline)}>
            Ignorer
          </Button>
        </div>
      </Paper>)
    }
  </>
  );
};
