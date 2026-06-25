/**
 * Officer emails allowed to call admin API routes.
 * Keep in sync with src/config/admins.ts and firestore.rules.
 */
export const ADMIN_EMAILS: readonly string[] = ['devi0024@yahoo.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === email.toLowerCase());
}
