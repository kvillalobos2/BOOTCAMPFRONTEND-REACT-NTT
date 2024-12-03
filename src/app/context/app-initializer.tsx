import { useEffect } from "react";
import { useGlobalAppDispatch } from "./app-context";
import { AppActions } from "../domain/actions-type";

const AppInitializer = () => {
    const dispatch = useGlobalAppDispatch();
  
    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        dispatch({ type: AppActions.SetUser, payload: savedUser });
      }
    }, []);
  
    return null;
  };

  export default AppInitializer;