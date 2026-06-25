export type LoginRedirectState = {
  from?: string;
  signedOut?: boolean;
};

export function getPostLoginRedirect(state: LoginRedirectState | null | undefined): string {
  if (state?.signedOut) return '/member';
  if (!state?.from || state.from === '/login') return '/member';
  if (state.from.startsWith('/admin')) return '/member';

  return state.from;
}

export const LOGIN_SIGNED_OUT_STATE: LoginRedirectState = { signedOut: true };
