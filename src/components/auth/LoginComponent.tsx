import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loginUser } from '../../features/auth/authAPI';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import AuthFormComponent from './AuthFormComponent';
import FormFieldComponent from '../common/FormFieldComponent';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
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
      await dispatch(loginUser(formData)).unwrap();
      showSuccessToast('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      showErrorToast(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthFormComponent
      title="Welcome Back"
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      submitButtonText="Login"
      loadingButtonText="Logging in..."
      alternateActionText="Don't have an account? Register"
      alternateActionLink="/register"
    >
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

export default LoginComponent; 