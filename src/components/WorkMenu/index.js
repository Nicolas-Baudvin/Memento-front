import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';

// Actions
import { myTabs } from "../../store/Tabs/actions";
import { cleanLists } from "../../store/Lists/actions";
import { disconnectFromChannel, connectToSocket } from "../../store/Socket/actions";

// Components
import Header from '../Header';
import MyTabs from './MyTabs';
import LoadPage from '../LoadPage';

export default () => {
  const dispatch = useDispatch();
  const initialState = {
    view: 'Tabs',
    isOpen: false,
    tabName: '',
    imgSelected: false,
    imgPath: false,
    tabNameError: ''
  };
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const [state, setstate] = useState(initialState);
  const [isLoading, setLoading] = useState(true);

  const handleOpen = () => setstate({ ...state, isOpen: true });

  useEffect(() => {
    dispatch(disconnectFromChannel());
    dispatch(cleanLists());
    dispatch(myTabs());
    dispatch(connectToSocket());
  }, []);

  const onLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Memento - Vos Tableaux</title>
      </Helmet>

      <div onLoad={onLoad} className="workmenu">
        {
          isLoading && <LoadPage active={isLoading} />
        }
        <Header handleOpen={handleOpen} />
        <main className="workmenu-body">
          <MyTabs tabs={tabs} state={state} setstate={setstate} handleOpen={handleOpen} />
        </main>
      </div>
    </>
  );
};
