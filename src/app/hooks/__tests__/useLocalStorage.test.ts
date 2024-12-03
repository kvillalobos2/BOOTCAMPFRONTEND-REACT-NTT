import { renderHook , act} from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";


describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Should use the initial value when there is no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial value'));

    expect(result.current[0]).toBe('initial value');
  });

  it('Should get the stored value from localStorage if it exists', () => {
   
    localStorage.setItem('key', JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('key', 'initial value'));

    expect(result.current[0]).toBe('stored value');
  });

  it('Should set the value to localStorage when setLocalStorageValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial value'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');

    expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
  });

  it('Should update the value in localStorage when setLocalStorageValue is called multiple times', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial value'));


    act(() => {
      result.current[1]('first value');
    });
    act(() => {
      result.current[1]('second value');
    });

   
    expect(result.current[0]).toBe('second value');
    expect(localStorage.getItem('key')).toBe(JSON.stringify('second value'));
  });
});
