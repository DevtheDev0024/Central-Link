import type { Member } from '../types/member';

export type MetricTone = 'navy' | 'blue' | 'gold' | 'maroon' | 'gray' | 'score';

export type MemberMetric = {
  field: keyof Member;
  label: string;
  shortLabel: string;
  tone: MetricTone;
  showInTable?: boolean;
};

export const MEMBER_METRICS: MemberMetric[] = [
  { field: 'levelCompletion', label: 'Level Completion', shortLabel: 'Levels', tone: 'navy' },
  { field: 'projectCompletion', label: 'Project Completion', shortLabel: 'Projects', tone: 'blue' },
  { field: 'meetingAwards', label: 'Meeting Awards', shortLabel: 'Awards', tone: 'gold' },
  { field: 'contestExcellence', label: 'Contest Excellence', shortLabel: 'Contests', tone: 'maroon' },
  { field: 'evaluationContribution', label: 'Evaluation Contribution', shortLabel: 'Evaluation', tone: 'navy', showInTable: false },
  { field: 'trainingPrograms', label: 'Training Programmes', shortLabel: 'Training', tone: 'blue' },
  { field: 'educationalSessions', label: 'Educational Sessions', shortLabel: 'Education', tone: 'gold' },
  { field: 'mentoringAssignments', label: 'Mentoring Assignments', shortLabel: 'Mentoring', tone: 'gray' },
  { field: 'leadershipRoles', label: 'Leadership Roles', shortLabel: 'Leadership', tone: 'maroon' },
  { field: 'clubEvents', label: 'Club Events', shortLabel: 'Events', tone: 'navy' },
  { field: 'clubContestContribution', label: 'Club Contest Contribution', shortLabel: 'Contest Support', tone: 'maroon' },
  { field: 'visitingToastmaster', label: 'Visiting Toastmaster', shortLabel: 'Club Visits', tone: 'gray' },
  { field: 'aiScore', label: 'Meeting Roles Points', shortLabel: 'Roles Pts', tone: 'blue' },
  { field: 'ajScore', label: 'Total Points / Score', shortLabel: 'Total', tone: 'score' },
];

export const TABLE_METRICS = MEMBER_METRICS.filter((metric) => metric.showInTable !== false);

export function getMetricValueClass(tone: MetricTone) {
  switch (tone) {
    case 'blue':
      return 'bg-toastmasters-navy-light/10 text-toastmasters-navy-light';
    case 'gold':
      return 'bg-toastmasters-gold/20 text-toastmasters-gold-dark';
    case 'maroon':
      return 'bg-toastmasters-maroon/10 text-toastmasters-maroon';
    case 'score':
      return 'bg-toastmasters-gold text-toastmasters-navy shadow-sm';
    case 'gray':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-toastmasters-navy/10 text-toastmasters-navy';
  }
}
