import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { UserVerseService } from './services/user-verse.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        HttpModule, 
        ConfigModule.forRoot({
            envFilePath: '.env.development',
        })
    ],
    controllers: [TestController, UserController],
    providers: [TestService, UserVerseService],
})
export class AppModule {}
