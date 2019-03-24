import { BehaviorSubject } from 'rxjs';

/**
 * Simple token store
 */

export const token$ = new BehaviorSubject(window.localStorage.getItem('token') ||
  null);

export function updateToken(newToken) {
  if (!newToken) {
    window.localStorage.removeItem('token');
  } else {
    window.localStorage.setItem('token', newToken);
  }

  token$.next(newToken);
}
