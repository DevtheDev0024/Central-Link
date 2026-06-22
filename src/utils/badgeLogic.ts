import type { BadgeTone } from '../types/badges';
import type { Member } from '../types/member';
import { BADGE_DEFINITIONS } from '../data/badgeDefinitions';

export function getBadgeToneClasses(tone: BadgeTone, earned = true) {
  if (!earned) {
    return {
      icon: 'border-gray-200 bg-gray-100 text-gray-400',
      card: 'border-gray-100 bg-gray-50 text-gray-500',
    };
  }

  switch (tone) {
    case 'gold':
      return {
        icon: 'border-toastmasters-gold/50 bg-[#fff8e1] text-toastmasters-gold-dark',
        card: 'border-toastmasters-gold/30 bg-[#fff8e1] text-toastmasters-gold-dark',
      };
    case 'maroon':
      return {
        icon: 'border-toastmasters-maroon/25 bg-toastmasters-maroon/10 text-toastmasters-maroon',
        card: 'border-toastmasters-maroon/20 bg-toastmasters-maroon/10 text-toastmasters-maroon',
      };
    case 'blue':
      return {
        icon: 'border-toastmasters-navy-light/25 bg-toastmasters-navy-light/10 text-toastmasters-navy-light',
        card: 'border-toastmasters-navy-light/20 bg-toastmasters-navy-light/10 text-toastmasters-navy-light',
      };
    case 'gray':
      return {
        icon: 'border-gray-200 bg-white text-gray-700',
        card: 'border-gray-200 bg-gray-50 text-gray-700',
      };
    default:
      return {
        icon: 'border-toastmasters-navy/25 bg-toastmasters-navy/10 text-toastmasters-navy',
        card: 'border-toastmasters-navy/20 bg-toastmasters-navy/10 text-toastmasters-navy',
      };
  }
}

export function hasMemberEarnedBadge(member: Member, badge: (typeof BADGE_DEFINITIONS)[number]) {
  return badge.getScore(member) >= badge.benchmark;
}

export function getMemberBadges(member: Member) {
  const earned = BADGE_DEFINITIONS.filter((badge) => hasMemberEarnedBadge(member, badge));
  const unearned = BADGE_DEFINITIONS.filter((badge) => !hasMemberEarnedBadge(member, badge));

  return { earned, unearned };
}

export function getNextSuggestedAction(member: Member) {
  if (member.aiScore < 50) {
    return 'Take a meeting role in an upcoming club meeting to strengthen your meeting contribution.';
  }

  if (member.levelCompletion < 40) {
    return 'Complete your next Pathways level milestone to strengthen your education progress.';
  }

  if (member.projectCompletion < 30) {
    return 'Complete one more Pathways project to keep your learning journey moving.';
  }

  if (member.evaluationContribution < 30) {
    return "Take an evaluator role and support another member's growth.";
  }

  if (member.visitingToastmaster < 10) {
    return 'Visit another Toastmasters club as a role player, evaluator, or facilitator to expand your exposure.';
  }

  if (member.trainingPrograms < 10) {
    return 'Attend an official Toastmasters training programme to gain fresh learning.';
  }

  if (member.clubEvents < 20) {
    return 'Support or help organise a club event to build stronger club involvement.';
  }

  if (member.clubContestContribution < 10) {
    return 'Participate in or support a club contest to strengthen your contest experience.';
  }

  return 'Continue building consistency across speeches, roles, evaluations, club visits, and leadership contributions to strengthen your overall member growth.';
}
