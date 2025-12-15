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
import { useLogin } from '@/api';
import type { LoginRequest } from '@/api';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin({
    onSuccess: (data) => {
      console.log('Login successful!', data);
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      loginMutation.mutate(credentials);
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
          Login
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Sign in to your Soundboard account
        </Typography>

        {loginMutation.isError && (
          <Alert severity="error">
            {loginMutation.error?.response?.data?.message || 'Invalid username or password'}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          required
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          disabled={loginMutation.isPending}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          required
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          disabled={loginMutation.isPending}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  disabled={loginMutation.isPending}
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
          disabled={loginMutation.isPending || !credentials.username || !credentials.password}
          sx={{ mt: 1 }}
        >
          {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>

        {onRegisterClick && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button
                variant="text"
                onClick={onRegisterClick}
                disabled={loginMutation.isPending}
                sx={{ textTransform: 'none' }}
              >
                Register here
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default LoginForm;
