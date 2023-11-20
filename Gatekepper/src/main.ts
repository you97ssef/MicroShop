import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpService } from '@nestjs/axios';
import { AxiosHelper } from './helpers/axios.helper';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    AxiosHelper.configure(new HttpService());

    await app.listen(3000);
}

bootstrap();
