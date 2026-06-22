import { BADGE_DEFINITIONS } from '../../data/badgeDefinitions';
import type { BadgeDefinition } from '../../types/badges';
import BadgeIconCard from './BadgeIconCard';

type BadgeGridSectionProps = {
  onBadgeClick: (badge: BadgeDefinition) => void;
};

export default function BadgeGridSection({ onBadgeClick }: BadgeGridSectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(245,247,250,0.94)_100%)] p-5 text-center shadow-[0_18px_45px_rgba(15,29,56,0.08)] sm:p-7">
      <div className="mx-auto mb-7 flex max-w-3xl flex-col items-center gap-3">
        <h2 className="font-['GothamCondensed-Bold',sans-serif] text-[2.8rem] uppercase italic leading-none tracking-[0.04em] text-toastmasters-navy sm:text-[3.4rem]">
          Achievement Badges
        </h2>
        <p className="max-w-3xl text-base font-semibold leading-6 text-slate-900">
          Each badge represents a milestone in your Toastmasters growth journey. Keep participating, learning, and
          leading.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {BADGE_DEFINITIONS.map((badge) => (
          <BadgeIconCard key={badge.id} badge={badge} onClick={() => onBadgeClick(badge)} />
        ))}
      </div>
    </section>
  );
}
