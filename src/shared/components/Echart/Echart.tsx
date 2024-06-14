import React from 'react';

import ReactECharts from 'echarts-for-react';

import {EchartProps} from './types';

import * as S from './styles';

const Echart: React.FC<EchartProps> = ({arialLabel, dataCustom}) => {
  const hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  // const days = [0, 1, 2, 3, 4, 5, 6];
  // eslint-disable-next-line max-len
  const data = dataCustom ?? [
    [0, 0, 5],
    [2, 0, 5],
  ];
  const option = {
    width: '800px',
    height: '800px',
    title: {
      text: 'Punch Card of Github',
    },
    legend: {
      data: ['Punch Card'],
      left: 'right',
    },
    polar: {},
    tooltip: {
      formatter(params: {value: (string | number)[]}) {
        return `Level ${params.value[0]} `;
      },
    },
    angleAxis: {
      type: 'category',
      data: hours,
      boundaryGap: false,
      splitLine: {
        show: true,
      },
      axisLine: {
        show: true,
      },
    },

    radiusAxis: {
      type: 'category',
      axisLine: {
        show: true,
      },
      axisLabel: {
        rotate: 45,
        how: false,
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 1000,
      },
      {
        type: 'inside',
        start: 0,
        end: 1000,
      },
    ],
    series: [
      {
        name: 'Punch Card',
        type: 'line',
        coordinateSystem: 'polar',
        symbolSize(val: number[]) {
          return val[2] * 2;
        },
        data,
        animationDelay(idx: number) {
          return idx * 5;
        },
      },
    ],
  };
  return (
    <S.WrapperChart
      data-testid="echart-container"
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      tabIndex={0}
      aria-label={arialLabel}>
      <ReactECharts
        option={option}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </S.WrapperChart>
  );
};

export default Echart;
