import React, { useState, useContext, useCallback } from 'react';
import { Dialog, Classes, FormGroup, InputGroup, Button, Callout } from '@blueprintjs/core';
import { FirebaseContext } from '../components/Firebase';
import { Box } from '../components/layout';
import Toaster from '../components/Toaster';

export default ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const firebase = useContext(FirebaseContext);
  const onCloseHandler = useCallback((e) => {
    onClose(e);
    setLocation('');
  }, [onClose]);
  const send = useCallback(() => {
    if (!location) {
      Toaster.show({message: 'Failed to save `location` is empty'});
      return;
    }
    setLoading(true);
    firebase.doAddDevice(location)
      .then(() => {
        setLoading(false);
        setLocation('');
        onCloseHandler();
      })
      .catch((error) => {
        setErrMessage(error.message);
        setLoading(false);
      });
  }, [location, firebase, onCloseHandler]);
  return (
    <Dialog isOpen={isOpen} onClose={onCloseHandler}>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label="Location" labelInfo="(required)"
          helperText="Fill this form with location of your device.">
          <InputGroup type="text" onChange={e => { setLocation(e.target.value) }} value={location} />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button minimal intent="danger" text="Discard" onClick={onCloseHandler} />
          <Button intent="primary" text="Save" onClick={send} loading={loading} />
        </div>
      </div>
      {errMessage &&
        <Box mt={2}>
          <Callout intent="warning">
            {errMessage}
          </Callout>
        </Box>}
    </Dialog>
  )
}