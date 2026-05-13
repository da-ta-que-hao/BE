import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import AIChat from './pages/AIChat/AIChat';
import AnalyticsLab from './pages/AnalyticsLab/AnalyticsLab';
import SystemMonitor from './pages/SystemMonitor/SystemMonitor';
import MarketingFunnel from './pages/MarketingFunnel/MarketingFunnel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'ai-chat', element: <AIChat /> },
      { path: 'analytics', element: <AnalyticsLab /> },
      { path: 'funnel', element: <MarketingFunnel /> },
      { path: 'monitor', element: <SystemMonitor /> },
    ],
  },
]);
