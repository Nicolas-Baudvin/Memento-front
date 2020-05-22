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

  const handleOpen = () => {
    setstate({ ...state, isOpen: true });
  };

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
      <svg className="workmenu-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#2D94CF" d="M41,-40.1C54.3,-37.8,66.9,-25.9,65.6,-14.3C64.3,-2.8,49.2,8.4,39.3,19.9C29.3,31.3,24.6,42.9,13.2,55.3C1.8,67.6,-16.2,80.8,-24.7,74.7C-33.3,68.7,-32.5,43.5,-37.3,26C-42.1,8.5,-52.6,-1.3,-53.8,-12.2C-55.1,-23,-47.2,-34.9,-36.7,-37.7C-26.2,-40.4,-13.1,-34,0.4,-34.5C13.9,-35,27.8,-42.3,41,-40.1Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
};
