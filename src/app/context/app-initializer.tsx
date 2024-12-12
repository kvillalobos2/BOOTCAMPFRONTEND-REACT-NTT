import { useEffect } from "react";
import { useGlobalAppDispatch } from "./app-context";
import { AppActions } from "../domain/actions-type";

const AppInitializer = () => {
    const dispatch = useGlobalAppDispatch();
  
    useEffect(() => {
      // lo mejor ser'ia crear un util para esto
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        dispatch({ type: AppActions.SetUser, payload: savedUser });
      }
    }, []);
  
    return null;
  };

  export default AppInitializer;