import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AuthFormComponentProps {
  title: string;
  loading: boolean;
  error?: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: React.ReactNode;
  submitButtonText: string;
  loadingButtonText: string;
  alternateActionText: string;
  alternateActionLink: string;
}

const AuthFormComponent: React.FC<AuthFormComponentProps> = ({
  title,
  loading,
  error,
  onSubmit,
  children,
  submitButtonText,
  loadingButtonText,
  alternateActionText,
  alternateActionLink,
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: '#334155',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>

          <form onSubmit={onSubmit}>
            {children}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: '#3b82f6',
                '&:hover': {
                  bgcolor: '#2563eb',
                },
              }}
              disabled={loading}
            >
              {loading ? loadingButtonText : submitButtonText}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                href={alternateActionLink}
                sx={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {alternateActionText}
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthFormComponent; 