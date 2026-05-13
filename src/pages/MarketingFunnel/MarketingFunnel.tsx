import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { funnelKPIs, funnelStages, leadOrigins, funnelTrend, businessSegments } from '../../data/mockData';
import styles from './MarketingFunnel.module.css';

function formatValue(value: number, format: string): string {
  switch (format) {
    case 'currency': return `R$ ${value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case 'percent': return `${value.toFixed(2)}%`;
    case 'days': return `${value.toFixed(1)}d`;
    default: return value.toLocaleString();
  }
}

export default function MarketingFunnel() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const trendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 2,
      textStyle: { color: '#000', fontWeight: 700 },
    },
    legend: {
      data: ['Leads', 'Deals Closed'],
      textStyle: { color: '#535353', fontSize: 12, fontWeight: 700 },
      top: 0,
    },
    grid: { top: 40, right: 60, bottom: 30, left: 50 },
    xAxis: {
      type: 'category',
      data: funnelTrend.map(d => d.month),
      axisLabel: { color: '#535353', fontWeight: 700 },
      axisLine: { lineStyle: { color: '#000', width: 2 } },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        axisLabel: { color: '#535353', fontWeight: 700 },
        splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } },
      },
      {
        type: 'value',
        name: 'Conv. %',
        min: 0,
        max: 15,
        axisLabel: { color: '#818cf8', fontWeight: 700, formatter: (v: number) => `${v}%` },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Leads',
        type: 'bar',
        data: funnelTrend.map(d => d.leads),
        itemStyle: { color: '#818cf8', borderRadius: [4, 4, 0, 0], borderColor: '#000', borderWidth: 2 },
        barMaxWidth: 32,
      },
      {
        name: 'Deals Closed',
        type: 'bar',
        data: funnelTrend.map(d => d.deals),
        itemStyle: { color: '#34d399', borderRadius: [4, 4, 0, 0], borderColor: '#000', borderWidth: 2 },
        barMaxWidth: 32,
      },
      {
        name: 'Conv. Rate',
        type: 'line',
        yAxisIndex: 1,
        data: funnelTrend.map(d => d.conversionRate),
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#f97316', width: 3 },
        areaStyle: { color: 'rgba(249,115,22,0.08)' },
      },
    ],
  };

  const originOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 2,
      textStyle: { color: '#000', fontWeight: 700 },
      formatter: (p: { name: string; value: number; percent: number }) =>
        `<b>${p.name}</b><br/>Leads: ${p.value.toLocaleString()}<br/>${p.percent}%`,
    },
    legend: { show: false },
    series: [{
      type: 'pie',
      radius: ['40%', '72%'],
      data: leadOrigins.map(o => ({ name: o.origin, value: o.leads, itemStyle: { color: o.color, borderColor: '#000', borderWidth: 2 } })),
      label: { color: '#000', fontWeight: 700, fontSize: 12 },
      emphasis: { scale: true, scaleSize: 6 },
    }],
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Marketing Funnel</h1>
          <p className={styles.subtitle}>Seller acquisition — lead velocity &amp; conversion analytics</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {funnelKPIs.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            className={styles.kpiCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{ '--kpi-color': kpi.color } as React.CSSProperties}
          >
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{formatValue(kpi.value, kpi.format)}</div>
            <div className={`${styles.kpiTrend} ${kpi.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
              {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(kpi.trendPercent).toFixed(1)}% vs last period
            </div>
          </motion.div>
        ))}
      </div>

      {/* Funnel Stages */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Conversion Funnel</h3>
        <div className={styles.funnelStages}>
          {funnelStages.map((stage, i) => (
            <motion.div
              key={stage.stage}
              className={styles.stageWrap}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredStage(i)}
              onHoverEnd={() => setHoveredStage(null)}
            >
              <div className={styles.stageLabel}>{stage.stage}</div>
              <div className={styles.stageBarWrap}>
                <motion.div
                  className={styles.stageBar}
                  style={{ background: stage.color, borderColor: '#000' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.rate}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                />
                {hoveredStage === i && (
                  <motion.div className={styles.stageTooltip} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {stage.count.toLocaleString()} records
                  </motion.div>
                )}
              </div>
              <div className={styles.stageCount}>
                <span className={styles.stageNum}>{stage.count.toLocaleString()}</span>
                {i > 0 && <span className={styles.stageRate}>{stage.rate.toFixed(1)}% conv.</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Monthly Lead &amp; Deal Trend</h3>
          <ReactECharts option={trendOption} style={{ height: 320 }} />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Leads by Origin</h3>
          <ReactECharts option={originOption} style={{ height: 260 }} />
          <div className={styles.originLegend}>
            {leadOrigins.map(o => (
              <div key={o.origin} className={styles.originRow}>
                <span className={styles.originDot} style={{ background: o.color }} />
                <span className={styles.originName}>{o.origin}</span>
                <span className={styles.originRate}>{o.conversionRate.toFixed(1)}%</span>
                <span className={styles.originDeals}>{o.deals} deals</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Segments Table */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Closed Deals by Business Segment</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Segment</th>
                <th>Deals</th>
                <th>Revenue</th>
                <th>Avg Deal Value</th>
                <th>Avg Lead Time</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {businessSegments.map((seg, i) => {
                const totalDeals = businessSegments.reduce((s, x) => s + x.deals, 0);
                const share = (seg.deals / totalDeals) * 100;
                return (
                  <motion.tr
                    key={seg.segment}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={styles.tableRow}
                  >
                    <td className={styles.segmentCell}>{seg.segment}</td>
                    <td><strong>{seg.deals}</strong></td>
                    <td>R$ {(seg.revenue / 1000).toFixed(0)}K</td>
                    <td>R$ {seg.avgDealValue.toLocaleString()}</td>
                    <td>{seg.avgLeadTime}d</td>
                    <td>
                      <div className={styles.shareBar}>
                        <div className={styles.shareBarFill} style={{ width: `${share}%` }} />
                        <span className={styles.shareLabel}>{share.toFixed(1)}%</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
