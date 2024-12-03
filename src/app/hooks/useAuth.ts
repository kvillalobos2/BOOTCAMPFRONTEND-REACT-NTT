import { useGlobalAppDispatch, useGlobalAppState } from "../context/app-context";
import { AppActions } from "../domain/actions-type";

export const useAuth = () => {
    const dispatch = useGlobalAppDispatch();
    const { user } = useGlobalAppState();
  
    const login = (username: string) => {
      localStorage.setItem('user', username);
      dispatch({ type: AppActions.SetUser, payload: username });
    };
  
    const logout = () => {
      dispatch({ type: AppActions.LogOut });
      window.location.href = '/login'; 
    };
  
    return { user, login, logout };
  };