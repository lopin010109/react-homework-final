// ========================
// Cookie
// ========================
export const cookieUtil = {
  set(key, value, expired) {
    document.cookie = `${key}=${encodeURIComponent(
      value,
    )}; expires=${new Date(expired).toUTCString()}; path=/`;
  },
  get(key) {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`));

    if (!match) return null;

    const value = match.split('=')[1];
    return decodeURIComponent(value);
  },
  remove(key) {
    this.set(key, '', 0);
  },
};

// ========================
// SessionStorage
// ========================

export const sessionStorageUtil = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('get SessionStorage error:', e);
      return null;
    }
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};

// ========================
// LocalStorage
// ========================
export const localStorageUtil = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('get LocalStorageUtil error:', e);
      return null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
