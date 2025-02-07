import React from 'react';
import { ButtonProps } from '@/app/common/interfaces';

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${
        variant === 'primary'
          ? 'border-blue-500 text-blue-700 hover:bg-blue-50'
          : variant === 'secondary'
          ? 'border-red-500 text-red-700 hover:bg-red-50'
          : 'border-gray-500 text-gray-700 hover:bg-gray-50'
      } font-semibold py-1 px-3 rounded-lg border-2 ${className}`}
    >
      {children}
    </button>
  );
};
