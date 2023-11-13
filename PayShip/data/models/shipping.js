"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Shipping extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Shipping.init(
        {
            orderId: DataTypes.INTEGER,
            address: DataTypes.STRING(512),
            status: DataTypes.STRING(255),
            shippedOn: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Shipping",
        }
    );
    return Shipping;
};
