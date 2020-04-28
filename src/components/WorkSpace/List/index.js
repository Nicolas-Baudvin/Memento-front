import React, { useEffect } from "react";
import { Input, TextArea, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";

// Components
import Tasks from '../Tasks';

// Actions
import { myTasks, newTask } from "../../../store/Tasks/actions";

// Styles
import './style.scss';

export default ({ lists, isInvited }) => {
  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
  const dispatch = useDispatch();

  const handleUpdateListName = (e) => {
    const input = e.target.parentNode;
    const list = e.target.parentNode.previousSibling;

    input.classList.remove("show");
    list.classList.add("show");
    // Mise à jour du titre
  };

  const addTaskToList = (listId) => (e) => {
    e.preventDefault();
    const title = e.target.querySelector('textarea').value;
    dispatch(newTask({ listId, title }));
  };

  const showTitleInput = (e) => {
    const title = e.target;
    title.classList.remove("show");
    title.nextSibling.classList.add("show");
  };

  useEffect(() => {
    if (!isInvited) {
      lists.forEach((list) => {
        dispatch(myTasks(list._id));
      });
    }
  }, []);

  return (
    <div className="workspace-body-lists">
      {
        lists.length > 0 && lists.map((list) => <div key={list._id} data-order={list.order} className="list">
          <div className="list-header">
            <h2 onClick={showTitleInput} className="list-header-title show"> {list.name} </h2>
            <Input
              className="list-header-input"
              placeholder="Nom de la liste"
              action={{ content: 'Envoyer', color: 'blue', onClick: handleUpdateListName }}
            />
          </div>
          <div className="list-tasks">
            {
              tasks.length > 0 && <Tasks tasks={tasks} listId={list._id} />
            }
            <form onSubmit={addTaskToList(list._id)} className="list-tasks-input">
              <TextArea placeholder="Votre tâche ..." />
              <Button content="Nouvelle tâche" primary icon="add" />
            </form>
          </div>
        </div>)
      }
    </div>
  );
};
