"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let payments = [];
        for (let i = 1; i <= 100; i++) {
            payments.push({
                userId: Math.floor(Math.random() * 100) + 3,
                orderId: i,
                createdAt: new Date(),
                updatedAt: new Date(),
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

        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
