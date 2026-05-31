const SESSION_KEY = "notes-app-session";

export interface AuthUser {
  login: string;
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(SESSION_KEY);
}
