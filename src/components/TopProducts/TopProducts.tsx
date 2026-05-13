import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { motion } from 'framer-motion';
import { topProducts } from '../../data/mockData';

export default function TopProducts() {
  const sorted = [...topProducts].sort((a, b) => a.revenue - b.revenue);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 2,
      textStyle: { color: '#000', fontSize: 13, fontWeight: 'bold' },
      extraCssText: 'box-shadow: 4px 4px 0px #000; border-radius: 8px;',
      formatter: (params: Array<{ name: string; value: number }>) => {
        const p = params[0];
        const item = topProducts.find(t => t.category === p.name);
        return `<b>${p.name}</b><br/>Revenue: R$ ${(p.value / 1000000).toFixed(2)}M<br/>Orders: ${item?.orders.toLocaleString()}<br/>Growth: ${(item?.growth ?? 0) > 0 ? '+' : ''}${item?.growth}%`;
      },
    },
    grid: { top: 10, right: 20, bottom: 10, left: 130 },
    xAxis: {
      type: 'value' as const,
      axisLabel: { color: '#000', fontWeight: 'bold', fontSize: 11, formatter: (v: number) => `${(v / 1000000).toFixed(1)}M` },
      splitLine: { lineStyle: { color: '#e5e5e5', type: 'dashed' } },
      axisLine: { lineStyle: { color: '#000', width: 2 } },
    },
    yAxis: {
      type: 'category' as const,
      data: sorted.map(d => d.category),
      axisLabel: { color: '#000', fontSize: 12, fontWeight: 800 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar' as const,
        data: sorted.map(d => ({
          value: d.revenue,
          itemStyle: {
            color: '#ccff00', /* Lime */
            borderColor: '#000',
            borderWidth: 2,
            borderRadius: [0, 8, 8, 0],
          },
        })),
        barWidth: 20,
        animationDuration: 1200,
        animationEasing: 'cubicOut' as const,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      style={{
        background: 'var(--bg-primary)',
        border: 'var(--border-thick)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-brutal-lg)',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: '#000', textTransform: 'uppercase' }}>
        Top Categories
      </h3>
      <ReactECharts option={option} style={{ height: 340 }} opts={{ renderer: 'canvas' }} />
    </motion.div>
  );
}
