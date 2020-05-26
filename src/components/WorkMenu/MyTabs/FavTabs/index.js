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

  useEffect(() => {
    dispatch(myFavs());
  }, []);

  useEffect(() => {
    if (favsTabs) getPic();
    if (favs && !favsTabs) {
      console.log(favs);
      dispatch(myFavstabs());
    }
  }, [favsTabs, favs]);

  return <>
    <h2 className="workmenu-body-tabs-title black">
      Tableaux favoris
    </h2>
    <div className="workmenu-tabs">
      {
        favsTabs && favsTabs.map((item) => <div key={item._id} className="workmenu-tabs-item">
          <img onClick={() => openThisTab(item._id)} className="workmenu-tabs-item-img" src={state[item._id]} alt="bg" />
          <h2 onClick={() => openThisTab(item._id)} className="workmenu-tabs-item-title"> {item.name} </h2>
        </div>)
      }
    </div>
  </>;
};
