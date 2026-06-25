import { LogOut } from 'lucide-react';

type SignOutButtonProps = {
  onClick: () => void;
  variant?: 'on-dark' | 'on-light';
  className?: string;
};

export default function SignOutButton({ onClick, variant = 'on-light', className }: SignOutButtonProps) {
  return (
    <button
      type="button"
      className={`sign-out-button${variant === 'on-dark' ? ' is-on-dark' : ''}${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      <LogOut size={14} aria-hidden="true" />
      Sign out
    </button>
  );
}
