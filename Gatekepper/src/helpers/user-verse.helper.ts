export interface RegisterDto {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface LoginDto {
    usernameOrEmail: string;
    password: string;
}

export enum UserRole {
    USER = 'user',
    SHIPPER = 'shipper',
    ADMIN = 'admin',
}
