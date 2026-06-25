import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/auth.css';

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  navLabel?: string;
  navYear?: string;
};

export default function AuthLayout({
  title,
  description,
  children,
  backHref = '/',
  backLabel = 'Back to Home',
  navLabel = 'Member Portal',
  navYear = '2025/2026',
}: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <header className="auth-nav">
        <div className="auth-nav-inner">
          <Link to="/" className="auth-wordmark">
            <img src="/toastmasters-logo.png" alt="Toastmasters International logo" />
            <span>Central Link Toastmasters Club</span>
          </Link>

          <div className="auth-nav-meta">
            <span>{navLabel}</span>
            <strong>{navYear}</strong>
          </div>

          <Link to={backHref} className="auth-back-link">
            <ArrowLeft size={14} aria-hidden="true" />
            {backLabel}
          </Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-hero">
          <img src="/toastmasters-logo.png" alt="" aria-hidden="true" className="auth-hero-logo" />
          <h1>{title}</h1>
          <p className="auth-description">{description}</p>
        </div>

        {children}
      </main>
    </div>
  );
}
