const Payment = require("../data/models").Payment;

async function get(req, res) {
    const payments = await Payment.findAll();

    res.send({ message: "Test works!", time: new Date(), payments: payments });
}

function getId(req, res) {
    res.send({ message: `Test ${req.params.id} works!`, time: new Date() });
}

function post(req, res) {
    const { body, headers } = req;

    if (!body.test) {
        res.status(400).send({
            message: "Missing required field: test",
        });
        return;
    }

    res.send({
        message: "Test Post works!",
        time: new Date(),
        body: body,
        headers: headers,
        int: int,
    });
}

module.exports = {
    get,
    getId,
    post,
};
