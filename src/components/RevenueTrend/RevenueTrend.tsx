import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { motion } from 'framer-motion';
import { revenueTrendData } from '../../data/mockData';

export default function RevenueTrend() {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 2,
      textStyle: { color: '#000', fontSize: 13, fontWeight: 'bold' },
      extraCssText: 'box-shadow: 4px 4px 0px #000; border-radius: 8px;',
      formatter: (params: Array<{ name: string; value: number; seriesName: string }>) => {
        const p = params[0];
        return `<b style="color:#000; text-transform: uppercase;">${p.name}</b><br/><span style="color:#000; font-weight: bold;">Revenue: R$ ${(p.value / 1000000).toFixed(2)}M</span><br/><span style="color:#000; font-weight: bold;">Orders: ${params[1]?.value?.toLocaleString() ?? ''}</span>`;
      },
    },
    legend: {
      data: ['Revenue', 'Orders'],
      textStyle: { color: '#000', fontSize: 12, fontWeight: 800, textTransform: 'uppercase' },
      top: 0,
      right: 0,
      itemGap: 20,
    },
    grid: { top: 45, right: 20, bottom: 30, left: 60 },
    xAxis: {
      type: 'category' as const,
      data: revenueTrendData.map(d => d.date),
      axisLine: { lineStyle: { color: '#000', width: 2 } },
      axisLabel: { color: '#000', fontWeight: 'bold', fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value' as const,
        name: 'Revenue',
        nameTextStyle: { color: '#000', fontWeight: 'bold', fontSize: 11 },
        axisLabel: { color: '#000', fontWeight: 'bold', fontSize: 11, formatter: (v: number) => `${(v / 1000000).toFixed(1)}M` },
        splitLine: { lineStyle: { color: '#e5e5e5', type: 'dashed' } },
      },
      {
        type: 'value' as const,
        name: 'Orders',
        nameTextStyle: { color: '#000', fontWeight: 'bold', fontSize: 11 },
        axisLabel: { color: '#000', fontWeight: 'bold', fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'line' as const,
        smooth: true,
        data: revenueTrendData.map(d => d.revenue),
        lineStyle: { width: 4, color: '#ff3366' }, /* Magenta */
        showSymbol: false,
        areaStyle: {
          color: '#ff3366',
          opacity: 0.15,
        },
      },
      {
        name: 'Orders',
        type: 'line' as const,
        smooth: true,
        yAxisIndex: 1,
        data: revenueTrendData.map(d => d.orders),
        lineStyle: { width: 4, color: '#00e5ff', type: 'solid' as const }, /* Cyan */
        showSymbol: false,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '24px',
        padding: '2rem',
      }}
    >
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: '#000', letterSpacing: '-0.02em' }}>
        Revenue Trend
      </h3>
      <ReactECharts option={option} style={{ height: 320 }} opts={{ renderer: 'canvas' }} />
    </motion.div>
  );
}
