import React, { useState, useEffect } from 'react';
import { TextField, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

// Actions
import { sendMessage } from '../../../../store/Socket/actions';
import { findMessages } from '../../../../store/Chat/actions';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#6E00C8',
    margin: '1em 0',
    width: '150px'
  },
  input: {
    margin: '1em 0',
    width: '90%',
  }
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const { messages } = useSelector((GlobalState) => GlobalState.chat);
  const { username } = useSelector((GlobalState) => GlobalState.userData.datas);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && message.length < 200) dispatch(sendMessage({ title: message }));
    setMessage('');
  };

  const handleChange = (e) => e.target.value.length < 200 && setMessage(e.target.value);

  useEffect(() => {
    dispatch(findMessages());
  }, []);

  return (<>
    <h3 className="sideActionMenu-subTitle">Discussion</h3>
    <Divider />
    <div className="sideActionMenu-chat">
      <div className="sideActionMenu-chat-messages">
        {
          messages.map((mes) => <div key={mes._id} className={cx("sideActionMenu-chat-messages__item", { right: mes.author === username })}>
            <p> {mes.title} </p>
            <div className="sideActionMenu-chat-messages__item--from"> de <span>{mes.author}</span> le <time> {mes.createdAt.replace('T', ' à ').replace('Z', '').substring(0, 21).replace('-', ' ')}  </time>  </div>
          </div>)
        }
        {
          messages.length === 0 && <Typography align="center"> Il n'y a pas encore de message dans le chat</Typography>
        }
      </div>
      <form className="sideActionMenu-chat-form" onSubmit={handleSubmit}>
        <TextField className={classes.input} variant="outlined" multiline placeholder="150 caractères max" value={message} onChange={handleChange} />
        <Button className={classes.button} variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </form>
    </div>
  </>
  );
};
