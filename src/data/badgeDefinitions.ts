import {
  Flag,
  Star,
  Trophy,
  MessageSquare,
  BookOpen,
  Presentation,
  UsersRound,
  ShieldCheck,
  Calendar,
  Medal,
  Globe2,
  Mic,
} from 'lucide-react';
import type { BadgeDefinition } from '../types/badges';

export const MEMBER_GROWTH_BENCHMARK = 500;
export const PATHWAYS_ACHIEVER_BENCHMARK = 50;
export const MEETING_STAR_BENCHMARK = 50;
export const CONTEST_STAR_BENCHMARK = 25;
export const EVALUATION_CHAMPION_BENCHMARK = 50;
export const LEARNING_ENTHUSIAST_BENCHMARK = 15;
export const EDUCATION_CONTRIBUTOR_BENCHMARK = 15;
export const MENTOR_LEADER_BENCHMARK = 10;
export const LEADERSHIP_CONTRIBUTOR_BENCHMARK = 20;
export const EVENT_CHAMPION_BENCHMARK = 30;
export const CONTEST_SUPPORTER_BENCHMARK = 10;
export const CLUB_AMBASSADOR_BENCHMARK = 15;
export const ROLE_CHAMPION_BENCHMARK = 100;

export const BADGE_DEFINITIONS: BadgeDefinition[] = [

  {
    id: 'pathways-achiever',
    name: 'Pathways Achiever',
    benchmark: PATHWAYS_ACHIEVER_BENCHMARK,
    description: 'Earn 50 or more Pathways level points.',
    message: 'Keep progressing through your Pathways journey and completing levels.',
    imageSrc: '/badges/Pathways-Achiever.png',
    icon: Flag,
    tone: 'navy',
    getScore: (member) => member.levelCompletion,
  },
  {
    id: 'meeting-star',
    name: 'Meeting Star',
    benchmark: MEETING_STAR_BENCHMARK,
    description: 'Earn 50 or more meeting award points.',
    message: 'Keep participating actively and aim for Best Speaker, Best Table Topic Speaker, Best Evaluator, or Best Role Player.',
    imageSrc: '/badges/Meeting-Star.png',
    icon: Star,
    tone: 'gold',
    getScore: (member) => member.meetingAwards,
  },
  {
    id: 'contest-star',
    name: 'Contest Star',
    benchmark: CONTEST_STAR_BENCHMARK,
    description: 'Earn 25 or more contest excellence points.',
    message: 'Step onto the contest stage and challenge yourself beyond regular meetings.',
    imageSrc: '/badges/Contest-Star.png',
    icon: Trophy,
    tone: 'maroon',
    getScore: (member) => member.contestExcellence,
  },
  {
    id: 'evaluation-champion',
    name: 'Evaluation Champion',
    benchmark: EVALUATION_CHAMPION_BENCHMARK,
    description: 'Earn 50 or more evaluation contribution points.',
    message: 'Support others through quality evaluations and grow as a better listener and speaker.',
    imageSrc: '/badges/Evaluation-Champion.png',
    icon: MessageSquare,
    tone: 'navy',
    getScore: (member) => member.evaluationContribution,
  },
  {
    id: 'learning-enthusiast',
    name: 'Learning Enthusiast',
    benchmark: LEARNING_ENTHUSIAST_BENCHMARK,
    description: 'Earn 15 or more training programme points.',
    message: 'Attend official training programmes and bring fresh knowledge back to the club.',
    imageSrc: '/badges/Learning-Enthusiast.png',
    icon: BookOpen,
    tone: 'blue',
    getScore: (member) => member.trainingPrograms,
  },
  {
    id: 'education-contributor',
    name: 'Education Contributor',
    benchmark: EDUCATION_CONTRIBUTOR_BENCHMARK,
    description: 'Earn 15 or more educational session points.',
    message: 'Share knowledge by conducting educational or Moments of Truth sessions.',
    imageSrc: '/badges/Education-Contributor.png',
    icon: Presentation,
    tone: 'gold',
    getScore: (member) => member.educationalSessions,
  },
  {
    id: 'mentor-leader',
    name: 'Mentor Leader',
    benchmark: MENTOR_LEADER_BENCHMARK,
    description: 'Earn 10 or more mentoring assignment points.',
    message: 'Guide another member and help them grow in their Toastmasters journey.',
    imageSrc: '/badges/Mentor-Leader.png',
    icon: UsersRound,
    tone: 'gray',
    getScore: (member) => member.mentoringAssignments,
  },
  {
    id: 'leadership-contributor',
    name: 'Leadership Contributor',
    benchmark: LEADERSHIP_CONTRIBUTOR_BENCHMARK,
    description: 'Earn 20 or more leadership role points.',
    message: "Take up leadership responsibilities and contribute to the club's direction.",
    imageSrc: '/badges/Leadership-Contributor.png',
    icon: ShieldCheck,
    tone: 'maroon',
    getScore: (member) => member.leadershipRoles,
  },
  {
    id: 'event-champion',
    name: 'Event Champion',
    benchmark: EVENT_CHAMPION_BENCHMARK,
    description: 'Earn 30 or more club event points.',
    message: 'Support club events and help create memorable experiences for members.',
    imageSrc: '/badges/Event-Champion.png',
    icon: Calendar,
    tone: 'navy',
    getScore: (member) => member.clubEvents,
  },
  {
    id: 'contest-supporter',
    name: 'Contest Supporter',
    benchmark: CONTEST_SUPPORTER_BENCHMARK,
    description: 'Earn 10 or more club contest contribution points.',
    message: 'Participate in or support club contests to strengthen the contest culture.',
    imageSrc: '/badges/Contest-Supporter.png',
    icon: Medal,
    tone: 'maroon',
    getScore: (member) => member.clubContestContribution,
  },
  {
    id: 'club-ambassador',
    name: 'Club Ambassador',
    benchmark: CLUB_AMBASSADOR_BENCHMARK,
    description: 'Earn 15 or more club visit points.',
    message: 'Visit other clubs, learn from them, and bring ideas back to Central Link.',
    imageSrc: '/badges/Club-Ambassador.png',
    icon: Globe2,
    tone: 'gray',
    getScore: (member) => member.visitingToastmaster,
  },
  {
    id: 'role-champion',
    name: 'Role Champion',
    benchmark: ROLE_CHAMPION_BENCHMARK,
    description: 'Earn 100 or more meeting role points.',
    message: 'Take meeting roles consistently and help maintain high-quality meetings.',
    imageSrc: '/badges/Role-Champion.png',
    icon: Mic,
    tone: 'blue',
    getScore: (member) => member.aiScore,
  },
];
