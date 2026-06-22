import {
  Trophy,
  Star,
  Flag,
  FileCheck2,
  MessageSquare,
  BookOpen,
  Presentation,
  UsersRound,
  ShieldCheck,
  Medal,
  Globe2,
  Mic,
  Calendar,
} from 'lucide-react';
import type { ScoringRule } from '../types/badges';

export const SCORING_RULES: ScoringRule[] = [

  {
    title: 'Pathways Level Completion',
    icon: Flag,
    tone: 'navy',
    points: ['20 points per completed level.'],
  },
  {
    title: 'Project Completion',
    icon: FileCheck2,
    tone: 'blue',
    points: ['5 points per completed project.'],
  },
  {
    title: 'Meeting Awards',
    icon: Star,
    tone: 'gold',
    points: [
      '5 points for each award received, such as Best Speaker, Best Table Topic Speaker, Best Evaluator, or Best Role Player.',
    ],
  },
  {
    title: 'Contest Excellence',
    icon: Trophy,
    tone: 'maroon',
    points: [
      'Club level: Winner 10 points, 1st Runner-up 5 points, 2nd Runner-up 5 points.',
      'Area level: Winner 15 points, 1st Runner-up 10 points, 2nd Runner-up 5 points.',
      'Division level: Winner 20 points, 1st Runner-up 15 points, 2nd Runner-up 10 points.',
      'District level: Winner 30 points, 1st Runner-up 25 points, 2nd Runner-up 20 points.',
    ],
  },
  {
    title: 'Evaluation Contribution',
    icon: MessageSquare,
    tone: 'navy',
    points: ['5 points for each evaluation, including prepared speech evaluations or table topic evaluations.'],
  },
  {
    title: 'Training Programmes',
    icon: BookOpen,
    tone: 'blue',
    points: [
      '5 points for attending official training programmes such as TLI sessions, Judges Training Programmes, New Member Orientations, or Contest Management Workshops.',
    ],
  },
  {
    title: 'Educational Sessions',
    icon: Presentation,
    tone: 'gold',
    points: ['15 points for conducting each educational session or Moments of Truth session.'],
  },
  {
    title: 'Mentoring Assignments',
    icon: UsersRound,
    tone: 'gray',
    points: ['10 points for each completed mentoring objective at the end of the year.'],
  },
  {
    title: 'Leadership Roles',
    icon: ShieldCheck,
    tone: 'maroon',
    points: ['Club/District Officer role: 30 points.', 'Shadow Team role: 10 points.'],
  },
  {
    title: 'Club Events',
    icon: Calendar,
    tone: 'navy',
    points: ['10 points for leading or participating in organising each club event.'],
  },
  {
    title: 'Club Contest Contribution',
    icon: Medal,
    tone: 'maroon',
    points: ['5 points for participation.', '5 points for management/support.'],
  },
  {
    title: 'Club Visits',
    icon: Globe2,
    tone: 'gray',
    points: ['5 points for each visit as a role player, evaluator, or facilitator.'],
  },
  {
    title: 'Meeting Roles',
    icon: Mic,
    tone: 'blue',
    points: [
      'TMOD: 10 points.',
      'Table Topics Master: 8 points.',
      'General Evaluator: 6 points.',
      'Game Master: 5 points.',
      'TAG/RRM: 4 points.',
    ],
  },
];
