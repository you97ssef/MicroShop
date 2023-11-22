export interface NewPayment {
    amount: number;
    user: number;
    order: number;
    method: PaymentMethod;
    address: string;
}

export enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    CASH_ON_DELIVERY = "cash_on_delivery",
    PAYPAL = "paypal"
}

export enum ShipmentStatus {
    PENDING = "pending",
    SHIPPING = "shipping",
    DELIVERED = "delivered"
}

export interface CheckoutDetails {
    method: PaymentMethod;
    address: string;
}