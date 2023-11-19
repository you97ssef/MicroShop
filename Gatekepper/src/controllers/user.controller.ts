import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dtos/user.dto';
import { UserVerseService } from 'src/services/user-verse.service';

@Controller()
export class UserController {
    constructor(private readonly service: UserVerseService) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() credentials: LoginDto) {
        return await this.service.login(credentials);
    }

    @Post('/register')
    async register(@Body() data: RegisterDto) {
        return this.service.register(data);
    }
}
