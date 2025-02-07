export type AuthType = 'signin' | 'signup';

export type AlertType = 'guard' | 'time' | 'misbehavior' | 'altercation' |'suspicious' | 'other';

export interface User {
  id?: number;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: string;
  password_digest?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Auth {
  user: User;
}

export interface AuthResponse {
  user: User;
  jwt: string;
}

export interface Alert {
  id: number;
  name: string;
  alert_type: string;
  status: boolean;
  description: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface TitleProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}
