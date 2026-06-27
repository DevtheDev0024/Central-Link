import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_NAV_LINKS } from '../config/siteNav';
import '../styles/landing.css';

type PublicSiteNavProps = {
  activeLabel?: string;
};

function getNavHref(to: string, pathname: string): string {
  if (to.startsWith('/#')) {
    return pathname === '/' ? to.slice(1) : to;
  }

  return to;
}

export default function PublicSiteNav({ activeLabel }: PublicSiteNavProps) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`landing-nav animate-fade-rise${isMenuOpen ? ' is-menu-open' : ''}`}>
      <div className="landing-nav-inner">
        <div className="landing-nav-leading">
          <Link to="/" className="landing-wordmark">
            <img src="/toastmasters-logo.png" alt="Toastmasters International logo" />
            <span>Central Link Toastmasters Club</span>
          </Link>
        </div>

        <div className="landing-nav-actions">
          <nav className="landing-nav-links" aria-label="Primary navigation">
            {SITE_NAV_LINKS.map((link) => {
              const isActive = link.label === activeLabel;
              const href = getNavHref(link.to, pathname);

              if (link.to.startsWith('/#')) {
                return (
                  <a key={link.label} href={href} className={isActive ? 'is-active' : undefined}>
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.label} to={link.to} className={isActive ? 'is-active' : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link className="landing-nav-signin" to="/login">
            Sign In
          </Link>
        </div>

        <button
          type="button"
          className="landing-mobile-menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="landing-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="landing-mobile-menu"
        className={`landing-mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        {SITE_NAV_LINKS.map((link) => {
          const isActive = link.label === activeLabel;
          const href = getNavHref(link.to, pathname);

          if (link.to.startsWith('/#')) {
            return (
              <a
                key={link.label}
                href={href}
                className={isActive ? 'is-active' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.label}
              to={link.to}
              className={isActive ? 'is-active' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          );
        })}

        <Link className="landing-mobile-menu-signin" to="/login" onClick={closeMenu}>
          Sign In
        </Link>
      </nav>
    </header>
  );
}
