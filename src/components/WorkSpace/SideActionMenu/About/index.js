import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Button, TextField, Divider, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import loadPic from '../../../../Utils/loadPic';
import { updateTabPic, updateTabName } from '../../../../store/Tabs/actions';
import { failMessage } from '../../../../store/Popup/actions';

const useStyles = makeStyles(() => ({
  input: {
    margin: '1em 0',
  },
  button: {
    margin: '1em 0',
    backgroundColor: (props) => props.theme.color || "#6e00c8",
    '&:hover': {
      backgroundColor: (props) => props.theme.hovered
    }
  }
}));

const About = ({ currentTab, isInvited }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);

  const classes = useStyles({ theme: mytheme });
  const dispatch = useDispatch();
  const picsPath = [
    { path: "/assets/tab-bg1.webp", isSelected: false, key: 1 },
    { path: "/assets/tab-bg2.webp", isSelected: false, key: 2 },
    { path: "/assets/tab-bg3.webp", isSelected: false, key: 3 },
    { path: "/assets/tab-bg4.webp", isSelected: false, key: 4 },
    { path: "/assets/tab-bg5.webp", isSelected: false, key: 5 },
    { path: "/assets/tab-bg6.webp", isSelected: false, key: 6 },
    { path: "/assets/tab-bg7.webp", isSelected: false, key: 7 },
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
    try {
      const img = await loadPic(currentTab.imgPath);
      setstate({ ...state, pic: img });
    }
    catch (e) {
      setstate({ ...state, pic: false });
    }
  };

  const handleSubmitNewName = (e) => {
    e.preventDefault();
    if (state.nameValue) return dispatch(updateTabName({ name: state.nameValue, tabId: currentTab._id }));
    return dispatch(failMessage("Vous devez choisir une image"));
  };

  const handleClickChoosePic = (imgPath) => (e) => {
    const newArray = picsPath.map((picture) => {
      if (picture.path === imgPath) {
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
            <TextField className={classes.input} value={state.nameValue} onChange={(e) => setstate({ ...state, nameValue: e.target.value })} placeholder="Nouveau nom du tableau" />
            <Button className={classes.button} variant="contained" type="submit" color="primary">
              Changer le nom
            </Button>
          </form>
          <Divider variant="middle" />
          <div className="sideActionMenu-about-pics">
            {
              state.pics.map((picture) => <div key={picture.key} onClick={handleClickChoosePic(picture.path)} className="sideActionMenu-about-pics__item">
                <img className={cx("sideActionMenu-about-pics__item--img", { focused: picture.isSelected })} src={picture.path} alt="bg" />
              </div>)
            }
          </div>
          <Button className={classes.button} variant="contained" onClick={handleClickNewPic} color="primary">
            Changer l'image du tableau
          </Button>
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
