import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { NewCategory, NewProduct, UpdateCategory, UpdateProduct } from 'src/helpers/prod-cat.helper';

@Injectable()
export class ProdCatService {
    private readonly url: string = process.env.PROD_CAT;
    private readonly logger = new Logger(ProdCatService.name);

    constructor(private readonly api: HttpService) {
        api.axiosRef.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error: AxiosError) => {
                this.logger.error(error);
                throw new HttpException(error.response.data, error.response?.status);
            },
        );
    }

    async categories() {
        return await firstValueFrom(this.api.get(`${this.url}/categories`));
    }

    async newCategory(data: NewCategory) {
        return await firstValueFrom(this.api.post(`${this.url}/categories`, data));
    }

    async updateCategory(id: number, data: UpdateCategory) {
        return await firstValueFrom(this.api.put(`${this.url}/categories/${id}`, data));
    }

    async deleteCategory(id: number) {
        return await firstValueFrom(this.api.delete(`${this.url}/categories/${id}`));
    }

    async products(categoryId: number) {
        return await firstValueFrom(this.api.get(`${this.url}/categories/${categoryId}/products`));
    }

    async newProduct(data: NewProduct) {
        return await firstValueFrom(this.api.post(`${this.url}/products`, data));
    }

    async updateProduct(id: number, data: UpdateProduct) {
        return await firstValueFrom(this.api.put(`${this.url}/products/${id}`, data));
    }

    async deleteProduct(id: number) {
        return await firstValueFrom(this.api.delete(`${this.url}/products/${id}`));
    }

    async search(query: string) {
        return await firstValueFrom(this.api.get(`${this.url}/search?q=${query}`));
    }

    async filter(maxPrice: number, minPrice: number) {
        return await firstValueFrom(this.api.get(`${this.url}/filter?max=${maxPrice}&min=${minPrice}`));
    }
}
