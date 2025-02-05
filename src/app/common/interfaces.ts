export type AuthType = 'signin' | 'signup';


export interface User {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
}

export interface Auth {
    user : User
}