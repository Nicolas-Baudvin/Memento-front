import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';
import "./style.scss";
import { useDispatch } from "react-redux";

// Actions
import { myTabs } from "../../store/Tabs/actions";


// Components
import Header from '../Header';
import MyTabs from './MyTabs';
import { cleanLists } from "../../store/Lists/actions";
import { disconnectFromChannel } from "../../store/Socket/actions";

export default () => {
  const dispatch = useDispatch();
  const initialState = {
    view: 'Tabs',
    isOpen: false,
    tabName: '',
    imgSelected: false,
    imgPath: false
  };
  const [state, setstate] = useState(initialState);

  const handleOpen = () => setstate({ ...state, isOpen: true });

  useEffect(() => {
    dispatch(disconnectFromChannel());
    dispatch(cleanLists());
    dispatch(myTabs());
  }, []);

  return (
    <div className="workmenu">
      <Header handleOpen={handleOpen} />
      <main className="workmenu-body">
        <div className="workmenu-body-menu">
          <Button
            onClick={() => setstate({ ...state, view: "Tabs" })}
            basic
            icon="table"
            content="Vos tableaux"
          />
        </div>
        {
          state.view === "Tabs" && <MyTabs state={state} setstate={setstate} handleOpen={handleOpen} />
        }
      </main>
    </div>
  );
};
