import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    getHello() {
        return {
            message: 'From test, Hello World!',
            date: new Date(),
        };
    }
}
