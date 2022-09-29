import React, { createContext, ReactNode, useContext } from 'react';
import * as auth from '@/util/auth-provider';
import { User } from '@/util/auth-provider';

export interface AuthForm {
  username: string;
  password: string;
}

export const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then((user: User) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
  return <AuthContext.Provider value={{ user, login, logout }} children={children}/>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error('useAuth must be used in AuthProvider');
  }
  return context;
};

