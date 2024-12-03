import { render } from '@testing-library/react';
import { useGlobalAppDispatch } from '../app-context';
import AppInitializer from '../app-initializer';
import { AppActions } from '@/app/domain/actions-type';

jest.mock('@/app/context/app-context', () => ({
    useGlobalAppDispatch: jest.fn(),
}));

describe('AppInitializer', () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {

        localStorage.clear();

        mockDispatch = jest.fn();
        (useGlobalAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('Should dispatch SetUser action if a user is stored in localStorage', () => {

        localStorage.setItem('user', 'testUser');

        render(<AppInitializer />);


        expect(mockDispatch).toHaveBeenCalledWith({
            type: AppActions.SetUser,
            payload: 'testUser',
        });
    });

    it('Should not dispatch any action if any user is stored in localStorage', () => {

        render(<AppInitializer />);


        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
