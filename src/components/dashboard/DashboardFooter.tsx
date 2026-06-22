import { Star } from 'lucide-react';

export default function DashboardFooter() {
  return (
    <>
      <section className="rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(135deg,#0f1d38_0%,#1a2f5a_55%,#233e70_100%)] p-6 text-center text-white shadow-[0_18px_45px_rgba(15,29,56,0.18)]">
        <Star className="mx-auto mb-3 text-toastmasters-gold" size={24} />
        <p className="text-sm font-medium leading-6 text-slate-100 sm:text-base">
          "Where Leaders Are Made" - track your progress, contribution, and growth with Central Link Toastmasters Club.
        </p>
      </section>

      <footer className="border-t border-slate-200/70 bg-[#dfe6ee] py-6 text-slate-700">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold">Central Link Toastmasters Club Member Dashboard</p>
          <p className="mt-1 text-xs text-slate-500">Data refreshes automatically from Google Sheets</p>
        </div>
      </footer>
    </>
  );
}
