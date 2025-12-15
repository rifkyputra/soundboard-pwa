import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/services/auth.service';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
      // Logout and clear tokens
      authService.logout();
    }

    // Redirect to home page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;
