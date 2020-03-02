import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Classes } from '@blueprintjs/core';
import { Box, Text } from '../components/layout';
import Card from '../components/Card';

const MenuItem = ({
  to, exact,
  text, icon, label
}) => {
  return (
    <li>
      <NavLink exact={exact} px="16px" to={to} className={`${Classes.MENU_ITEM}`} activeClassName={Classes.ACTIVE}>
        <Icon icon={icon} />
        <div className={`${Classes.FILL} ${Classes.TEXT_OVERFLOW_ELLIPSIS}`}>{text}</div>
        {label &&
          <Text className={Classes.MENU_ITEM_LABEL}>{label}</Text>}
      </NavLink>
    </li>
  )
}

export default ({ path }) => {
  const devices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
    <MenuItem key={v} text={`#${v}`} label={`${Math.floor(Math.random() * 10)} Wh`} to={`${path}${v}`} />
  ))
  return (
    <Box width="100%" pb={3}>
      <Card px={1} height="100%" overflowY="auto">
        <Menu large>
          <Menu.Item icon="add" text="Add new device" />
          <Menu.Divider title="Devices" />
          {devices}
        </Menu>
      </Card>
    </Box >
  )
}