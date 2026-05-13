import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { customerSegments, associationRules } from '../../data/mockData';
import styles from './AnalyticsLab.module.css';

type TabKey = 'segments' | 'basket' | 'predictor';

export default function AnalyticsLab() {
  const [tab, setTab] = useState<TabKey>('segments');
  const [prediction, setPrediction] = useState<number | null>(null);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'segments', label: '👥 Customer Segments' },
    { key: 'basket', label: '🛒 Market Basket' },
    { key: 'predictor', label: '🔮 Satisfaction Predictor' },
  ];

  // Scatter plot for segments
  const scatterOption = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: '#1a2035',
      borderColor: 'rgba(148,163,184,0.15)',
      textStyle: { color: '#000' },
      extraCssText: 'box-shadow: 0 4px 24px rgba(0,0,0,0.1); border-radius: 12px;',
    },
    legend: {
      data: customerSegments.map(s => s.label),
      textStyle: { color: '#535353', fontSize: 12, fontWeight: 500 },
      top: 0,
    },
    grid: { top: 50, right: 20, bottom: 40, left: 50 },
    xAxis: {
      name: 'Recency Score',
      nameTextStyle: { color: '#8c8c8c' },
      axisLabel: { color: '#8c8c8c' },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.04)' } },
    },
    yAxis: {
      name: 'Frequency Score',
      nameTextStyle: { color: '#8c8c8c' },
      axisLabel: { color: '#8c8c8c' },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.04)' } },
    },
    series: customerSegments.map(seg => ({
      name: seg.label,
      type: 'scatter' as const,
      data: seg.points.map(p => [p.x, p.y, p.z]),
      symbolSize: (data: number[]) => Math.sqrt(data[2]) * 0.8,
      itemStyle: { color: seg.color, opacity: 0.75 },
    })),
  };

  // Network graph for association rules
  const categories = Array.from(new Set(associationRules.flatMap(r => [r.source, r.target])));
  const graphOption = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: '#fff',
      borderColor: 'rgba(0,0,0,0.08)',
      textStyle: { color: '#000' },
      extraCssText: 'box-shadow: 0 4px 24px rgba(0,0,0,0.1); border-radius: 12px;',
    },
    series: [{
      type: 'graph' as const,
      layout: 'force' as const,
      force: { repulsion: 300, edgeLength: [100, 200] },
      roam: true,
      label: { show: true, color: '#000', fontSize: 11, fontWeight: 600 },
      data: categories.map((name, i) => ({
        name,
        symbolSize: 40 + i * 5,
        itemStyle: {
          color: ['#06b6d4', '#818cf8', '#34d399', '#fbbf24', '#fb7185', '#a78bfa', '#f97316', '#22d3ee'][i % 8],
        },
      })),
      links: associationRules.map(r => ({
        source: r.source,
        target: r.target,
        lineStyle: { width: r.confidence * 6, opacity: 0.6 },
      })),
      emphasis: { focus: 'adjacency' as const },
      lineStyle: { color: 'source' as const, curveness: 0.1 },
    }],
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Lab</h1>
          <p className={styles.subtitle}>Advanced Machine Learning Analytics</p>
        </div>
        <div className={styles.tabs}>
          {tabs.map(t => (
            <motion.button
              key={t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => setTab(t.key)}
              whileTap={{ scale: 0.97 }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        key={tab}
        className={styles.content}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tab === 'segments' && (
          <>
            <div className={styles.segmentGrid}>
              {customerSegments.map((seg, i) => (
                <motion.div
                  key={seg.id}
                  className={styles.segmentCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className={styles.segmentLabel}>
                    <span className={styles.segmentDot} style={{ background: seg.color }} />
                    {seg.label}
                  </div>
                  <div className={styles.segmentCount}>{seg.count.toLocaleString()}</div>
                  <div className={styles.segmentMeta}>
                    Avg: R$ {seg.avgMonetary.toFixed(0)} • {seg.avgFrequency.toFixed(1)}x/mo
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Customer Segmentation (K-Means Clustering)</h3>
              <ReactECharts option={scatterOption} style={{ height: 400 }} />
            </div>
          </>
        )}

        {tab === 'basket' && (
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Product Association Network</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
              Nodes represent product categories. Edges show co-purchase relationships (thicker = higher confidence).
            </p>
            <ReactECharts option={graphOption} style={{ height: 500 }} />
          </div>
        )}

        {tab === 'predictor' && (
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>🔮 Customer Satisfaction Predictor</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
              Enter order parameters to predict customer satisfaction rating using Random Forest model.
            </p>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Shipping Cost (R$)</label>
                <input type="number" className={styles.formInput} defaultValue={25} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Expected Delivery Days</label>
                <input type="number" className={styles.formInput} defaultValue={7} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Category</label>
                <select className={styles.formSelect}>
                  <option>Bed & Bath</option>
                  <option>Health & Beauty</option>
                  <option>Sports & Leisure</option>
                  <option>Computers</option>
                  <option>Housewares</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Payment Method</label>
                <select className={styles.formSelect}>
                  <option>Credit Card</option>
                  <option>Boleto</option>
                  <option>Debit Card</option>
                  <option>Voucher</option>
                </select>
              </div>
            </div>
            <motion.button
              className={styles.predictBtn}
              onClick={() => setPrediction(4.2)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔮 Predict Satisfaction
            </motion.button>

            {prediction && (
              <motion.div
                className={styles.resultCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.resultRating}>⭐ {prediction.toFixed(1)}</div>
                <div className={styles.resultProb}>Predicted Rating — 87.3% confidence</div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                  📦 Shipping cost within acceptable range • ⏰ Delivery time is optimal • 🏷️ Category has high satisfaction baseline
                </p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
