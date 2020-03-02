import React from 'react';
import Card from '../components/Card';
import Table from '../components/Table';

export default () => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i + 1);
  }
  return (
    <Card height="100%" width={1} p={0} style={{ overflowY: 'auto' }}>
      <Table data={data} />
    </Card>
  )
}