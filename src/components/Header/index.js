import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';
import { useSelector } from "react-redux";

import loadPic from '../../Utils/loadPic';

// Components
import Nav from './Nav';
import Title from './Title';

export default () => {
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const initialState = {
    show: false,
    open: false,
    content: '',
    logo: ''
  };
  const [state, setstate] = useState(initialState);

  const getLogo = async (url) => {
    try {
      const pic = await loadPic(url);
      setstate({ ...state, logo: pic });
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLogo("/assets/logo.png");
  }, []);

  return (
    <header className="workmenu-header">
      <Nav tabs={tabs} state={state} setstate={setstate} />
      <Title state={state} />
      <Button content="Menu" icon="bars" />
    </header>
  );
};
