import React from 'react';
import { Icon, Colors, Tag } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from '../components/layout';
import Heading from '../components/Heading';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import OverviewLoggerTable from './overview.logger-table';
import OverviewLoggerCounter from './overview.logger-counter';
import OverviewStatisticChart from './overview.statistic-chart';
import OverviewTrafficChart from './overview.traffic-chart';

export default () => {
  return (
    <Flex width='100%' py={3}
      justifyContent="center" alignItems="center">
      <Box px={3}
        maxHeight={748} maxWidth={1024}
        height="100%" width="100%">
        <Flex height='100%' flexDirection="column">
          <Flex height={`${1 / 3 * 100}%`}>
            <Flex width={1 / 3} px={2} alignItems="center">
              <Flex justifyContent="center">
                <Box mr={3} pt={2}>
                  <Icon icon="search-around" iconSize={50} />
                </Box>
                <Box>
                  <Text as="h1" m={0}>Monitoring<br />Panel Surya</Text>
                  <Text as="p" m={0} mt={2}>Banyak data yang sedang menunggu di analisa</Text>
                </Box>
              </Flex>
            </Flex>
            <Flex width={2 / 3} px={2} mb={4} flexDirection="column">
              <Flex flexShrink={0}>
                <Heading text="Traffic" textInfo="(data 24 jam terakhir)" />
              </Flex>
              <Flex flexGrow={1}>
                <Card bg={Colors.WHITE} width={1} p={0}>
                  <Wrapper>
                    <OverviewTrafficChart />
                  </Wrapper>
                </Card>
              </Flex>
            </Flex>
          </Flex>
          <Flex height={`${2 / 3 * 100}%`}>
            <Flex width={1 / 2} px={2} mb={3} flexDirection="column">
              <Flex flexShrink={0}>
                <Heading text="Logger" textInfo="(hari ini)" textRight={<Link to="/logger">Lihat selengkapnya</Link>} />
              </Flex>
              <Flex flexGrow={1} flexDirection="column">
                <Box mb={3} height={`50%`}>
                  <Card interactive overflow="hidden"
                    bg={Colors.WHITE} height={`100%`} >
                    <Wrapper style={{ overflowY: 'auto' }}>
                      <OverviewLoggerTable />
                    </Wrapper>
                  </Card>
                </Box>
                <Box height={`50%`}>
                  <Card bg={Colors.WHITE} height={`100%`} py={1}>
                    <OverviewLoggerCounter />
                  </Card>
                </Box>
              </Flex>
            </Flex>
            <Flex width={1 / 2} px={2} mb={3} flexDirection="column">
              <Flex flexShrink={0}>
                <Heading text="Statistic" textInfo={(<>
                  <span>(data dari perangkat</span> <Tag minimal>#3425</Tag><span> hari ini)</span>
                </>)} textRight={<Link to="/statistic">Lihat selengkapnya</Link>} />
              </Flex>
              <Flex flexGrow={1}>
                <Card bg={Colors.WHITE} width={1} p={0} interactive>
                  <Wrapper>
                    <OverviewStatisticChart />
                  </Wrapper>
                </Card>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}