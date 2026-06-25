import { Link } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function MemberAreaPage() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <AuthLayout
      navLabel="Member Portal"
      title="Member Dashboard"
      description="Your personal member area is under development. You are signed in successfully."
      backHref="/"
      backLabel="Public Site"
    >
      <div className="auth-card admin-shell">
        <h2>Welcome{user?.email ? `, ${user.email}` : ''}</h2>
        <p className="auth-card-intro">
          This space will soon show your personal progress, profile settings, and club updates.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {isAdmin ? (
            <Link to="/admin" className="auth-submit" style={{ width: 'auto', textDecoration: 'none' }}>
              <Shield size={16} aria-hidden="true" />
              Admin Panel
            </Link>
          ) : null}

          <button
            type="button"
            className="auth-back-link"
            onClick={() => {
              void signOut();
            }}
          >
            <LogOut size={14} aria-hidden="true" style={{ marginRight: '0.35rem' }} />
            Sign Out
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
