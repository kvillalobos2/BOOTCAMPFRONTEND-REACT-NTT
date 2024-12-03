
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 
import withAuth from '../authHoc';

const TestComponent = () => <div>Protected Content</div>;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));

describe('withAuth HOC', () => {
  beforeEach(() => {
   
    localStorage.clear();
  });

  test('should redirect to login when no token is present', () => {
    const navigate = jest.fn(); 
  
    localStorage.removeItem('accessToken');

   
    const ProtectedComponent = withAuth(TestComponent);

    render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

 
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  test('should render the wrapped component when token is present', () => {
 
    localStorage.setItem('accessToken', 'fake-access-token');

    const ProtectedComponent = withAuth(TestComponent);

    render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

 
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
