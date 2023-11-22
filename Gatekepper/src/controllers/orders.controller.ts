import { Body, Controller, Delete, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/role.guard';
import { Item } from 'src/helpers/order-pro.helper';
import { OrderProService } from 'src/services/order-pro.service';

@Controller()
export class OrdersController {
    constructor(private readonly service: OrderProService) {}

    @Get('/cart')
    @UseGuards(UserGuard)
    async order(@Request() req: any) {
        return await this.service.cart(req.user.id);
    }

    @Post('/cart')
    @UseGuards(UserGuard)
    async newOrder(@Request() req: any, @Body() data: Item[]) {
        return await this.service.newCart(req.user.id, data);
    }

    @Post('/item')
    @UseGuards(UserGuard)
    @HttpCode(204)
    async addItem(@Request() req: any, @Body() data: Item) {
        return await this.service.addItem(req.user.id, data);
    }

    @Delete('/item/:productId')
    @UseGuards(UserGuard)
    @HttpCode(204)
    async removeItem(@Request() req: any, @Param('productId') productId: number) {
        return await this.service.removeItem(req.user.id, productId);
    }
}
