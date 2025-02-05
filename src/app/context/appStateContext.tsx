import React from 'react';
import { User, AuthType, AuthResponse } from '../common/interfaces';
import { AuthService } from '../services/auth.service';

export interface AppState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  auth: AuthResponse | null;
  setAuth: (auth: AuthResponse | null) => void;
  loadProfile: () => Promise<void>;
}

const AppStateContext = React.createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuthState] = React.useState<AuthResponse | null>(null);
  const authService = new AuthService();

  const loadProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      const userProfile = await authService.loadProfile();
      setUser(userProfile);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const setAuth = React.useCallback((newAuth: AuthResponse | null) => {
    setAuthState(newAuth);
    if (newAuth) {
      setUser(newAuth.user);
      localStorage.setItem('token', newAuth.jwt);
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
      auth,
      setAuth,
      loadProfile,
    }),
    [user, loading, auth, setAuth, loadProfile]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};