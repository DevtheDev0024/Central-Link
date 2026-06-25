import type { NextFunction, Request, Response } from 'express';
import { getAuth } from '../config/firebase-admin.js';
import { isAdminEmail } from '../config/admins.js';

export type AuthenticatedRequest = Request & {
  adminUid?: string;
  adminEmail?: string;
};

export async function verifyAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing authorization token.' });
  }

  const token = authorization.slice('Bearer '.length);

  try {
    const decoded = await getAuth().verifyIdToken(token);

    if (!isAdminEmail(decoded.email)) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    req.adminUid = decoded.uid;
    req.adminEmail = decoded.email ?? undefined;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired authorization token.' });
  }
}
