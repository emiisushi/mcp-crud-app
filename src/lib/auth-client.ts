export type AuthUser = {
  name: string;
  email: string;
};

type StoredAccount = AuthUser & {
  password: string;
};

const AUTH_ACCOUNTS_KEY = "person-app-accounts";
const AUTH_CURRENT_USER_KEY = "person-app-current-user";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function getAccounts(): StoredAccount[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  const raw = storage.getItem(AUTH_ACCOUNTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

export function getCurrentUser(): AuthUser | null {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(AUTH_CURRENT_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function setCurrentUser(user: AuthUser | null): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  if (user) {
    storage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    storage.removeItem(AUTH_CURRENT_USER_KEY);
  }

  window.dispatchEvent(new Event("person-auth-changed"));
}

export function signUp(name: string, email: string, password: string): { ok: boolean; message: string } {
  const storage = getStorage();
  if (!storage) {
    return { ok: false, message: "Browser storage unavailable." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  const exists = accounts.some((account) => account.email.toLowerCase() === normalizedEmail);

  if (exists) {
    return { ok: false, message: "Email is already registered." };
  }

  const next: StoredAccount = {
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  storage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify([...accounts, next]));
  setCurrentUser({ name: next.name, email: next.email });
  return { ok: true, message: "Account created." };
}

export function signIn(email: string, password: string): { ok: boolean; message: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const account = getAccounts().find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!account || account.password !== password) {
    return { ok: false, message: "Invalid email or password." };
  }

  setCurrentUser({ name: account.name, email: account.email });
  return { ok: true, message: "Signed in." };
}

export function signOut(): void {
  setCurrentUser(null);
}
