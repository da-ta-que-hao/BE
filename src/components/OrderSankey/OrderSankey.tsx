import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { orderFlowData } from '../../data/mockData';

export default function OrderSankey() {
  const nodes = Array.from(
    new Set(orderFlowData.flatMap(d => [d.source, d.target]))
  ).map(name => {
    const colorMap: Record<string, string> = {
      'Created': '#ff3366', // Magenta
      'Approved': '#ccff00', // Lime
      'Shipped': '#00e5ff', // Cyan
      'Delivered': '#00cc66', // Emerald
      'Late Delivery': '#ff9900', // Amber
      'Cancelled': '#ff3333', // Rose
      'Unavailable': '#7b61ff', // Purple
    };
    return { name, itemStyle: { color: colorMap[name] || '#8c8c8c' } };
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item' as const,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 2,
      textStyle: { color: '#000', fontSize: 13, fontWeight: 'bold' },
      extraCssText: 'box-shadow: 4px 4px 0px #000; border-radius: 8px;',
    },
    series: [
      {
        type: 'sankey' as const,
        layout: 'none' as const,
        emphasis: { focus: 'adjacency' as const },
        nodeAlign: 'left' as const,
        data: nodes,
        links: orderFlowData.map(d => ({ source: d.source, target: d.target, value: d.value })),
        lineStyle: { color: 'gradient' as const, opacity: 0.8 },
        label: { color: '#000', fontSize: 13, fontWeight: 800, textBorderColor: '#fff', textBorderWidth: 3 },
        itemStyle: { borderColor: '#000', borderWidth: 2 },
        nodeWidth: 20,
        nodeGap: 14,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        background: 'var(--bg-primary)',
        border: 'var(--border-thick)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-brutal-lg)',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: '#000', textTransform: 'uppercase' }}>
        Order Flow
      </h3>
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </motion.div>
  );
}
