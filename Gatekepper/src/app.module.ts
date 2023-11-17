import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { UserVerseService } from './services/user-verse.service';

@Module({
    imports: [],
    controllers: [TestController],
    providers: [TestService, UserVerseService],
})
export class AppModule {}
