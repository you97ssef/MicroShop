import { Body, Controller, Get, HttpCode, HttpException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AdminGuard, ShipperGuard, UserGuard } from 'src/guards/role.guard';
import { CheckoutDetails, NewPayment, ShipmentStatus } from 'src/helpers/pay-ship.helper';
import { OrderProService } from 'src/services/order-pro.service';
import { PayShipService } from 'src/services/pay-ship.service';
import { ProdCatService } from 'src/services/prod-cat.service';

@Controller()
export class PaymentShippingController {
    constructor(
        private service: PayShipService,
        private ordersService: OrderProService,
        private productsService: ProdCatService,
    ) {}

    @Post('checkout')
    @UseGuards(UserGuard)
    async checkout(@Request() req: any, @Body() details: CheckoutDetails) {
        const user = req.user;

        const order: any = await this.ordersService.cart(user.id);

        const products: any = await this.productsService.productsByIds(order.items.map((p: any) => p.productId));

        let amount = 0;

        for (const p of products.data) {
            const item = order.items.find((i: any) => i.productId === p.ID);
            amount += p.price * item.quantity;
        }
        
        const payment: NewPayment = {
            amount,
            user: user.id,
            order: order.id,
            method: details.method,
            address: details.address,
        };
        
        await this.ordersService.checkout(user.id);

        return await this.service.newPayment(payment);
    }

    @Get('payment')
    @UseGuards(AdminGuard)
    async payments() {
        return await this.service.payments(null);
    }

    @Get('cart/:id/payment')
    @UseGuards(AdminGuard)
    async orderPayment(@Param('id') id: number) {
        return await this.service.payments(id);
    }

    @Get('cart/:id/shipment')
    @UseGuards(AdminGuard)
    async orderShipment(@Param('id') id: number) {
        return await this.service.orderShipment(id);
    }

    @Get('shipment')
    @UseGuards(AdminGuard)
    async shipments() {
        return await this.service.shipments();
    }

    @Get('shipment/:code')
    async shipment(@Param('code') code: string) {
        return await this.service.checkShipment(code);
    }

    @Get('open-shipment')
    @UseGuards(ShipperGuard)
    async openShipments() {
        return await this.service.openShipments();
    }

    @Put('shipment/:id')
    @UseGuards(ShipperGuard)
    @HttpCode(204)
    async changeStatus(@Param('id') id: number, @Body('status') status: ShipmentStatus) {
        return await this.service.changeStatus(id, status);
    }
}
