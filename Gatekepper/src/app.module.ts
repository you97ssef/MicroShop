import { Module } from '@nestjs/common';
import { UserVerseService } from './services/user-verse.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env.development',
        }),
    ],
    controllers: [AuthController],
    providers: [UserVerseService],
})
export class AppModule {}
