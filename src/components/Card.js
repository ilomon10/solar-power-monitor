import styled from 'styled-components';
import {space, color, layout} from 'styled-system';
import { Card } from '@blueprintjs/core';

export default styled(Card)`
  position: relative;
  padding: 16px;
  ${space};
  ${color};
  ${layout}
`