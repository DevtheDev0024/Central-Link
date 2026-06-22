import { MEMBER_GROWTH_BENCHMARK } from '../../data/badgeDefinitions';

type MemberGrowthProgressProps = {
  totalPoints: number;
  compact?: boolean;
};

export default function MemberGrowthProgress({ totalPoints, compact = false }: MemberGrowthProgressProps) {
  const rawPercentage = (totalPoints / MEMBER_GROWTH_BENCHMARK) * 100;
  const displayPercentage = Math.round(rawPercentage);
  const visualPercentage = Math.min(rawPercentage, 100);
  const isOutstanding = totalPoints > MEMBER_GROWTH_BENCHMARK;

  return (
    <div className={compact ? 'min-w-0' : 'min-w-[220px]'}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-toastmasters-navy">
          {compact ? `${displayPercentage}% Growth` : `${displayPercentage}% Member Growth Progress`}
        </span>
        {isOutstanding && !compact && (
          <span className="shrink-0 rounded-full bg-toastmasters-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-toastmasters-navy shadow-sm">
            Outstanding Growth
          </span>
        )}
      </div>
      <div
        className="h-3 overflow-hidden rounded-full bg-slate-200/80 ring-1 ring-slate-300/60"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(displayPercentage, 100)}
        aria-valuetext={`${displayPercentage}% Member Growth Progress`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-toastmasters-navy via-toastmasters-navy-light to-toastmasters-gold shadow-[0_6px_14px_rgba(26,47,90,0.18)] transition-all duration-500"
          style={{ width: `${visualPercentage}%` }}
        />
      </div>
    </div>
  );
}
