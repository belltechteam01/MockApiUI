import React from 'react';
import { FieldValues, useFormContext, UseFormReturn } from 'react-hook-form';

interface ConnectFormProps {
  children(props: UseFormReturn<FieldValues, any>): React.ReactNode;
}

const ConnectForm: React.FC<ConnectFormProps> = ({ children }) => {
  const methods = useFormContext();

  return <>{children({ ...methods })}</>;
};

export default ConnectForm;
