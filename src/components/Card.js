import React from 'react';
import styled from 'styled-components';
import { space, color, layout } from 'styled-system';
import { Card as BPCard } from '@blueprintjs/core';

const Card = ({ className, children, style, elevation, interactive, onClick }) => (
  <BPCard className={className} elevation={elevation} style={style}
    interactive={interactive} onClick={onClick}>{children}</BPCard>
)

export default styled(Card)`
  position: relative;
  padding: 16px;
  ${space};
  ${color};
  ${layout}
`