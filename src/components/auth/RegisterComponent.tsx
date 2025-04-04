import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../features/auth/authAPI';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import AuthFormComponent from './AuthFormComponent';
import FormFieldComponent from '../common/FormFieldComponent';

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(registerUser(formData)).unwrap();
      showSuccessToast('Registration successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      showErrorToast(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthFormComponent
      title="Create Account"
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      submitButtonText="Register"
      loadingButtonText="Creating Account..."
      alternateActionText="Already have an account? Login"
      alternateActionLink="/login"
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormFieldComponent
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="Enter your first name"
          disabled={loading}
        />

        <FormFieldComponent
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Enter your last name"
          disabled={loading}
        />
      </Box>

      <FormFieldComponent
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        disabled={loading}
      />

      <FormFieldComponent
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
        disabled={loading}
      />
    </AuthFormComponent>
  );
};

export default RegisterComponent; 