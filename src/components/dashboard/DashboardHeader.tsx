import { Calendar, RefreshCw } from 'lucide-react';
import type { DashboardSource } from '../../types/dashboard';

type DashboardHeaderProps = {
  dashboardSource: DashboardSource;
  lastUpdated: string;
  refreshing: boolean;
  onRefresh: () => void;
  onChangeDashboardYear: () => void;
};

export default function DashboardHeader({
  dashboardSource,
  lastUpdated,
  refreshing,
  onRefresh,
  onChangeDashboardYear,
}: DashboardHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,#2b4673_0%,#193257_46%,#101c35_100%)] text-white shadow-[0_18px_50px_rgba(15,29,56,0.22)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-toastmasters-gold/70 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-col items-center gap-4 border-b border-white/10 pb-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <img
              src="/toastmasters-logo.png"
              alt="Toastmasters International logo"
              className="h-11 w-11 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <div className="min-w-0">
              <p className="font-['GothamCondensed-Light',sans-serif] text-[1.25rem] uppercase leading-none tracking-[0.04em] text-white">
                Central Link Toastmasters
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-toastmasters-gold-light">
                Member Growth Portal
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold sm:justify-end">
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={refreshing}
              className="inline-flex items-center gap-2 border-b border-transparent py-1 text-toastmasters-gold transition hover:border-toastmasters-gold disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing' : 'Refresh'}
            </button>
            <button
              type="button"
              onClick={onChangeDashboardYear}
              className="border-b border-white/25 py-1 text-white transition hover:border-toastmasters-gold hover:text-toastmasters-gold focus:outline-none focus:ring-4 focus:ring-toastmasters-gold/20"
            >
              Change Year
            </button>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:gap-10">
          <div className="min-w-0">
            <h1 className="font-['GothamCondensed-Bold',sans-serif] text-[2.8rem] uppercase leading-[0.94] tracking-[0.04em] text-white sm:text-[3.4rem] lg:whitespace-nowrap lg:text-[3.7rem] xl:text-[4rem]">
              Central Link Toastmasters Member Dashboard
            </h1>
            <p className="mt-3 font-['GothamCondensed-Bold',sans-serif] text-[2rem] uppercase italic tracking-[0.08em] text-toastmasters-gold-light sm:text-[2rem]">
              {dashboardSource.label.replace(' Dashboard', '')}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              A polished view of member achievements, meeting roles, and progress points from the club Google Sheet.
            </p>
          </div>

          <div className="border-l-0 border-white/12 pt-0 lg:border-l lg:pl-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Calendar size={16} className="text-toastmasters-gold" />
              <span>Last updated</span>
            </div>
            <p className="mt-2 text-base font-semibold leading-6 text-white">{lastUpdated || 'Not loaded yet'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
