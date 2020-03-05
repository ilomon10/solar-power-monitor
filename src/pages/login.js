import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { layout, space, typography, color, border } from 'styled-system';
import { Colors, InputGroup, FormGroup, Button, Callout } from '@blueprintjs/core';
import PageWrapper from '../components/PageWrapper';
import { FirebaseContext } from '../components/Firebase';

const Box = styled.div`
  ${layout}
  ${space}
  ${color}
  ${border}
`
const Text = styled.div`
  ${typography}
  ${space}
`

export default () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const [fields, setFields] = useState({
    username: '',
    password: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const sendHandle = () => {
    setIsSending(true);
    firebase.doSignInWithEmailAndPassword(fields['username'], fields['password'])
      .then((e) => {
        setIsSending(false);
        history.push('/');
      }).catch((e) => {
        setErrorMessage(e.message);
        setIsSending(false);
      });
  }
  return (
    <PageWrapper>
      <Box>
        <Text as="h2" m={0} pt={4} pb={3} textAlign="center">Monitoring<br />Panel Surya</Text>
        <Box width={340} mx="auto" px={3}>
          <Text as="h1" m="0" mb={3} textAlign="center" fontWeight="lighter">Silahkan masuk</Text>
          <Box p={3} bg={Colors.WHITE} border={`1px solid ${Colors.GRAY5}`} borderRadius={4}>
            {errorMessage &&
              <Box mb={2}>
                <Callout intent="warning">
                  {errorMessage}
                </Callout>
              </Box>}
            <FormGroup label="Username or email address"
              labelFor="field-username">
              <InputGroup id="field-username"
                type="text" name="username" large
                onChange={e => setFields({ ...fields, username: e.target.value })}
                value={fields['username']} />
            </FormGroup>
            <FormGroup label="Password"
              labelFor="field-password">
              <InputGroup id="field-password"
                type="password" name="password" large
                onChange={e => setFields({ ...fields, password: e.target.value })}
                value={fields['password']} />
            </FormGroup>
            <Button text="Masuk" type='submit' fill intent="success" large
              loading={isSending}
              onClick={sendHandle} />
          </Box>
          <Box p={3} mt={4} border={`1px solid ${Colors.GRAY5}`} borderRadius={4}>
            <Text textAlign="center">Tidak bisa masuk? <a href="mailto:ilomon10@gmail.com" target="_top">Tanya admin</a>.</Text>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}