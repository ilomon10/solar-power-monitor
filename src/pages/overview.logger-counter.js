import React from 'react';
import { Text } from '../components/layout';
import styled from 'styled-components';
import { layout } from 'styled-system';
import { Colors, Tag } from '@blueprintjs/core';

const Table = styled.table`
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  & tr {
    border-bottom: 1px solid ${Colors.LIGHT_GRAY2};
    &:last-child {
      border-bottom: none;
    }
  }
`

const TD = styled.td`
  ${layout};
  padding: 11px;
  && {
    vertical-align: middle;
  }
`

export default () => {
  const rows = [
    [1230, "Total data", [true, 3]],
    [28, "Data per hari", [false, 2.5]],
    [34, "Data hari ini", [true, 1]]
  ].map((v, i) => (
    <tr key={i}>
      <TD>
        <Text fontSize={5}>{v[0]}</Text>
      </TD>
      <TD width={1}>
        <Text fontSize={2} fontWeight="bold">{v[1]}</Text>
      </TD>
      <TD>
        <Tag icon={v[2][0] ? "caret-up" : "caret-down"} intent={v[2][0] ? "success" : "warning"}>{(v[2][1]).toFixed(2)}</Tag>
      </TD>
    </tr>
  ))
  return (
    <Table>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
}