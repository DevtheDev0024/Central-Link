export const DASHBOARD_SOURCES = {
  '2025-2026': {
    label: '2025/2026 Dashboard',
    title: 'Central Link Toastmasters Member Dashboard 2025/2026',
    csvUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSr0ffcmGUiYJ5Jj6EyeAGPyftgZcIcDiHYUsODx0QbN8AMYlx4okEWdYVBemLaPPklnCtCxYkuPfo/pub?gid=1826601071&single=true&output=csv',
  },
  '2026-2027': {
    label: '2026/2027 Dashboard',
    title: 'Central Link Toastmasters Member Dashboard 2026/2027',
    csvUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjLjhIaqHlx-jOtn0gVhhuxE-RWVBlAy5sax-Ch_8R2JYOP8MLz8zVFsOggioAHDWlqhj9CQS4AOl7/pub?gid=1826601071&single=true&output=csv',
  },
} as const;

export type DashboardYearKey = keyof typeof DASHBOARD_SOURCES;
