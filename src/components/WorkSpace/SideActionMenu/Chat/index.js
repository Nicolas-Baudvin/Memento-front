import React, { useState, useEffect } from 'react';
import { TextArea, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../store/Socket/actions';
import { findMessages } from '../../../../store/Chat/actions';

export default () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const { messages } = useSelector((GlobalState) => GlobalState.chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && message.length < 200) dispatch(sendMessage({ title: message }));
    setMessage('');
  };

  const handleChange = (e) => e.target.value.length < 200 && setMessage(e.target.value);

  useEffect(() => {
    dispatch(findMessages());
  }, []);

  return (
    <div className="sideActionMenu-chat">
      <div className="sideActionMenu-chat-messages">
        {
          messages.map((mes) => <div key={mes._id} className="sideActionMenu-messages__item">
            <p> {mes.title} </p>
            <span> de <span>{mes.author}</span> le <time> {mes.createdAt.replace('T', ' à ').replace('Z', '').substring(0, 21).replace('-', ' ')}  </time>  </span>
          </div>)
        }
      </div>
      <form onSubmit={handleSubmit}>
        <TextArea placeholder="150 caractères max" value={message} onChange={handleChange} />
        <Button content="Envoyer" primary icon="send" />
      </form>
    </div>
  );
};
