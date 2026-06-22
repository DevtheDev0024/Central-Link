import { useState, useEffect, useCallback } from 'react';
import type { DashboardYearKey } from '../config/dashboardYears';
import { DASHBOARD_SOURCES } from '../config/dashboardYears';
import type { Member } from '../types/member';
import { parseCSV } from '../utils/parseCsv';

export function useDashboardData(selectedDashboardKey: DashboardYearKey | null) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const selectedDashboardSource = selectedDashboardKey
    ? DASHBOARD_SOURCES[selectedDashboardKey]
    : null;

  const fetchData = useCallback(async ({ showFullLoader = false } = {}) => {
    if (!selectedDashboardSource) return;

    try {
      if (showFullLoader) setLoading(true);
      setRefreshing(true);

      const cacheBuster = Date.now();
      const separator = selectedDashboardSource.csvUrl.includes('?') ? '&' : '?';
      const response = await fetch(`${selectedDashboardSource.csvUrl}${separator}cacheBuster=${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const csvText = await response.text();
      const parsedMembers = parseCSV(csvText);
      setMembers(parsedMembers);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } catch (err) {
      setError('Failed to load member data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDashboardSource]);

  useEffect(() => {
    if (selectedDashboardSource) {
      fetchData({ showFullLoader: true });
    }
  }, [fetchData, selectedDashboardSource]);

  const resetDashboardData = useCallback(() => {
    setMembers([]);
    setLastUpdated('');
    setError(null);
    setLoading(false);
    setRefreshing(false);
  }, []);

  return {
    members,
    loading,
    refreshing,
    error,
    lastUpdated,
    selectedDashboardSource,
    fetchData,
    resetDashboardData,
  };
}
