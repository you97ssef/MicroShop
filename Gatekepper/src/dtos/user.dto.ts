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
