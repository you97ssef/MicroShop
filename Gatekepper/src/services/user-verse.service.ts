import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dtos/user.dto';
import { UserRole } from 'src/helpers/user.helper';

@Injectable()
export class UserVerseService {
    login(login: LoginDto) {

    }

    register(register: RegisterDto) {

    }

    verify(role: UserRole) {

    }
}
