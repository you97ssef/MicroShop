import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { NewPayment, ShipmentStatus } from 'src/helpers/pay-ship.helper';

@Injectable()
export class PayShipService {
    private readonly url: string = process.env.PAY_SHIP;

    constructor(private readonly api: HttpService) { }

    async newPayment(data: NewPayment) {
        return await firstValueFrom(this.api.post(`${this.url}/payment`, data));
    }

    async payments(orderId: number | null) {
        if (orderId) {
            return await firstValueFrom(this.api.get(`${this.url}/order-payment/${orderId}`));
        }

        return await firstValueFrom(this.api.get(`${this.url}/payment`));
    }

    async shipment(id: number) {
        return await firstValueFrom(this.api.get(`${this.url}/shipping/${id}`));
    }
    
    async checkShipment(code: string) {
        return await firstValueFrom(this.api.get(`${this.url}/check/${code}`));
    }

    async shipments() {
        return await firstValueFrom(this.api.get(`${this.url}/shipping`));
    }

    async openShipments() {
        return await firstValueFrom(this.api.get(`${this.url}/open-shipping`));
    }

    async changeStatus(id: number, status: ShipmentStatus) {
        return await firstValueFrom(this.api.put(`${this.url}/shipping/${id}`, { status }));
    }

    async orderShipment(orderId: number) {
        return await firstValueFrom(this.api.get(`${this.url}/order-shipping/${orderId}`));
    }
}
