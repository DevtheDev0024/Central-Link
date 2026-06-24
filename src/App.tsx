import { useState } from 'react';
import LandingPage from './components/LandingPage';
import MemberDashboard from './components/MemberDashboard';
import PerformanceDashboard from './components/PerformanceDashboard';
import ErrorScreen from './components/ui/ErrorScreen';
import LoadingScreen from './components/ui/LoadingScreen';
import { DASHBOARD_SOURCES, type DashboardYearKey } from './config/dashboardYears';
import { useDashboardData } from './hooks/useDashboardData';

function DashboardApp() {
  const [selectedDashboardKey, setSelectedDashboardKey] = useState<DashboardYearKey | null>(null);

  const {
    members,
    loading,
    refreshing,
    error,
    lastUpdated,
    selectedDashboardSource,
    fetchData,
    resetDashboardData,
  } = useDashboardData(selectedDashboardKey);

  const handleSelectDashboard = (dashboardKey: DashboardYearKey) => {
    resetDashboardData();
    setSelectedDashboardKey(dashboardKey);
  };

  const handleChangeDashboardYear = () => {
    setSelectedDashboardKey(null);
    resetDashboardData();
  };

  if (!selectedDashboardKey || !selectedDashboardSource) {
    const dashboardOptions = Object.entries(DASHBOARD_SOURCES) as Array<
      [DashboardYearKey, (typeof DASHBOARD_SOURCES)[DashboardYearKey]]
    >;

    return (
      <LandingPage dashboardOptions={dashboardOptions} onSelectDashboard={handleSelectDashboard} />
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorScreen
        error={error}
        onRetry={() => fetchData({ showFullLoader: true })}
        onChangeDashboardYear={handleChangeDashboardYear}
      />
    );
  }

  return (
    <MemberDashboard
      dashboardSource={selectedDashboardSource}
      members={members}
      refreshing={refreshing}
      lastUpdated={lastUpdated}
      onRefresh={() => {
        void fetchData();
      }}
      onChangeDashboardYear={handleChangeDashboardYear}
    />
  );
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/performance-dashboard') {
    return <PerformanceDashboard />;
  }

  return <DashboardApp />;
}

export default App;
