export type AuthType = 'signin' | 'signup';


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
    user : User
}

export interface AuthResponse {
    user: User;
    jwt: string;
}
