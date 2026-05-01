import type { AdminUser } from "@/lib/api";

const TOKEN_KEY = "opunabo_admin_token";
const ADMIN_KEY = "opunabo_admin_user";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAdminToken(): string | null {
  if (!canUseStorage()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getAdminUser(): AdminUser | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(ADMIN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setAdminUser(admin: AdminUser): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function clearAdminUser(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ADMIN_KEY);
}

export function clearAdminSession(): void {
  clearAdminToken();
  clearAdminUser();
}

export function parseApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) {
      return maybeMessage;
    }
  }

  return fallback;
}
