import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { UserGuard } from "src/guards/role.guard";
import { Item } from "src/helpers/order-pro.helper";
import { OrderProService } from "src/services/order-pro.service";

@Controller()
export class OrdersController {

    constructor(private readonly service: OrderProService) { }

    @Get('/cart')
    @UseGuards(UserGuard)
    async order(@Request() req: any) {
        return this.service.cart(req.user.id);
    }

    @Post('/cart')
    @UseGuards(UserGuard)
    async newOrder(@Request() req: any, @Body() data: Item[]) {
        return this.service.newCart(req.user.id, data);
    }

    @Post('/item')
    @UseGuards(UserGuard)
    async addItem(@Request() req: any, @Body() data: Item) {
        return this.service.addItem(req.user.id, data);
    }

    @Delete('/item/:productId')
    @UseGuards(UserGuard)
    async removeItem(@Request() req: any, @Param('productId') productId: number) {
        return this.service.removeItem(req.user.id, productId);
    }
}