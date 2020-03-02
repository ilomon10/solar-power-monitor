import React from 'react';
import { NavLink as RNavLink } from 'react-router-dom';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Menu as BPMenu, Classes, Icon, Colors } from '@blueprintjs/core';
import { Box, Flex } from './layout';

const NavLink = styled(RNavLink)`
  && {
    ${space}
  }
  border-left: 8px solid ${Colors.LIGHT_GRAY3};
  &.${Classes.ACTIVE} {
    background-color: transparent;
  }
  &:hover {
    background-color: ${Colors.GRAY4}4d;
    border-left-color: ${Colors.GRAY4};
  }
  &.${Classes.ACTIVE} {
    cursor: auto;
    border-left-color: ${Colors.FOREST3};
  }
`

const MenuItem = ({
  to, exact,
  text, icon
}) => {
  return (
    <li>
      <NavLink exact={exact} px="16px" to={to} className={`${Classes.MENU_ITEM}`} activeClassName={Classes.ACTIVE}>
        <Icon icon={icon} />
        <div className={`${Classes.FILL} ${Classes.TEXT_OVERFLOW_ELLIPSIS}`}>{text}</div>
      </NavLink>
    </li>
  )
}

const Menu = styled(BPMenu)`
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
`

export default () => {
  return (
    <Box py={3}>
      <Flex height="100%" flexDirection="column" justifyContent="center">
        <Menu large>
          <MenuItem exact to="/" icon="circle" text="Overview" />
          <MenuItem to="/statistic" icon="chart" text="Statistic" />
          <MenuItem to="/logger" icon="th" text="Logger" />
        </Menu>
      </Flex>
    </Box>
  )
}