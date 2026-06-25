export type MemberRole = 'member' | 'admin';
export type MemberStatus = 'active' | 'inactive';

export const CLUB_ROLES = [
  'Member',
  'VP Education',
  'VP Membership',
  'President',
  'Secretary',
  'Treasurer',
  'Sergeant at Arms',
] as const;

export type ClubRole = (typeof CLUB_ROLES)[number];

export interface MemberAccount {
  uid: string;
  email: string;
  displayName: string;
  membershipNumber?: string;
  programmeYear?: string;
  clubRole?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  role: MemberRole;
  status: MemberStatus;
  mustChangePassword: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
}

export interface CreateMemberPayload {
  email: string;
  password: string;
  displayName: string;
  membershipNumber?: string;
  programmeYear?: string;
  clubRole?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

export interface UpdateMemberStatusPayload {
  status: MemberStatus;
}

export interface UpdateMemberPayload {
  displayName: string;
  email: string;
  membershipNumber?: string;
  programmeYear?: string;
  clubRole?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}
