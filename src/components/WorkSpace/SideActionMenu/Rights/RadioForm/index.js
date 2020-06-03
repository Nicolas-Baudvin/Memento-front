import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { changeCurrentRole } from '../../../../../store/Socket/actions';

export default ({ guest, currentSocket, isOp }) => {
  const dispatch = useDispatch();
  const ChangeCurrentRole = () => dispatch(changeCurrentRole(guest, !isOp));
  return (
    <Form>
      <Form.Field>
        <Radio label="Invité" name="radio" value="guest" checked={!isOp} onChange={ChangeCurrentRole} />
      </Form.Field>
      <Form.Field>
        <Radio label="Opérateur" name="radio" value="operator" checked={isOp} onChange={ChangeCurrentRole} />
      </Form.Field>
    </Form>
  );
};
