type LoadingScreenProps = {
  message?: string;
};

export default function LoadingScreen({ message = 'Loading member data...' }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen animate-fade-in items-center justify-center bg-[radial-gradient(circle_at_top,#2d4a7c_0%,#1a2f5a_42%,#0f1d38_100%)] px-4">
      <div className="text-center">
        <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-toastmasters-gold border-t-transparent"></div>
        <p className="text-lg font-medium text-white">{message}</p>
      </div>
    </div>
  );
}
