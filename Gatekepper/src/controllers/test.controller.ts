import { Controller, Get } from '@nestjs/common';
import { TestService } from '../services/test.service';

@Controller()
export class TestController {
    constructor(private readonly service: TestService) {}

    @Get('/test')
    getHello() {
        return this.service.getHello();
    }
}
