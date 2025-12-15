import { useState, FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegister } from '@/api';
import type { RegisterRequest } from '@/api';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useRegister({
    onSuccess: (data) => {
      console.log('Registration successful!', data);
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      registerMutation.mutate(formData);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Create your Soundboard account
        </Typography>

        {registerMutation.isError && (
          <Alert severity="error">
            {registerMutation.error?.message || 'Registration failed. Please try again.'}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          required
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          disabled={registerMutation.isPending}
          helperText="Minimum 3 characters"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={registerMutation.isPending}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={registerMutation.isPending}
          helperText="Minimum 8 characters"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  disabled={registerMutation.isPending}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={
            registerMutation.isPending ||
            !formData.username ||
            !formData.email ||
            !formData.password
          }
          sx={{ mt: 1 }}
        >
          {registerMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>

        {onLoginClick && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button
                variant="text"
                onClick={onLoginClick}
                disabled={registerMutation.isPending}
                sx={{ textTransform: 'none' }}
              >
                Login here
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default RegisterForm;
