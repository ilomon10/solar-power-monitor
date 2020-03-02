import styled from 'styled-components';
import { layout, space, color, border, typography, flexbox } from 'styled-system';

export const Box = styled.div`
  ${layout}
  ${space}
  ${color}
  ${border}
`
export const Text = styled.span`
  ${typography}
  ${space}
  ${color}
`

export const Flex = styled.div`
  display: flex;
  ${flexbox}
  ${layout}
  ${space}
`