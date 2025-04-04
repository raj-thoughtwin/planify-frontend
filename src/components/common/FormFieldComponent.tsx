import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldComponentProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  sx,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      sx={{ mb: 3, ...sx }}
      {...props}
    />
  );
};

export default FormFieldComponent; 