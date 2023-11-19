import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { LoginDto, RegisterDto } from 'src/dtos/user.dto';
import { UserRole } from 'src/helpers/user.helper';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserVerseService {
    private readonly url: string = process.env.USER_VERSE;
    private readonly logger = new Logger(UserVerseService.name);

    constructor(private readonly api: HttpService) { 
        api.axiosRef.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error: AxiosError) => {
                this.logger.error(error);
                throw new HttpException(error.response.data, error.response?.status);
            },
        );
    }

    async login(login: LoginDto) {
        return await firstValueFrom(this.api.post(`${this.url}/login`, login));
    }

    async register(register: RegisterDto) {
        return await firstValueFrom(this.api.post(`${this.url}/register`, register));
    }

    async verify(role: UserRole, token: string) {
        return await firstValueFrom(this.api.get(`${this.url}/${role}`, {
            headers: {
                Authorization: token,
            },
        }));
    }
}
