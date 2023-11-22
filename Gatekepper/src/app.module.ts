import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { UserVerseService } from './services/user-verse.service';
import { ProdCatService } from './services/prod-cat.service';
import { OrderProService } from './services/order-pro.service';
import { PayShipService } from './services/pay-ship.service';

import { AuthController } from './controllers/auth.controller';
import { CategoriesProductsController } from './controllers/categories-products.controller';
import { OrdersController } from './controllers/orders.controller';
import { PaymentShippingController } from './controllers/payment-Shipping.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env.development',
        }),
    ],
    controllers: [AuthController, CategoriesProductsController, OrdersController, PaymentShippingController],
    providers: [UserVerseService, ProdCatService, OrderProService, PayShipService],
})
export class AppModule {}
