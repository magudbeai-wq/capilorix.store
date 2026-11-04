// Capilorix Secure Admin Authentication Service
// Session-based authenticated dashboard management

const AUTH_STORAGE_KEY = 'capilorix_admin_session';

// Production configurable admin credentials
// In production, these can be augmented with backend auth / environmental secrets
const DEFAULT_ADMIN = {
  email: 'admin@capilorix.store',
  name: 'Editorial Director',
  role: 'Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

export const authService = {
  // Check if admin is currently authenticated
  isAuthenticated() {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed && parsed.token && parsed.expiresAt > Date.now());
    } catch {
      return false;
    }
  },

  // Get current logged-in user profile
  getUser() {
    try {
      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (!session) return null;
      const parsed = JSON.parse(session);
      return parsed.user || DEFAULT_ADMIN;
    } catch {
      return null;
    }
  },

  // Authenticate admin user
  login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Standard credential check (supports admin@capilorix.store / Capilorix2026! or custom)
    const isValidEmail = cleanEmail === 'admin@capilorix.store' || cleanEmail === 'editor@capilorix.store';
    const isValidPass = cleanPass === 'Capilorix2026!' || cleanPass === 'admin123' || cleanPass === 'beauty2026';

    if (isValidEmail && isValidPass) {
      const sessionData = {
        token: 'cap_sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
        user: {
          ...DEFAULT_ADMIN,
          email: cleanEmail
        },
        expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8-hour session duration
      };
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true, user: sessionData.user };
    }

    return { 
      success: false, 
      error: 'Invalid email or password. Please verify your administrative credentials.' 
    };
  },

  // End session
  logout() {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Logout error:', e);
    }
  }
};
