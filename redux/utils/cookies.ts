// redux/utils/cookies.ts
const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  USER_ROLE: "userRole",
} as const;

// Helper functions for cookie operations
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const parts: string[] = [];
  parts.push(`${name}=${encodeURIComponent(value)}`);
  parts.push(`Expires=${expires.toUTCString()}`);
  parts.push(`Path=/`);
  parts.push(`SameSite=Strict`);
  // Only set Secure on HTTPS; avoid adding an invalid "secure=false" attribute on localhost
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  if (isHttps) {
    parts.push(`Secure`);
  }

  const cookieString = parts.join("; ");
  console.log("Setting cookie:", cookieString);
  document.cookie = cookieString;

  // Verify cookie was set
  setTimeout(() => {
    const readBack = getCookie(name);
    console.log(`Cookie ${name} read back:`, readBack);
  }, 100);
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const raw = c.substring(nameEQ.length, c.length);
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Strict`;
};

export const cookieUtils = {
  // Set cookies
  setAccessToken: (token: string, rememberMe = false) => {
    const expires = rememberMe ? 30 : 1; // 30 days if remember me, 1 day otherwise
    console.log(
      "Setting access token cookie:",
      token,
      "expires in",
      expires,
      "days"
    );
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, token, expires);
  },

  setRefreshToken: (token: string, rememberMe = false) => {
    const expires = rememberMe ? 30 : 1;
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, token, expires);
  },

  setUserData: (userData: Record<string, unknown>, rememberMe = false) => {
    const expires = rememberMe ? 30 : 1;
    console.log(
      "Setting user data cookie:",
      userData,
      "expires in",
      expires,
      "days"
    );
    setCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(userData), expires);
  },

  setUserRole: (role: string, rememberMe = false) => {
    const expires = rememberMe ? 30 : 1;
    setCookie(COOKIE_NAMES.USER_ROLE, role, expires);
  },

  // Get cookies
  getAccessToken: (): string | null => {
    return getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  },

  getRefreshToken: (): string | null => {
    return getCookie(COOKIE_NAMES.REFRESH_TOKEN);
  },

  getUserData: (): Record<string, unknown> | null => {
    const userData = getCookie(COOKIE_NAMES.USER_DATA);
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  },

  getUserRole: (): string | null => {
    return getCookie(COOKIE_NAMES.USER_ROLE);
  },

  // Clear all auth cookies
  clearAll: () => {
    Object.values(COOKIE_NAMES).forEach((name) => {
      deleteCookie(name);
    });
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!(cookieUtils.getAccessToken() && cookieUtils.getUserData());
  },
};
