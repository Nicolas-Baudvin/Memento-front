import React, { useState, useEffect } from 'react';
import { TextArea, Button, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

// Actions
import { sendMessage } from '../../../../store/Socket/actions';
import { findMessages } from '../../../../store/Chat/actions';

export default () => {
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
          messages.map((mes) => <div key={mes._id} className={cx("sideActionMenu-chat-messages__item", { right: mes.author === username})}>
            <p> {mes.title} </p>
            <div className="sideActionMenu-chat-messages__item--from"> de <span>{mes.author}</span> le <time> {mes.createdAt.replace('T', ' à ').replace('Z', '').substring(0, 21).replace('-', ' ')}  </time>  </div>
          </div>)
        }
      </div>
      <form onSubmit={handleSubmit}>
        <TextArea placeholder="150 caractères max" value={message} onChange={handleChange} />
        <Button content="Envoyer" primary icon="send" />
      </form>
    </div>
  </>
  );
};
