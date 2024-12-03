
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth'; 
import { AppActions } from '@/app/domain/actions-type';
import { useGlobalAppDispatch, useGlobalAppState } from '@/app/context/app-context';


jest.mock('@/app/context/app-context', () => ({
  useGlobalAppDispatch: jest.fn(),
  useGlobalAppState: jest.fn(),
}));

describe('useAuth', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    localStorage.clear();


    mockDispatch = jest.fn();

    (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useGlobalAppState as jest.Mock).mockReturnValue({ user: 'testUser' });

    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });
  });

  afterEach(() => {

    Object.defineProperty(window, 'location', {
      value: window.location,
      writable: true,
    });
  });

  it('Should set the user in localStorage and dispatch the SetUser action when login is called', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('newUser');
    });

    expect(localStorage.getItem('user')).toBe('newUser');


    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.SetUser,
      payload: 'newUser',
    });
  });

  it('Should dispatch the LogOut action and redirect to login page when logout is called', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.LogOut,
    });


    expect(window.location.href).toBe('/login');
  });
});
