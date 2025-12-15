import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import LoginForm from '@/components/LoginForm';
import { authService } from '@/api';

function Login() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    // Redirect to home page after successful login
    navigate('/');
  };

  const handleRegisterClick = () => {
    // Navigate to register page (to be created)
    navigate('/register');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <LoginForm onSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />
      </Container>
    </Box>
  );
}

export default Login;
