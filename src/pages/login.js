import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { layout, space, typography, color, border } from 'styled-system';
import { Colors, InputGroup, FormGroup, Button } from '@blueprintjs/core';
import PageWrapper from '../components/PageWrapper';

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
  const sendHandle = () => {
    history.push('/');
  }
  return (
    <PageWrapper>
      <Box>
        <Text as="h2" m={0} pt={4} pb={3} textAlign="center">Monitoring<br />Panel Surya</Text>
        <Box width={340} mx="auto" px={3}>
          <Text as="h1" m="0" mb={3} textAlign="center" fontWeight="lighter">Silahkan masuk</Text>
          <Box p={3} bg={Colors.WHITE} border={`1px solid ${Colors.GRAY5}`} borderRadius={4}>
            <FormGroup label="Username or email address"
              labelFor="field-username">
              <InputGroup id="field-username"
                type="text" name="username" large />
            </FormGroup>
            <FormGroup label="Password"
              labelFor="field-password">
              <InputGroup id="field-password"
                type="password" name="password" large />
            </FormGroup>
            <Button text="Masuk" type='submit' fill intent="success" large onClick={sendHandle} />
          </Box>
          <Box p={3} mt={4} border={`1px solid ${Colors.GRAY5}`} borderRadius={4}>
            <Text textAlign="center">Tidak bisa masuk? <a href="mailto:ilomon10@gmail.com" target="_top">Tanya admin</a>.</Text>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}