import React from "react";
import {
  Modal, Button, TextField, Typography, makeStyles
} from '@material-ui/core';
import cx from 'classnames';
import { useDispatch } from "react-redux";

// styles
import "./style.scss";

// Actions
import { newTab } from "../../store/Tabs/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'max-content',
    height: 'max-content',
    margin: '5em auto',
    boxShadow: theme.shadows[5],
    zIndex: '1000',
    borderRadius: '5px 5px 5px 5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  button: {
    margin: '1em',
    width: '150px'
  },
  title: {
    fontSize: '2em',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white',
    borderRadius: '5px 5px 0 0',
  }
}));

export default ({
  state, handleClickImg, setstate
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imgs = [
    "/assets/tab-bg1.webp",
    "/assets/tab-bg2.webp",
    "/assets/tab-bg3.webp",
    "/assets/tab-bg4.webp",
    "/assets/tab-bg5.webp",
    "/assets/tab-bg6.webp",
    "/assets/tab-bg7.webp",
  ];

  const handleClose = () => setstate({ ...state, isOpen: false });

  const handleOpen = () => setstate({ ...state, isOpen: true });

  const handleChangeTabName = (e) => setstate({ ...state, tabName: e.target.value });

  const handleSubmitNewTab = () => {
    const { tabName, imgSelected, imgPath } = state;

    if (!imgSelected || !imgPath) {
      return setstate({ ...state, error: "Vous devez selectionner une image de fond pour continuer" });
    }
    if (!tabName) {
      return setstate({ ...state, tabNameError: "Vous devez choisir un nom pour votre tableau" });
    }
    handleClose();
    setstate({ ...state, tabNameError: '', error: '' });
    return dispatch(newTab({ imgPath, tabName, num: imgSelected }));
  };

  const body = (<>
    <div className="modal-header">
      <Typography className={classes.title}>Créer un tableau</Typography>
    </div>
    <div className="modal-content">
      <TextField error={state.tabNameError.length > 0} helperText={state.tabNameError || ' '} variant="outlined" label="Nom du tableau" value={state.tabName} onChange={handleChangeTabName} />
      <h3>Choississez une image de fond</h3>
      <ul className="modal-list">
        {
          imgs.map((path, i) => (
            <li
              onClick={() => handleClickImg(i + 1, path)}
              className={cx("modal-list__item", { "img-selected": state.imgSelected === i + 1 })}
              key={path}
            >
              <img className="modal-img" src={path} alt={`background ${i}`} />
            </li>
          ))
        }

      </ul>
      {
        state.error && <p className="modal-error">{state.error}</p>
      }
    </div>
    <div className="modal-actions">
      <Button className={classes.button} color="secondary" variant="contained" onClick={handleClose}>
        Retour
      </Button>
      <Button className={classes.button} color="primary" onClick={handleSubmitNewTab} variant="contained">
        Créer
      </Button>
    </div>
  </>)

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Créer un tableau
      </Button>
      <Modal
        open={state.isOpen}
        onClose={handleClose}
        className={classes.paper}
        aria-labelledby="Créer un tableau"
        aria-describedby="Modale création de tableau"
        onEscapeKeyDown={handleClose}
      >
        {body}
      </Modal>
    </>
  );
};
