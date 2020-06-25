import React from "react";
import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../../store/Registration/actions";

export default ({ state, setstate }) => {
  const dispatch = useDispatch();
  return (
    <div className="settings-body-data">
      <Button
        onClick={() => setstate({ ...state, openConfirm: true })}
        color="secondary"
        variant="contained"
      >
        Supprimer le compte
      </Button>
    </div>
  );
};
