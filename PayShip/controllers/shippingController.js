const { Op } = require("sequelize");

const Shipping = require("../data/models").Shipping;

async function getShipment(req, res) {
    if (!req.params.id) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const shipping = await Shipping.findByPk(req.params.id);

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" });
    }

    return res.status(200).json(shipping);
}

async function checkStatus(req, res) {
    if (!req.params.code) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const shipping = await Shipping.findOne({ where: { code: req.params.code } });

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" });
    }

    return res.status(200).json(shipping);
}

async function changeStatus(req, res) {
    const { body } = req;

    if (!req.params.id || !body.status) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const shipping = await Shipping.findByPk(req.params.id);

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" });
    }

    shipping.status = req.body.status;
    if (req.body.status === "Delivered" && !shipping.shippedOn) {
        shipping.shippedOn = new Date();
    }
    await shipping.save();

    return res.status(204).json();
}

async function shipments(req, res) {
    const shipments = await Shipping.findAll();

    return res.status(200).json(shipments);
}

async function order(req, res) {
    const { orderId } = req.params;

    const shipping = await Shipping.findOne({ where: { orderId } });

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" });
    }

    return res.status(200).json(shipping);
}

async function openShipments(req, res) {
    const shipments = await Shipping.findAll({
        where: { status: { [Op.ne]: "delivered" } },
    });

    return res.status(200).json(shipments);
}

module.exports = {
    checkStatus,
    changeStatus,
    shipments,
    order,
    openShipments,
    getShipment
};
