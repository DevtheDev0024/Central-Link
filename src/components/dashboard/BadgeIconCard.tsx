import { Lock } from 'lucide-react';
import type { BadgeDefinition } from '../../types/badges';

type BadgeIconCardProps = {
  badge: BadgeDefinition;
  earned?: boolean;
  score?: number;
  onClick?: () => void;
};

export default function BadgeIconCard({ badge, earned = true, score, onClick }: BadgeIconCardProps) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`group flex flex-col items-center justify-start bg-transparent p-1 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-toastmasters-gold/20 ${
        !earned ? 'opacity-75' : ''
      }`}
    >
      <img
        src={badge.imageSrc}
        alt=""
        aria-hidden="true"
        className={`h-28 w-28 object-contain drop-shadow-[0_14px_22px_rgba(15,29,56,0.16)] transition duration-300 group-hover:scale-105 sm:h-32 sm:w-32 ${
          earned ? '' : 'grayscale'
        }`}
      />
      <p className="mt-3 max-w-[8rem] text-sm font-bold leading-tight text-toastmasters-navy">{badge.name}</p>
      {typeof score === 'number' && (
        <p className="mt-1 text-xs font-semibold text-slate-500">
          {score}/{badge.benchmark} pts
        </p>
      )}
      {!earned && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-slate-500 ring-1 ring-slate-200">
          <Lock size={12} />
          Locked
        </span>
      )}
    </Wrapper>
  );
}
