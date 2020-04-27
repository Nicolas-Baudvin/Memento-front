import React, { useState } from "react";
import cx from "classnames";
import { Input, TextArea, Button } from 'semantic-ui-react';

import './style.scss';

export default ({ lists }) => {
  const initialState = {
    showInput: false,
    titleValue: '',
    taskInputValue: ''
  };
  const [state, setstate] = useState(initialState);

  const handleUpdateListName = (e) => {
    const input = e.target.parentNode;
    const list = e.target.parentNode.previousSibling;

    input.classList.remove("show");
    list.classList.add("show");
    // Mise à jour du titre
  };

  const addTaskToList = (e) => {
    e.preventDefault();
    const taskValue = e.target.querySelector('textarea').value;
  };

  const shownTitleInput = (e) => {
    const title = e.target;
    console.log(title);
    title.classList.remove("show");
    title.nextSibling.classList.add("show");

    //setstate({ ...state, showInput: true })
  }

  return (
    <div className="workspace-body-lists">
      {
        lists.length > 0 && lists.map((list) => <div key={list._id} data-order={list.order} className="list">
          <div className="list-header">
            <h2 onClick={shownTitleInput} className={cx("list-header-title", { show: !state.showInput })}> {list.name} </h2>
            <Input
              value={state.titleValue}
              onChange={(e) => setstate({ ...state, titleValue: e.target.value })}
              className={cx("list-header-input", { show: state.showInput })}
              placeholder="Nom de la liste"
              action={{ content: 'Envoyer', color: 'blue', onClick: handleUpdateListName }}
            />
          </div>
          <div className="list-tasks">
            <form onSubmit={addTaskToList} className="list-tasks-input">
              <TextArea placeholder="Votre tâche ..." />
              <Button content="Nouvelle tâche" primary icon="add" />
            </form>
          </div>
        </div>)
      }
    </div>
  );
};
