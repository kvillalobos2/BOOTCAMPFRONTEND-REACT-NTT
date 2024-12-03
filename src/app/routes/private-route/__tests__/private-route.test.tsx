
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 

import '@testing-library/jest-dom'; 
import PrivateRoute from '../private-route';

describe('PrivateRoute', () => {
  beforeEach(() => {
    
    localStorage.clear();
  });

  test('Should render the element when there is a token', () => {

    localStorage.setItem('accessToken', 'fake-access-token');

    render(
      <MemoryRouter>
        <PrivateRoute element={<div>Private Page</div>} />
      </MemoryRouter>
    );

 
    expect(screen.getByText('Private Page')).toBeInTheDocument();
  });

});
