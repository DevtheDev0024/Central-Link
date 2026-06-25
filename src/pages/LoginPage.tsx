import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { useAuth } from '../context/AuthContext';

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('invalid-credential') || error.message.includes('wrong-password')) {
      return 'Incorrect email or password. Please try again.';
    }
    if (error.message.includes('user-not-found')) {
      return 'No account found for that email.';
    }
    if (error.message.includes('too-many-requests')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
  }

  return 'Unable to sign in. Please check your credentials and try again.';
}

export default function LoginPage() {
  const { user, loading, signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = (location.state as { from?: string } | null)?.from ?? '/member';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  if (!loading && user) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setResetMessage(null);

    try {
      await signIn(email.trim(), password);
      navigate(redirectPath, { replace: true });
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email address first, then choose forgot password.');
      return;
    }

    setError(null);
    setResetMessage(null);

    try {
      await resetPassword(email.trim());
      setResetMessage('Password reset email sent. Check your inbox.');
    } catch (resetError) {
      setError(getAuthErrorMessage(resetError));
    }
  };

  return (
    <AuthLayout
      navLabel="Member Portal"
      title="Member Portal"
      description="Sign in with the email and password provided by your club officers."
      backLabel="Back to Home"
    >
      <form className="auth-card auth-signin-card" onSubmit={handleSubmit}>
        <div className="auth-card-header">
          <h2 className="auth-card-title">Sign In</h2>
          <p className="auth-card-intro">
            Use your member email and password to access the member portal for 2025/2026.
          </p>
        </div>

        {error ? <p className="auth-error">{error}</p> : null}
        {resetMessage ? <p className="auth-success">{resetMessage}</p> : null}

        <AuthInput
          icon={<Mail size={18} />}
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="Enter member email"
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <AuthInput
          icon={<Lock size={18} />}
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
          aria-label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="auth-submit" disabled={submitting}>
          <Lock size={16} aria-hidden="true" />
          {submitting ? 'Signing in…' : 'Continue'}
        </button>

        <button type="button" className="auth-secondary-action" onClick={handleResetPassword}>
          Forgot password?
        </button>

        <div className="auth-card-footnotes">
          <p>Secured through Firebase Authentication. Browser storage does not contain sheet credentials.</p>
          <p>© 2026 Central Link Toastmasters. Member access only.</p>
        </div>
      </form>
    </AuthLayout>
  );
}
