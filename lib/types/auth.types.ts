export interface User {
    id?: number;
    username: string;
    email?: string;
    fullname?: string;
    avatar?: string;
};

export interface RegisterRequest {
    fullname: string;
    email: string;
    password: string;
    repeat_password: string;
    username: string;
};

export interface RegisterResponse {
    id: number;
    username: string;
    access?: string;
};

export interface LoginRequest {
    username: string;
    password: string;
};

export interface LoginResponse {
    access: string;
    username: string;
    avatar?: string;
};

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
};