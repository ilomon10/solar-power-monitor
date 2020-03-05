import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Classes } from '@blueprintjs/core';
import { Box, Text } from '../components/layout';
import Card from '../components/Card';
import { FirebaseContext } from '../components/Firebase';
import AddDevice from './AddDevice';

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
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    const prom = firebase.devices().on('value', function (snap) {
      const value = snap.val();
      if (!value) return;
      const arr = Object.keys(snap.val()).map((k) => {
        return { ...value[k], uid: k };
      });
      setData(arr);
    })
    return () => {
      firebase.device().off('value', prom);
    }
  }, [firebase]);
  const devices = data.map((v) => (
    <MenuItem key={v.uid} text={`${v.uid}`} label={`${Math.floor(v.produce)} Wh`} to={`${path}${v.uid}`} />
  ))
  return (
    <Box width="100%" pb={3}>
      <Card px={1} height="100%" overflowY="auto">
        <Menu>
          <Menu.Item icon="add" text="Add new device" onClick={() => setIsDialogOpen(true)} />
          <Menu.Divider title="Devices" />
          {devices}
        </Menu>
      </Card>
      <AddDevice isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box >
  )
}