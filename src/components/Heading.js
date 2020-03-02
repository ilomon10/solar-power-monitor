import React from 'react';
import styled from 'styled-components';
import { Text, Flex } from './layout';
import { space } from 'styled-system';
import { Colors } from '@blueprintjs/core';

const Heading = ({ className, text, textInfo, textRight }) => (
  <Flex className={className} width={1} mb={3}>
    <Flex flexGrow={1} alignItems="baseline">
      <Text as="div" fontSize={2} color={Colors.GRAY1}>
        <Text fontWeight="bold">{text}</Text>
        {textInfo &&
          <Text ml={1} color={Colors.GRAY4}>{textInfo}</Text>}
      </Text>
    </Flex>
    {textRight &&
      <Flex flexShrink={0}>
        {textRight}
      </Flex>}
  </Flex >
)

export default styled(Heading)`
  ${space}
`;