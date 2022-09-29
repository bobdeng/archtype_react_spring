import axios from 'axios';
import { AuthForm } from '@/context/auth-context';

export interface User {
  username: string;
  password: string;
  token: string;
}

export const localStorageKey = '__auth_provider_token__';

export const login = (params: { username: string, password: string }) => {
  return axios.post<AuthForm, User>('/api/1.0/users', params).then(res => handleUserResponse(res));
}

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
}

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
}
