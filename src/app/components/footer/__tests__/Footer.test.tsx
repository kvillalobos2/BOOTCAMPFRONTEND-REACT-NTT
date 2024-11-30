import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('react-icons/fa', () => ({
  FaFacebookF: () => <div data-testid="facebook-icon" />,
  FaTwitter: () => <div data-testid="twitter-icon" />,
  FaInstagram: () => <div data-testid="instagram-icon" />
}));

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('Should render the site title', () => {
    expect(screen.getByText('My Market')).toBeInTheDocument();
  });

  test('Should display the copyright text', () => {
    expect(screen.getByText(/© 2024 My Market. Todos los derechos reservados/i)).toBeInTheDocument();
  });

  test('Should contain terms and privacy links', () => {
    const terminosLink = screen.getByText('Términos y condiciones');
    const privacidadLink = screen.getByText('Privacidad');

    expect(terminosLink).toHaveAttribute('href', '/terminos');
    expect(privacidadLink).toHaveAttribute('href', '/privacidad');
  });

  describe('Social Media Links', () => {
    test('Should contain Facebook link with icon', () => {
      const facebookLink = screen.getByTestId('facebook-icon').closest('a');
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      expect(facebookLink).toHaveAttribute('target', '_blank');
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('Should contain Twitter link with icon', () => {
      const twitterLink = screen.getByTestId('twitter-icon').closest('a');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('Should contain Instagram link with icon', () => {
      const instagramLink = screen.getByTestId('instagram-icon').closest('a');
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
      expect(instagramLink).toHaveAttribute('target', '_blank');
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});