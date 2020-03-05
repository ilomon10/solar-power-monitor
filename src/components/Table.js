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

export default ({ interactive, condensed, column, head, ...props }) => {
  const tHead = head.map((row, i) => (
    <tr key={i}>
      {row.map(({ title, col = 1, row = 1 }, i) =>
        (<th key={i} colSpan={col} rowSpan={row}>{title}</th>)
      )}
    </tr>
  ))
  const data = props.data.map((v) => (
    <tr key={v['uid']}>
      {column.map((c) => (
        <td key={`${v['uid']}_${c}`}>{v[c]}</td>
      ))}
    </tr>
  ))
  return (
    <Table interactive condensed>
      <thead>
        {tHead}
      </thead>
      <tbody>
        {data}
      </tbody>
    </Table>
  )
}