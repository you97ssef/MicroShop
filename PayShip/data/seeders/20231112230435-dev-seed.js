"use strict";

const { shippingStatus, paymentMethods } = require('../enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const paidOrders = process.env.NODE_ENV === "production" ? 1000 : 500;
        const users = process.env.NODE_ENV === "production" ? 200 : 100;
        const startingUserId = process.env.NODE_ENV === "production" ? 3 : 3;

        let payments = [];
        let methods = [paymentMethods.CREDIT_CARD, paymentMethods.CASH_ON_DELIVERY, paymentMethods.PAYPAL];
        for (let i = 1; i <= paidOrders; i++) {
            payments.push({
                userId: Math.floor(Math.random() * users) + startingUserId,
                orderId: i,
                amount: Math.random() * 1000,
                createdAt: new Date(),
                updatedAt: new Date(),
                method: methods[Math.floor(Math.random() * 3)],
            });
        }
        await queryInterface.bulkInsert("Payments", payments);

        let shipments = [];
        let statuses = [shippingStatus.PENDING, shippingStatus.SHIPPING, shippingStatus.DELIVERED];
        for (let i = 1; i <= paidOrders; i++) {
            shipments.push({
                orderId: i,
                address: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                status: statuses[Math.floor(Math.random() * 3)],
                shippedOn: new Date(),
                code: Math.random().toString(36).substring(2, 15),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert("Shippings", shipments);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Payments", null, {});
        await queryInterface.bulkDelete("Shippings", null, {});
    },
};
