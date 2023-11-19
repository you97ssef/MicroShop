import { Module } from '@nestjs/common';
import { UserVerseService } from './services/user-verse.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { ProdCatController } from './controllers/prod-cat.controller';
import { ProdCatService } from './services/prod-cat.service';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env.development',
        }),
    ],
    controllers: [AuthController, ProdCatController],
    providers: [UserVerseService, ProdCatService],
})
export class AppModule {}
