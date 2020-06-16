import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';

// Actions
import { myTabs } from "../../store/Tabs/actions";
import { cleanLists } from "../../store/Lists/actions";
import { disconnectFromChannel } from "../../store/Socket/actions";

// Components
import Header from '../Header';
import MyTabs from './MyTabs';
import Footer from '../Footer';

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

  const handleOpen = () => setstate({ ...state, isOpen: true });

  useEffect(() => {
    dispatch(disconnectFromChannel());
    dispatch(cleanLists());
    dispatch(myTabs());
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Memento - Vos Tableaux</title>
      </Helmet>
      <div className="workmenu">
        <Header handleOpen={handleOpen} />
        <main className="workmenu-body">
          <MyTabs tabs={tabs} state={state} setstate={setstate} handleOpen={handleOpen} />
        </main>
      </div>
      <Footer />
    </>
  );
};
