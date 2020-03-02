import React from 'react';
import Table from '../components/Table';

export default () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Table data={data} />
  )
}