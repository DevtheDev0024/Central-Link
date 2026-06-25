import type {
  CreateMemberPayload,
  MemberStatus,
  UpdateMemberPayload,
  UpdateMemberStatusPayload,
} from '../types/memberAccount';

const API_URL = import.meta.env.VITE_API_URL;

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message ?? 'Request failed.');
  }
  return data;
}

export async function createMemberAccount(
  token: string,
  payload: CreateMemberPayload,
): Promise<{ uid: string; email: string }> {
  const response = await fetch(`${API_URL}/members`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function updateMemberStatus(
  token: string,
  uid: string,
  payload: UpdateMemberStatusPayload,
): Promise<{ uid: string; status: MemberStatus }> {
  const response = await fetch(`${API_URL}/members/${uid}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function updateMemberAccount(
  token: string,
  uid: string,
  payload: UpdateMemberPayload,
): Promise<{ uid: string; updatedAt: string }> {
  const response = await fetch(`${API_URL}/members/${uid}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}
