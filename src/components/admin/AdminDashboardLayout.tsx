import { Link, useLocation } from 'react-router-dom';
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  LogOut,
  Mail,
  Settings,
  Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const NAV_ITEMS = [
  { label: 'User Management', href: '/admin', icon: Users, enabled: true },
  { label: 'Approvals', href: '#', icon: CheckCircle, enabled: false },
  { label: 'Award Points', href: '#', icon: Award, enabled: false },
  { label: 'Reports & Analytics', href: '#', icon: BarChart3, enabled: false },
  { label: 'Meeting Scheduler', href: '#', icon: Calendar, enabled: false },
  { label: 'Communications', href: '#', icon: Mail, enabled: false },
  { label: 'Settings', href: '#', icon: Settings, enabled: false },
] as const;

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src="/toastmasters-logo.png" alt="Toastmasters International logo" />
          <div>
            <strong>Admin Console</strong>
            <span>Central Link Toastmasters</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.enabled && pathname === item.href;

            if (!item.enabled) {
              return (
                <span key={item.label} className="admin-sidebar-link is-disabled" aria-disabled="true">
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`admin-sidebar-link${isActive ? ' is-active' : ''}`}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <span>{user?.email}</span>
          <button
            type="button"
            className="admin-sidebar-signout"
            onClick={() => {
              void signOut();
            }}
          >
            <LogOut size={14} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
