import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import "./style.scss";

// Components
import Header from "../Header";

// Actions
import { newSocketTab } from "../../store/Socket/actions";

export default () => {
  const dispatch = useDispatch();
  const { socketsList } = useSelector((globalState) => globalState.sockets);
  const { id, name } = useParams();

  console.log(id);
  useEffect(() => {
    if (socketsList) {
      dispatch(newSocketTab({ id, name }));
    }
  }, []);

  return (
    <div data-tabid={id} className="workspace">
      <Header />
    </div>
  );
};
