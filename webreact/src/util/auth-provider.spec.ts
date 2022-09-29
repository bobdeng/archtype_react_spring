import { vi } from 'vitest';
import axios from 'axios';
import * as auth from '@/util/auth-provider';

describe('Auth', function () {

  describe('Login', function () {

    it('should call api when login', function () {
      const mockPost = vi.fn().mockResolvedValueOnce({});
      axios.post = mockPost;
      auth.login({ username: 'james', password: 'p4sword' });
      expect(mockPost.mock.calls[0][0]).toBe('/api/1.0/users');
    });

    it('should call api with parameters when login', function () {
      const mockPost = vi.fn().mockResolvedValueOnce({ token: 'not-valid-token' });
      axios.post = mockPost;
      auth.login({ username: 'james', password: 'p4sword' });
      expect(mockPost.mock.calls[0][1]).toStrictEqual({ username: 'james', password: 'p4sword' });
    });

    it.skip('should call save method when login successfully', async () => {
      const spyInstance = vi.spyOn(auth, 'handleUserResponse');
      axios.post = vi.fn().mockImplementation(() => {
        return Promise.resolve({ username: 'james', password: 'p4sword' });
      });
      await auth.login({ username: 'james', password: 'p4sword' });
      expect(spyInstance).toHaveBeenCalledWith('-');
    });

    it('should save token to local storage when login successfully', async () => {
      const spyInstance = vi.spyOn(Storage.prototype, 'setItem');
      axios.post = vi.fn().mockResolvedValueOnce({ token: 'VALID-TOKEN' });
      await auth.login({ username: 'james', password: 'p4sword' });
      expect(spyInstance).toHaveBeenCalledWith(auth.localStorageKey, 'VALID-TOKEN');
    });

  });

  describe('Logout', function () {

    it('should remove local storage key when logout', function () {
      const spyInstance = vi.spyOn(Storage.prototype, 'removeItem');
      auth.logout()
      expect(spyInstance).toHaveBeenCalled();
    });

  });

  describe('HandleUserResponse', function () {

    it('should save token to local storage', function () {
      const spyInstance = vi.spyOn(Storage.prototype, 'setItem');
      auth.handleUserResponse({ username: 'james', password: 'p4sword', token: 'VALID-TOKEN' })
      expect(spyInstance).toHaveBeenCalledWith(auth.localStorageKey, 'VALID-TOKEN');
    });

  });
});