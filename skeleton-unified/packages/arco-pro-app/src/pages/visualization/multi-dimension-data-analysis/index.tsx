import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, Space } from '@arco-design/web-react';
import axios from 'axios';
import useLocale from '@/utils/useLocale';
import HorizontalInterval from '@/components/Chart/horizontal-interval';
import AreaPolar from '@/components/Chart/area-polar';
import FactMultiPie from '@/components/Chart/fact-multi-pie';
import locale from './locale';
import DataOverview from './data-overview';
import CardList from './card-list';

import './mock';
import { Skeleton } from '@skeleton/renderer-react'
import arcoDataOverviewBones from './../../../bones/arco-data-overview.bones.json'
import arcoStatCard0Bones from './../../../bones/arco-stat-card-0.bones.json'
import arcoStatCard1Bones from './../../../bones/arco-stat-card-1.bones.json'
import arcoStatCard2Bones from './../../../bones/arco-stat-card-2.bones.json'
import arcoStatCard3Bones from './../../../bones/arco-stat-card-3.bones.json'
import arcoTodayActivityBones from './../../../bones/arco-today-activity.bones.json'
import arcoContentThemeBones from './../../../bones/arco-content-theme.bones.json'
import arcoChartCardUserRetentionTrendsBones from './../../../bones/arco-chart-card-User retention trends.bones.json'
import arcoChartCardUserRetentionBones from './../../../bones/arco-chart-card-User retention.bones.json'
import arcoChartCardContentConsumptionTrendsBones from './../../../bones/arco-chart-card-Content consumption trends.bones.json'
import arcoChartCardContentConsumptionBones from './../../../bones/arco-chart-card-Content consumption.bones.json'
import arcoContentSourceBones from './../../../bones/arco-content-source.bones.json'

const { Row, Col } = Grid;
const { Title } = Typography;

function DataAnalysis() {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState([]);
  const [polarLoading, setPolarLoading] = useState(false);
  const [polar, setPolar] = useState({ list: [], fields: [] });
  const [multiPieLoading, setMultiPieLoading] = useState(false);
  const [multiPie, setMultiPie] = useState([]);

  const getInterval = async () => {
    setLoading(true);
    const { data } = await axios
      .get('/api/multi-dimension/activity')
      .finally(() => {
        setLoading(false);
      });
    setInterval(data);
  };

  const getPolar = async () => {
    setPolarLoading(true);
    const { data } = await axios
      .get('/api/multi-dimension/polar')
      .finally(() => setPolarLoading(false));

    setPolar(data);
  };

  const getMultiPie = async () => {
    setMultiPieLoading(true);
    const { data } = await axios
      .get('/api/multi-dimension/content-source')
      .finally(() => {
        setMultiPieLoading(false);
      });

    setMultiPie(data);
  };

  useEffect(() => {
    getInterval();
    getPolar();
    getMultiPie();
  }, []);

  // TODO: wrap with <Skeleton loading={loading} bones={arcoDataOverviewBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoStatCard0Bones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoStatCard1Bones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoStatCard2Bones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoStatCard3Bones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoTodayActivityBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoContentThemeBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoChartCardUserRetentionTrendsBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoChartCardUserRetentionBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoChartCardContentConsumptionTrendsBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoChartCardContentConsumptionBones} animation="shimmer">

  // TODO: wrap with <Skeleton loading={loading} bones={arcoContentSourceBones} animation="shimmer">

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={20}>
        <Col span={16}>
          {/* data-ske-name 标记：Overview 数据总览大卡片 */}
          <Card data-ske-name="arco-data-overview">
            <Title heading={6}>
              {t['multiDAnalysis.card.title.dataOverview']}
            </Title>
            <DataOverview />
          </Card>
        </Col>
        <Col span={8}>
          {/* data-ske-name 标记：今日活动图表卡片 */}
          <Card data-ske-name="arco-today-activity">
            <Title heading={6}>
              {t['multiDAnalysis.card.title.todayActivity']}
            </Title>
            <HorizontalInterval
              data={interval}
              loading={loading}
              height={160}
            />
          </Card>
          {/* data-ske-name 标记：内容主题分布图卡片 */}
          <Card data-ske-name="arco-content-theme">
            <Title heading={6}>
              {t['multiDAnalysis.card.title.contentTheme']}
            </Title>
            <AreaPolar
              data={polar.list}
              fields={polar.fields}
              height={197}
              loading={polarLoading}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {/* data-ske-name 已由 CardBlock 组件内部标记 */}
          <CardList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {/* data-ske-name 标记：内容来源环形图 */}
          <Card data-ske-name="arco-content-source">
            <Title heading={6}>
              {t['multiDAnalysis.card.title.contentSource']}
            </Title>
            <FactMultiPie
              loading={multiPieLoading}
              data={multiPie}
              height={240}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
export default DataAnalysis;