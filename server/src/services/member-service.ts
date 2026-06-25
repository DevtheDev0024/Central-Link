import { getAuth, getFirestore } from '../config/firebase-admin.js';

export type CreateMemberInput = {
  email: string;
  password: string;
  displayName: string;
  membershipNumber?: string;
  programmeYear?: string;
  clubRole?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  createdBy: string;
};

export async function createMemberAccount(input: CreateMemberInput) {
  const auth = getAuth();
  const firestore = getFirestore();

  const userRecord = await auth.createUser({
    email: input.email,
    password: input.password,
    displayName: input.displayName,
  });

  const createdAt = new Date().toISOString();

  await firestore.collection('members').doc(userRecord.uid).set({
    uid: userRecord.uid,
    email: input.email,
    displayName: input.displayName,
    membershipNumber: input.membershipNumber ?? null,
    programmeYear: input.programmeYear ?? null,
    clubRole: input.clubRole ?? 'Member',
    emergencyContactName: input.emergencyContactName ?? null,
    emergencyContactNumber: input.emergencyContactNumber ?? null,
    role: 'member',
    status: 'active',
    mustChangePassword: true,
    createdAt,
    createdBy: input.createdBy,
    updatedAt: createdAt,
  });

  return {
    uid: userRecord.uid,
    email: input.email,
  };
}

export async function updateMemberStatus(uid: string, status: 'active' | 'inactive') {
  const firestore = getFirestore();
  const updatedAt = new Date().toISOString();

  await firestore.collection('members').doc(uid).update({
    status,
    updatedAt,
  });

  return { uid, status, updatedAt };
}

export type UpdateMemberInput = {
  displayName: string;
  email: string;
  membershipNumber?: string;
  programmeYear?: string;
  clubRole?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
};

export async function updateMemberAccount(uid: string, input: UpdateMemberInput) {
  const auth = getAuth();
  const firestore = getFirestore();
  const updatedAt = new Date().toISOString();

  const existingUser = await auth.getUser(uid);
  const authUpdate: { displayName: string; email?: string } = {
    displayName: input.displayName,
  };

  if (existingUser.email !== input.email) {
    authUpdate.email = input.email;
  }

  await auth.updateUser(uid, authUpdate);

  await firestore.collection('members').doc(uid).update({
    displayName: input.displayName,
    email: input.email,
    membershipNumber: input.membershipNumber ?? null,
    programmeYear: input.programmeYear ?? null,
    clubRole: input.clubRole ?? 'Member',
    emergencyContactName: input.emergencyContactName ?? null,
    emergencyContactNumber: input.emergencyContactNumber ?? null,
    updatedAt,
  });

  return { uid, updatedAt };
}
