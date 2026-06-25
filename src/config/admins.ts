/**
 * Officer emails allowed to access /admin.
 * Update this list with the emails you create in Firebase Console.
 */
export const ADMIN_EMAILS: readonly string[] = ['devi0024@yahoo.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === email.toLowerCase());
}
