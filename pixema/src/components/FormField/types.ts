import React from 'react';

export type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormFieldProps {
  type?: string;
  className?: string;
  name?: string;
  label?: string;
  value: string;
  id?: string;
  placeholder?: string;
  ref?: React.Ref<FormFieldElement>;
  passwordToggle?: boolean;
  onChange: (event: React.ChangeEvent<FormFieldElement>) => void;
}
