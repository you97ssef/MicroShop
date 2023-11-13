"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let payments = [];
        let paymentMethods = ["credit_card", "cash_on_delivery", "paypal"];
        for (let i = 1; i <= 100; i++) {
            payments.push({
                userId: Math.floor(Math.random() * 100) + 3,
                orderId: i,
                amount: Math.random() * 1000,
                createdAt: new Date(),
                updatedAt: new Date(),
                method: paymentMethods[Math.floor(Math.random() * 3)],
            });
        }
        await queryInterface.bulkInsert("Payments", payments);

        let shipments = [];
        let statuses = ["pending", "shipped", "delivered"];
        for (let i = 1; i <= 100; i++) {
            shipments.push({
                orderId: i,
                address: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                status: statuses[Math.floor(Math.random() * 3)],
                shippedOn: new Date(),
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
