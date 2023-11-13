const Payment = require("../data/models").Payment;

function makePayment(req, res) {
    const { body } = req;

    if (!body || !body.amount || !body.user || !body.order || !body.method) {
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

    Payment.create(newPayment)
        .then((payment) => {
            return res.status(201).json(payment);
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        });
}

module.exports = {
    makePayment,
};