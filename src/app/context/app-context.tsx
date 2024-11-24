import React, { createContext, useReducer, useContext } from "react";
import { appReducer, initialState, DispatchObject, AppState } from "./reducer";

const AppContextState = createContext<AppState | undefined>(undefined);
const AppContextDispatch = createContext<
  React.Dispatch<DispatchObject> | undefined
>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContextState.Provider value={state}>
      <AppContextDispatch.Provider value={dispatch}>
        {children}
      </AppContextDispatch.Provider>
    </AppContextState.Provider>
  );
};

export const useGlobalAppState = (): AppState => {
  const context = useContext(AppContextState);
  if (!context) {
    throw new Error("useGlobalAppState must be used within an AppProvider");
  }
  return context;
};

export const useGlobalAppDispatch = (): React.Dispatch<DispatchObject> => {
  const context = useContext(AppContextDispatch);
  if (!context) {
    throw new Error("useGlobalAppDispatch must be used within an AppProvider");
  }
  return context;
};
