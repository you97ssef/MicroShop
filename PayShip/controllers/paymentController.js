const Payment = require("../data/models").Payment;
const Shipping = require("../data/models").Shipping;

async function makePayment(req, res) {
    const { body } = req;

    if (
        !body ||
        !body.amount ||
        !body.user ||
        !body.order ||
        !body.method ||
        !body.address
    ) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const newPayment = {
        amount: body.amount,
        userId: body.user,
        orderId: body.order,
        method: body.method,
    };

    const payment = await Payment.create(newPayment);

    const newShipping = {
        orderId: body.order,
        address: body.address,
        status: "Pending",
    };

    const shipping = await Shipping.create(newShipping);

    return res.status(201).json({
        payment,
        shipping,
    });
}

module.exports = {
    makePayment,
};
