import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { DollarSign, ShoppingCart, Truck, Star, TrendingUp, TrendingDown } from 'lucide-react';
import type { KPIData } from '../../types/dashboard.types';
import styles from './KPICard.module.css';



const iconImageMap: Record<string, string> = {
  'dollar-sign': '/3d-icons/revenue.png',
  'shopping-cart': '/3d-icons/cart.png',
  'truck': '/3d-icons/truck.png',
  'star': '/3d-icons/star.png',
};

function formatValue(value: number, format: string): string {
  switch (format) {
    case 'currency':
      return value >= 1000000
        ? `R$ ${(value / 1000000).toFixed(2)}M`
        : `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    case 'percent':
      return `${value.toFixed(2)}%`;
    case 'rating':
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

interface Props {
  data: KPIData;
  index: number;
}

export default function KPICard({ data, index }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const animRef = useRef<number>(0);
  const iconSrc = iconImageMap[data.icon] || '/3d-icons/revenue.png';

  // Animated counter
  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    const target = data.value;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(target * eased);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [data.value]);

  const sparklineOption = {
    grid: { top: 0, right: 0, bottom: 0, left: 0 },
    xAxis: { type: 'category' as const, show: false, data: data.sparklineData.map((_, i) => i) },
    yAxis: { type: 'value' as const, show: false },
    series: [
      {
        type: 'line' as const,
        data: data.sparklineData,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: data.color },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: data.color + '40' },
            { offset: 1, color: data.color + '05' },
          ]),
        },
      },
    ],
    tooltip: { show: false },
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
      whileHover={{ y: -4, boxShadow: `0 8px 30px ${data.color}25` }}
    >
      <div className={styles.accentLine} style={{ background: data.color }} />

      <div className={styles.topRow}>
        <div className={styles.labelGroup}>
          <div className={styles.iconWrap} style={{ background: data.color + '18', color: data.color }}>
            <img src={iconSrc} alt={data.label} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          </div>
          <span className={styles.label}>{data.label}</span>
        </div>

        <div className={`${styles.trend} ${data.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
          {data.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(data.trendPercent).toFixed(1)}%
        </div>
      </div>

      <div className={styles.value}>{formatValue(displayValue, data.format)}</div>

      <div className={styles.sparkline}>
        <ReactECharts
          option={sparklineOption}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </motion.div>
  );
}
