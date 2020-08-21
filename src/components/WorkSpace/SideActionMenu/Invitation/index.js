import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Typography,
  TextField,
  InputAdornment,
  Button
} from '@material-ui/core';
import { useSelector } from "react-redux";
import Axios from "axios";

import SearchIcon from '@material-ui/icons/Search';

import Users from './Users';
import { decryptUserData } from "../../../../Utils/crypt";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    width: '100%',
    padding: '.5em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto'
  },
  title: {
    fontSize: '1.5em',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  submit: {
    margin: '1em 0',
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
    color: "#fff",
    '&:hover': {
      backgroundColor: (props) => (props.theme ? props.theme.hovered : "#6e00c8")
    },
    width: '200px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.5em 1em',
    margin: '.5em 0'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    margin: '0',
    padding: '0'
  },
  avatar: {
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
  },
  icon: {
    color: (props) => (props.theme ? props.theme.color : "#6e00c8")
  },
  img: {
    height: '25px'
  },
  close: {
    color: '#ff0000',
    fontWeight: 'bold'
  },
  offline: {
    cursor: 'unset',
    textDecoration: 'line-through',
    backgroundColor: '#aaa',
    '&:hover': {
      cursor: 'unset',
      textDecoration: 'line-through',
      backgroundColor: '#aaa',
    }
  },
  online: {},
  username: {
    marginLeft: '1em'
  }
}));

export default () => {
  const {
    mytheme,
    userID,
    token,
    username,
    socketID
  } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme, isOnline: Boolean(socketID) });
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFetch, setFetch] = useState(false);

  const handleChange = (e) => {
    if (!e.target.value || e.target.value.length > 30) {
      setError("Un pseudo fait entre 1 et 30 caractères");
    }
    else {
      setError('');
    }
    if (!e.target.value) {
      setUsers([]);
    }
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || value.length > 30) return setError("Un pseudo fait entre 1 et 30 caractères");
    setLoading(true);
    const res = await Axios({
      method: 'post',
      url: `${process.env.API_URL}auth/user/find`,
      data: {
        userID,
        friendName: value.toLowerCase()
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = decryptUserData(res.data.users);

    if (result.length === 0) {
      setFetch(true);
    }

    if (!value.length) {
      setError("Vous devez au moins écrire 1 caractère pour la recherche");
    }

    setUsers(result);
    return setLoading(false);
  };

  return (
    <Container className={classes.container}>
      <Typography className={classes.title}> Inviter un ami </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            )
          }}
          error={Boolean(error)}
          helperText={error}
          value={value}
          onChange={handleChange}
          label="Pseudo de votre ami"
        />
        <Button className={classes.submit} variant="contained" type="submit">
          {
            isLoading ? <img className={classes.img} src="/assets/spinner43px.svg" alt="chargement..." /> : "Rechercher"
          }
        </Button>
      </form>
      {
        users && users.length > 0
        && users.map((user) => user.username !== username && <Users key={user._id} classes={classes} user={user} />)
      }
      {
        value && isFetch && users.length === 0
        && <Typography>Aucun ami trouvé avec le pseudo {value}</Typography>
      }
    </Container>
  );
};
