import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Button, Input, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import loadPic from '../../../../Utils/loadPic';
import { updateTabPic, updateTabName } from '../../../../store/Tabs/actions';
import { failMessage } from '../../../../store/Popup/actions';

const About = ({ currentTab, isInvited }) => {
  const dispatch = useDispatch();
  const picsPath = [
    { path: "/assets/tab-bg1.jpg", isSelected: false, key: 1 },
    { path: "/assets/tab-bg2.jpg", isSelected: false, key: 2 },
    { path: "/assets/tab-bg3.jpg", isSelected: false, key: 3 },
    { path: "/assets/tab-bg4.jpg", isSelected: false, key: 4 },
    { path: "/assets/tab-bg5.jpg", isSelected: false, key: 5 },
    { path: "/assets/tab-bg6.jpg", isSelected: false, key: 6 },
    { path: "/assets/tab-bg7.jpg", isSelected: false, key: 7 },
  ];

  const initialState = {
    pic: '',
    nameValue: '',
    newPic: '',
    pics: picsPath,
    picSelected: ''
  };


  const [state, setstate] = useState(initialState);

  const getBg = async () => {
    try
    {
      const img = await loadPic(currentTab.imgPath);
      setstate({ ...state, pic: img });
    }
    catch (e)
    {
      console.log(e);
      setstate({ ...state, pic: false });
    }
  };

  const handleSubmitNewName = (e) => {
    e.preventDefault();
    if (state.nameValue) return dispatch(updateTabName({ name: state.nameValue, tabId: currentTab._id }));
    return dispatch(failMessage("Vous devez choisir une image"));
  };

  const handleClickChoosePic = (imgPath) => (e) => {
    console.log(imgPath);
    const newArray = picsPath.map((picture) => {
      if (picture.path === imgPath)
      {
        picture.isSelected = true;
        return picture;
      }
      picture.isSelected = false;
      return picture;
    });

    setstate({ ...state, picSelected: imgPath, pics: newArray });
  };

  const handleClickNewPic = () => {
    if (state.picSelected) return dispatch(updateTabPic({ imgPath: state.picSelected, tabId: currentTab._id }));
    return dispatch(failMessage("Le champs doit être rempli"));
  };

  useEffect(() => {
    getBg();
  }, []);


  return (<>
    <h3 className="sideActionMenu-subTitle">À propos</h3>
    <Divider />
    <div className="sideActionMenu-about">
      <h3 className="sideActionMenu-about-title"><span>{currentTab.name}</span> </h3>
      {
        state.pic && <img className="sideActionMenu-about-bg" src={state.pic} alt="bg" />
      }
      {
        !isInvited && <>
          <form className="sideActionMenu-about-form" onSubmit={handleSubmitNewName} action="">
            <Input value={state.nameValue} onChange={(e) => setstate({ ...state, nameValue: e.target.value })} placeholder="Nouveau nom du tableau" />
            <Button icon="edit" primary content="Changer le nom du tableau" />
          </form>
          <Divider />
          <div className="sideActionMenu-about-pics">
            {
              state.pics.map((picture) => <div key={picture.key} onClick={handleClickChoosePic(picture.path)} className="sideActionMenu-about-pics__item">
                <img className={cx("sideActionMenu-about-pics__item--img", { focused: picture.isSelected })} src={picture.path} alt="bg" />
              </div>)
            }
          </div>
          <Button onClick={handleClickNewPic} icon="picture" primary content="Changer l'image du tableau" />
        </>
      }
    </div>
  </>
  );
};

About.propTypes = {
  currentTab: PropTypes.object.isRequired,
  isInvited: PropTypes.bool.isRequired
};

export default About;
