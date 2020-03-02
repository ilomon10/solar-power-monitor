import React from 'react';
import styled from 'styled-components';
import { HTMLTable } from '@blueprintjs/core';

const Table = styled(HTMLTable)`
  width: 100%;
  border-collapse: collapse;
  th {
    position: sticky;
    top: 0;
    box-shadow: inset 0 -1px 0 0 rgba(16, 22, 26, 0.15);
    background-color: white;
  }
  &&& td {
    box-shadow: none;
  }
`

export default (props) => {
  const data = props.data.map((v) => (
    <tr key={v}>
      <td>{Math.floor(Math.random() * 9999)}</td>
      <td>{Math.floor(Math.random() * 99999999)}</td>
      <td>{(Math.random() * 12).toFixed(2)}</td>
      <td>{(Math.random() * 2).toFixed(2)}</td>
      <td>{(Math.random() * 40).toFixed(2)}</td>
    </tr>
  ))
  return (
    <Table>
      <thead>
        <tr>
          <th>device</th>
          <th>timestamp</th>
          <th>voltage</th>
          <th>current</th>
          <th>temperature</th>
        </tr>
      </thead>
      <tbody>
        {data}
      </tbody>
    </Table>
  )
}