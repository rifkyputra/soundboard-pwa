import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import RegisterForm from '@/components/RegisterForm';
import { authService } from '@/api';

function Register() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleRegisterSuccess = () => {
    // Redirect to home page after successful registration
    // (tokens are already saved by the API service)
    navigate('/');
  };

  const handleLoginClick = () => {
    // Navigate to login page
    navigate('/login');
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
        <RegisterForm onSuccess={handleRegisterSuccess} onLoginClick={handleLoginClick} />
      </Container>
    </Box>
  );
}

export default Register;
