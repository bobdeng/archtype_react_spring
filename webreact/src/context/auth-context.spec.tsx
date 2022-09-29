import { act, renderHook } from '@testing-library/react-hooks';
import { AuthContext, AuthProvider, useAuth } from '@/context/auth-context';
import React, { ReactNode } from 'react';
import { vi } from 'vitest';
import * as auth from '@/util/auth-provider';

describe('AuthProvider', function () {
  describe('useAuth', function () {

    it('should throw error if useAuth not wrapped by Context component', function () {
      const { result } = renderHook(() => useAuth());
      expect(result.error).toEqual(Error('useAuth must be used in AuthProvider'));
    });

    it('should get context value if auth context provider provided', function () {
      const wrapper = ({ children }: { children: ReactNode }) => <AuthContext.Provider
        // @ts-ignore
        value={{ user: { token: 'VALID-TOKEN' } }}>{children}</AuthContext.Provider>
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current.user?.token).toEqual('VALID-TOKEN');
    });

  });

  describe('when children component is wrapped', function () {

    beforeEach(() => {
      mockLogin();
      renderComponent();
    })

    const mockLogin = () => {
      vi.spyOn(auth, 'login').mockImplementation(() => {
          return Promise.resolve({ username: 'James', password: 'p4sword', token: 'valid-token' });
        }
      )
    };

    const renderComponent = () => {
      const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>
      const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
      return { result, waitForNextUpdate };
    };

    it('should not provide user info when first render', async () => {
      const { result } = renderComponent();
      expect(result.current.user).toBeNull();
    });

    it('should provide user info when login', async () => {
      const { result, waitForNextUpdate } = renderComponent();
      act(() => {
        result.current.login({ username: 'james', password: 'p4sword' });
      })
      await waitForNextUpdate();
      expect(result.current.user).toStrictEqual(
        { username: 'James', password: 'p4sword', token: 'valid-token' }
      );
    });

    it('should not provide user info when logout', async () => {
      const { result, waitForNextUpdate } = renderComponent();
      act(() => {
        result.current.login({ username: 'james', password: 'p4sword' });
      })
      await waitForNextUpdate();
      act(() => {
        result.current.logout();
      })
      await waitForNextUpdate();
      expect(result.current.user).toBeNull();
    });

    it('should login when signup', () => {
    });

  });
});