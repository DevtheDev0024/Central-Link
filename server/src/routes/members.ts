import { Router } from 'express';
import { verifyAdmin, type AuthenticatedRequest } from '../middleware/verify-admin.js';
import { createMemberAccount, updateMemberAccount, updateMemberStatus } from '../services/member-service.js';

export const membersRouter = Router();

membersRouter.post('/', verifyAdmin, async (req: AuthenticatedRequest, res) => {
  const {
    email,
    password,
    displayName,
    membershipNumber,
    programmeYear,
    clubRole,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body as {
    email?: string;
    password?: string;
    displayName?: string;
    membershipNumber?: string;
    programmeYear?: string;
    clubRole?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
  };

  if (!email || !password || !displayName) {
    return res.status(400).json({ message: 'Email, password, and display name are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  if (!req.adminUid) {
    return res.status(401).json({ message: 'Admin authentication required.' });
  }

  try {
    const member = await createMemberAccount({
      email: email.trim(),
      password,
      displayName: displayName.trim(),
      membershipNumber: membershipNumber?.trim(),
      programmeYear: programmeYear?.trim(),
      clubRole: clubRole?.trim(),
      emergencyContactName: emergencyContactName?.trim(),
      emergencyContactNumber: emergencyContactNumber?.trim(),
      createdBy: req.adminUid,
    });

    return res.status(201).json(member);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create member account.';
    return res.status(500).json({ message });
  }
});

membersRouter.patch('/:uid/status', verifyAdmin, async (req: AuthenticatedRequest, res) => {
  const uid = req.params.uid;
  const { status } = req.body as { status?: 'active' | 'inactive' };

  if (typeof uid !== 'string') {
    return res.status(400).json({ message: 'Invalid member id.' });
  }

  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ message: 'Status must be active or inactive.' });
  }

  try {
    const member = await updateMemberStatus(uid, status);
    return res.json(member);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update member status.';
    return res.status(500).json({ message });
  }
});

membersRouter.patch('/:uid', verifyAdmin, async (req: AuthenticatedRequest, res) => {
  const uid = req.params.uid;
  const {
    displayName,
    email,
    membershipNumber,
    programmeYear,
    clubRole,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body as {
    displayName?: string;
    email?: string;
    membershipNumber?: string;
    programmeYear?: string;
    clubRole?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
  };

  if (typeof uid !== 'string') {
    return res.status(400).json({ message: 'Invalid member id.' });
  }

  if (!displayName?.trim() || !email?.trim()) {
    return res.status(400).json({ message: 'Display name and email are required.' });
  }

  try {
    const member = await updateMemberAccount(uid, {
      displayName: displayName.trim(),
      email: email.trim(),
      membershipNumber: membershipNumber?.trim(),
      programmeYear: programmeYear?.trim(),
      clubRole: clubRole?.trim(),
      emergencyContactName: emergencyContactName?.trim(),
      emergencyContactNumber: emergencyContactNumber?.trim(),
    });

    return res.json(member);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update member account.';
    return res.status(500).json({ message });
  }
});
