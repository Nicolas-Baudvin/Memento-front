import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myFavs, myFavstabs } from '../../../../store/Favs/actions';
import loadPic from '../../../../Utils/loadPic';

export default ({ openThisTab }) => {
  const dispatch = useDispatch();
  const [state, setstate] = useState({});
  const { favs, favsTabs } = useSelector((GlobalState) => GlobalState.myfavs);

  const getPic = () => {
    favsTabs.forEach(async (tab) => {
      const pic = await loadPic(tab.imgPath);
      setstate({ ...state, [tab._id]: pic });
    });
  };

  const handleClickOpenTab = (item) => (e) => {
    const favClicked = favs.favTabs.filter((elem) => elem.tabId === item._id)[0];
    if (favClicked.isInvited) {
      window.location.href = `https://mymemento.fr/join/${favClicked.tabId}/${favClicked.invitationLink}/`;
    }
    else {
      openThisTab(favClicked.tabId);
    }
  };

  useEffect(() => {
    dispatch(myFavs());
  }, []);

  useEffect(() => {
    if (favs) {
      dispatch(myFavstabs());
    }
  }, [favs]);

  useEffect(() => {
    if (favsTabs) getPic();
  }, [favsTabs]);

  return <>
    <h2 className="workmenu-body-tabs-title black">
      Tableaux favoris
    </h2>
    <div className="workmenu-tabs">
      {
        favsTabs && favsTabs.map((item) => <div key={item._id} className="workmenu-tabs-item">
          <img onClick={handleClickOpenTab(item)} className="workmenu-tabs-item-img" src={state[item._id]} alt="bg" />
          <h2 onClick={handleClickOpenTab(item)} className="workmenu-tabs-item-title"> {item.name} </h2>
        </div>)
      }
    </div>
  </>;
};
