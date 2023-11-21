import { Module } from '@nestjs/common';
import { UserVerseService } from './services/user-verse.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { CategoriesProductsController } from './controllers/categories-products.controller';
import { ProdCatService } from './services/prod-cat.service';
import { OrderProService } from './services/order-pro.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env.development',
        }),
    ],
    controllers: [AuthController, CategoriesProductsController, OrdersController],
    providers: [UserVerseService, ProdCatService, OrderProService],
})
export class AppModule {}
