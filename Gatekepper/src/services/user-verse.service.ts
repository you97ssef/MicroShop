import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, UserRole } from 'src/helpers/user-verse.helper';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserVerseService {
    private readonly url: string = process.env.USER_VERSE;

    constructor(private readonly api: HttpService) { }

    async login(login: LoginDto) {
        return await firstValueFrom(this.api.post(`${this.url}/login`, {username_or_email: login.usernameOrEmail, password: login.password}));
    }

    async register(register: RegisterDto) {
        return await firstValueFrom(this.api.post(`${this.url}/register`, register));
    }

    async verify(role: UserRole, token: string) {
        return await firstValueFrom(
            this.api.get(`${this.url}/${role}`, {
                headers: {
                    Authorization: token,
                },
            }),
        );
    }
}
