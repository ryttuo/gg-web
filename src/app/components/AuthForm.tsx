'use client';

import React, { useState } from 'react';
import { AuthResponse, AuthType, User } from '../common/interfaces';
import { AuthService } from '../services/auth.service';
import { useAppState } from '../context/appStateContext';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';

interface AuthFormProps {
  type: AuthType;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState<string>('');
  const authService = new AuthService();
  const { setAuth, setLoading } = useAppState();

  const handleAuth = async () => {
    try {
      setError('');
      setLoading(true);
      let authResponse: AuthResponse | null = null;
      if (type === 'signin') {
        const payload = {
          user: { email: formData.email, password: formData.password },
        };

        const response = await authService.signin(payload);
        authResponse = response as AuthResponse;
      } else {
        const response = await authService.signup({ user: formData });
        authResponse = response as AuthResponse;
      }
      setAuth(authResponse);

      router.push('/');
    } catch (error: any) {
      console.error('Error during authentication:', error);
      if (error.response?.status === 401) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <form className="space-y-4">
        {type === 'signup' && (
          <>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 mt-2">
              {error}
            </div>
          )}
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleAuth();
          }}
          variant="primary"
          className="w-full"
        >
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </Button>
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={() => {
              const path = type === 'signup' ? '/auth/signin' : '/auth/signup';
              router.push(path);
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {type === 'signup'
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </a>
        </div>
      </form>
    </div>
  );
};
