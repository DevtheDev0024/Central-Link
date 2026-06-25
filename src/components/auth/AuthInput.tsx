import type { InputHTMLAttributes, ReactNode } from 'react';
import '../../styles/auth.css';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
};

export function AuthInput({ icon, className, ...props }: AuthInputProps) {
  return (
    <div className={`auth-input-wrap${className ? ` ${className}` : ''}`}>
      <span className="auth-input-icon" aria-hidden="true">
        {icon}
      </span>
      <input className="auth-input" {...props} />
    </div>
  );
}
