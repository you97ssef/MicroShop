import { Controller, Post, Body, HttpCode, Get, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/role.guard';
import { NewCategory, NewProduct, UpdateAvailability, UpdateCategory, UpdateProduct } from 'src/helpers/prod-cat.helper';
import { ProdCatService } from 'src/services/prod-cat.service';

@Controller()
export class ProdCatController {
    constructor(private readonly service: ProdCatService) {}

    @Get('/categories')
    @HttpCode(200)
    async categories() {
        return await this.service.categories();
    }

    @Get('/categories/:id/products')
    @HttpCode(200)
    async products(@Param('id') id: number) {
        return await this.service.products(id);
    }

    @Post('/categories')
    @UseGuards(AdminGuard)
    async newCategory(@Body() data: NewCategory) {
        return await this.service.newCategory(data);
    }

    @Post('/products')
    @UseGuards(AdminGuard)
    async newProduct(@Body() data: NewProduct) {
        return await this.service.newProduct(data);
    }

    @Put('/categories/:id')
    @HttpCode(204)
    @UseGuards(AdminGuard)
    async updateCategory(@Param('id') id: number, @Body() data: UpdateCategory) {
        await this.service.updateCategory(id, data);
    }

    @Put('/products/:id')
    @HttpCode(204)
    @UseGuards(AdminGuard)
    async updateProduct(@Param('id') id: number, @Body() data: UpdateProduct) {
        await this.service.updateProduct(id, data);
    }

    @Delete('/categories/:id')
    @HttpCode(204)
    @UseGuards(AdminGuard)
    async deleteCategory(@Param('id') id: number) {
        await this.service.deleteCategory(id);
    }

    @Delete('/products/:id')
    @HttpCode(204)
    @UseGuards(AdminGuard)
    async deleteProduct(@Param('id') id: number) {
        await this.service.deleteProduct(id);
    }

    @Get('/search')
    @HttpCode(200)
    async search(@Query('q') query: string) {
        return await this.service.search(query);
    }

    @Get('/filter')
    @HttpCode(200)
    async filter(@Query('maxPrice') maxPrice: number, @Query('minPrice') minPrice: number) {
        return await this.service.filter(maxPrice, minPrice);
    }

    @Put('/products/:id/availability')
    @HttpCode(204)
    @UseGuards(AdminGuard)
    async updateAvailability(@Param('id') id: number, @Body() availability: UpdateAvailability) {
        await this.service.updateProduct(id, availability);
    }
}
