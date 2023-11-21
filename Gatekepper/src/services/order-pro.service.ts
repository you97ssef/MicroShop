import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/helpers/order-pro.helper';

@Injectable()
export class OrderProService {
    private readonly url: string = process.env.ORDER_PRO;

    constructor(private readonly api: HttpService) { }

    async cart(userId: number) {
        return await firstValueFrom(this.api.get(`${this.url}/Cart/${userId}`));
    }

    async newCart(userId: number, items: Item[]) {
        return await firstValueFrom(this.api.post(`${this.url}/Cart/${userId}`, items));
    }

    async checkout(userId: number) {
        return await firstValueFrom(this.api.get(`${this.url}/Cart/${userId}/checkout`));
    }

    async addItem(userId: number, item: Item) {
        return await firstValueFrom(this.api.post(`${this.url}/Item/${userId}`, item));
    }

    async removeItem(userId: number, productId: number) {
        return await firstValueFrom(this.api.delete(`${this.url}/Item/${userId}`, { data: { productId } }));
    }
}
