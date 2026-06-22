type ErrorScreenProps = {
  error: string;
  onRetry: () => void;
  onChangeDashboardYear: () => void;
};

export default function ErrorScreen({ error, onRetry, onChangeDashboardYear }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#2d4a7c_0%,#1a2f5a_42%,#0f1d38_100%)] px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="text-toastmasters-maroon text-6xl mb-4">!</div>
        <p className="text-gray-800 text-lg font-semibold mb-2">Error Loading Data</p>
        <p className="text-gray-600">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-xl bg-toastmasters-navy px-6 py-2.5 font-semibold text-white shadow-lg shadow-toastmasters-navy/20 transition-colors hover:bg-toastmasters-navy-light"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onChangeDashboardYear}
          className="mt-3 rounded-xl border border-gray-200 px-6 py-2.5 font-semibold text-toastmasters-navy transition-colors hover:border-toastmasters-gold hover:bg-[#fff8e1]"
        >
          Change Dashboard Year
        </button>
      </div>
    </div>
  );
}
