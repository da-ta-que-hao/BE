import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Database, Radio, Activity, Zap, Layers, Server } from 'lucide-react';
import { pipelineNodes, generateLiveEvents, services, systemMetrics } from '../../data/mockData';
import type { LiveEvent } from '../../types/monitor.types';
import styles from './SystemMonitor.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  database: Database, radio: Radio, activity: Activity,
  zap: Zap, layers: Layers, server: Server,
};

const statusIconClass: Record<string, string> = {
  healthy: styles.nodeIconHealthy,
  warning: styles.nodeIconWarning,
  error: styles.nodeIconError,
};

const statusDotClass: Record<string, string> = {
  healthy: styles.nodeStatusHealthy,
  warning: styles.nodeStatusWarning,
  error: styles.nodeStatusError,
};

export default function SystemMonitor() {
  const [events, setEvents] = useState<LiveEvent[]>(generateLiveEvents());

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: LiveEvent = {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toISOString(),
        eventType: (['INSERT', 'UPDATE', 'DELETE'] as const)[Math.floor(Math.random() * 3)],
        table: ['orders', 'order_items', 'customers', 'payments'][Math.floor(Math.random() * 4)],
        data: `{id: ${10000 + Math.floor(Math.random() * 90000)}, ...}`,
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const badgeClass: Record<string, string> = {
    INSERT: styles.eventInsert,
    UPDATE: styles.eventUpdate,
    DELETE: styles.eventDelete,
  };

  const svcStatusClass: Record<string, string> = {
    running: styles.serviceRunning,
    stopped: styles.serviceStopped,
    error: styles.serviceError,
  };

  const getMetricChart = (data: { time: string; value: number }[], color: string) => ({
    backgroundColor: 'transparent',
    grid: { top: 5, right: 5, bottom: 5, left: 5 },
    xAxis: { type: 'category' as const, show: false, data: data.map(d => d.time) },
    yAxis: { type: 'value' as const, show: false },
    tooltip: { show: false },
    series: [{
      type: 'line' as const,
      data: data.map(d => d.value),
      smooth: true, showSymbol: false,
      lineStyle: { width: 2, color },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color + '30' },
          { offset: 1, color: color + '05' },
        ]),
      },
    }],
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Monitor</h1>
          <p className={styles.subtitle}>Real-time data pipeline health & performance</p>
        </div>
      </div>

      {/* Pipeline Flow */}
      <motion.div className={styles.pipeline} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className={styles.pipelineTitle}>Data Pipeline Flow</h3>
        <div className={styles.pipelineFlow}>
          {pipelineNodes.map((node, i) => {
            const Icon = iconMap[node.icon] || Database;
            return (
              <div key={node.id} style={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  className={styles.pipelineNode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <span className={`${styles.nodeStatus} ${statusDotClass[node.status]}`} />
                  <div className={`${styles.nodeIcon} ${statusIconClass[node.status]}`}>
                    <Icon size={22} />
                  </div>
                  <span className={styles.nodeName}>{node.name}</span>
                  <span className={styles.nodeMetric}>{node.metric}: {node.metricValue}</span>
                </motion.div>
                {i < pipelineNodes.length - 1 && <span className={styles.pipelineArrow}>→</span>}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Metrics */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>System Metrics</h3>
        <div className={styles.metricsGrid}>
          {systemMetrics.map((metric, i) => {
            const colors = ['#00e5ff', '#ff3366', '#ccff00', '#7b61ff']; // Cyan, Magenta, Lime, Purple
            return (
              <motion.div
                key={metric.name}
                className={styles.metricCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className={styles.metricName}>{metric.name}</div>
                <div className={styles.metricValue}>
                  {metric.current.toLocaleString()}
                  <span className={styles.metricUnit}>{metric.unit}</span>
                </div>
                <ReactECharts
                  option={getMetricChart(metric.data, colors[i])}
                  style={{ height: 60, marginTop: 8 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={styles.gridTwo}>
        {/* Live Events */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Live CDC Events</h3>
          <div className={styles.eventList}>
            {events.map(evt => (
              <motion.div
                key={evt.id}
                className={styles.eventRow}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className={styles.eventTime}>
                  {new Date(evt.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                </span>
                <span className={`${styles.eventBadge} ${badgeClass[evt.eventType]}`}>
                  {evt.eventType}
                </span>
                <span className={styles.eventTable}>{evt.table}</span>
                <span className={styles.eventData}>{evt.data}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Docker Services ({services.filter(s => s.status === 'running').length}/{services.length} running)</h3>
          <div className={styles.servicesGrid}>
            {services.map(svc => (
              <motion.div
                key={svc.id}
                className={styles.serviceCard}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceName}>{svc.name}</span>
                  <span className={`${styles.serviceStatus} ${svcStatusClass[svc.status]}`} />
                </div>
                <div className={styles.serviceMeta}>
                  {svc.status === 'running' ? `CPU: ${svc.cpu}% • RAM: ${svc.memory}%` : svc.status}
                </div>
                {svc.status === 'running' && (
                  <div className={styles.serviceBar}>
                    <div
                      className={styles.serviceBarFill}
                      style={{
                        width: `${svc.cpu}%`,
                        background: svc.cpu > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
