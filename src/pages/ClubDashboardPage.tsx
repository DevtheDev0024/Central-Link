import { useParams, useNavigate } from 'react-router-dom';
import MemberDashboard from '../components/MemberDashboard';
import ErrorScreen from '../components/ui/ErrorScreen';
import LoadingScreen from '../components/ui/LoadingScreen';
import { DASHBOARD_SOURCES, type DashboardYearKey } from '../config/dashboardYears';
import { useDashboardData } from '../hooks/useDashboardData';

function isDashboardYearKey(value: string | undefined): value is DashboardYearKey {
  return value !== undefined && value in DASHBOARD_SOURCES;
}

export default function ClubDashboardPage() {
  const { yearKey } = useParams<{ yearKey: string }>();
  const navigate = useNavigate();
  const selectedDashboardKey = isDashboardYearKey(yearKey) ? yearKey : null;

  const {
    members,
    loading,
    refreshing,
    error,
    lastUpdated,
    selectedDashboardSource,
    fetchData,
  } = useDashboardData(selectedDashboardKey);

  if (!selectedDashboardKey || !selectedDashboardSource) {
    return (
      <ErrorScreen
        error="The selected dashboard year is not available."
        onRetry={() => navigate('/')}
        onChangeDashboardYear={() => navigate('/')}
      />
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
        onChangeDashboardYear={() => navigate('/')}
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
      onChangeDashboardYear={() => navigate('/')}
    />
  );
}
