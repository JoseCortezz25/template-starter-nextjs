'use client';

import { InputHTMLAttributes, useState } from 'react';
import { EyePassword } from '../atoms/eye-password';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'password';
}

export const Input = ({ label, type = 'text', ...props }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="input-text">
      {label && <label htmlFor="">{label}</label>}
      <div className="input-text__input">
        {type === 'password' && (
          <EyePassword
            onToggle={() => setIsVisible(prev => !prev)}
            isVisible={isVisible}
          />
        )}
        <input
          {...(type === 'password' && {
            type: isVisible ? 'text' : 'password'
          })}
          {...props}
        />
      </div>
    </div>
  );
};
