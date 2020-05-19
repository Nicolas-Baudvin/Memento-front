import React from "react";
import { Button, Confirm } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../store/Registration/actions";

export default ({ state, setstate, closeConfirm }) => {
  const dispatch = useDispatch();
  return (
    <div className="settings-body-data">
      <Button
        onClick={() => setstate({ ...state, openConfirm: true })}
        className="settings-body-data-submit"
        content="Supprimer"
        color="red"
        icon="checkmark"
      />
      <Confirm
        open={state.openConfirm}
        onCancel={closeConfirm}
        onConfirm={() => dispatch(deleteAccount())}
        content="Vous êtes sur le point de supprimer votre compte et toutes les activités en cours qui y sont associées. En êtes vous sûr ?"
      />
    </div>
  );
};
