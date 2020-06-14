import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Utils
import loadPic from '../../Utils/loadPic';

// Actions

// Components
import Nav from './Nav';
import Title from './Title';

export default ({ isPublic }) => {
  const { pathname } = useLocation();

  const initialState = {
    show: false,
    open: false,
    content: '',
    logo: '',
    isOpen: false
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
    <header className="workmenu-header" style={pathname === "/vos-tableaux/" || pathname === "/vos-tableaux" ? { backgroundColor: "#2D94CF" } : {}}>
      <Title state={state} />
      <Nav state={state} setstate={setstate} isPublic={isPublic} />
    </header>
  );
};
