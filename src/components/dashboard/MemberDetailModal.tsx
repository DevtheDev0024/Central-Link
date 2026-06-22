import { BadgeCheck, Lightbulb, Lock, X } from 'lucide-react';
import { BADGE_DEFINITIONS } from '../../data/badgeDefinitions';
import { getMemberBadges, getNextSuggestedAction } from '../../utils/badgeLogic';
import type { BadgeDefinition } from '../../types/badges';
import type { Member } from '../../types/member';
import BadgeIconCard from './BadgeIconCard';
import MemberGrowthProgress from './MemberGrowthProgress';

type MemberDetailModalProps = {
  member: Member | null;
  onClose: () => void;
  onBadgeClick: (badge: BadgeDefinition) => void;
};

export default function MemberDetailModal({ member, onClose, onBadgeClick }: MemberDetailModalProps) {
  if (!member) return null;

  const { earned, unearned } = getMemberBadges(member);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-4 py-6 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f7f9fb] shadow-[0_30px_90px_rgba(15,29,56,0.35)] animate-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(135deg,#112242_0%,#17335c_55%,#224273_100%)] px-5 py-6 text-white sm:px-8">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-toastmasters-maroon via-toastmasters-gold to-toastmasters-maroon" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white ring-1 ring-white/20 transition hover:bg-white/20"
            aria-label="Close member badge profile"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-5 pr-12 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-toastmasters-gold text-2xl font-bold text-toastmasters-navy shadow-lg">
              {member.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join('')}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-toastmasters-gold-light">
                Achievement badge profile
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{member.name}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-200">
                Keep building momentum. Every role, project, contest, and learning moment can unlock another badge.
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(90vh-170px)] overflow-y-auto p-5 sm:p-8">
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.25rem] border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total points</p>
              <p className="mt-2 text-4xl font-bold text-toastmasters-navy">{member.ajScore}</p>
              <p className="mt-2 text-sm text-slate-600">
                {earned.length} of {BADGE_DEFINITIONS.length} badges earned
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-toastmasters-gold/20 bg-[#fff8e1] p-5">
              <MemberGrowthProgress totalPoints={member.ajScore} />
            </div>
          </div>

          <section className="mb-6 rounded-[1.25rem] border border-toastmasters-gold/30 bg-gradient-to-r from-[#fff8e1] via-white to-slate-50 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-toastmasters-navy text-toastmasters-gold shadow-sm">
                <Lightbulb size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-toastmasters-gold-dark">
                  Next Suggested Action
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-toastmasters-navy">
                  {getNextSuggestedAction(member)}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <BadgeCheck className="text-toastmasters-gold" size={22} />
              <h4 className="text-lg font-bold text-toastmasters-navy">Badges earned</h4>
            </div>
            {earned.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {earned.map((badge) => (
                  <BadgeIconCard
                    key={badge.id}
                    badge={badge}
                    score={badge.getScore(member)}
                    onClick={() => onBadgeClick(badge)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-slate-200/80 bg-white p-4">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">
                  In Progress
                </span>
                <p className="mt-3 text-sm text-slate-600">
                  No badges yet, but the first one is within reach. Keep participating and your progress will show
                  here.
                </p>
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <Lock className="text-gray-400" size={22} />
              <h4 className="text-lg font-bold text-toastmasters-navy">Badges to unlock</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {unearned.map((badge) => (
                <BadgeIconCard
                  key={badge.id}
                  badge={badge}
                  earned={false}
                  score={badge.getScore(member)}
                  onClick={() => onBadgeClick(badge)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
