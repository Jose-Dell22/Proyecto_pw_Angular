
export interface LoginRequest {
    email: string;
    password: string;
    roles: string[];
}

export interface JwtResponse {
    token: string;
    type: string;
    id: number;
    email: string;
    roles: string[];
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: string;
    projectIds: number[];
}

export interface RegisterResponse {
    message: string;
    success: boolean;
}

export interface LoginResponse {
    token: string;
    type: string;
    id: number;
    email: string;
    roles: string[];
}