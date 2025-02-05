import React, { useState } from "react";
import { User } from "../common/interfaces";
import { AuthService } from "../services/auth.service";

interface AuthFormProps {
  type: 'signin' | 'signup';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const authService = new AuthService();

  const handleAuth = async () => {
    try {
      if (type === 'signin') {
        const payload = { user: { email: formData.email, password: formData.password } };
        await authService.signin(payload);
    } else {
        await authService.signup({ user: formData });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-4">
        {type === 'signup' && (
          <>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({...prev, first_name: e.target.value}))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({...prev, last_name: e.target.value}))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAuth();
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
