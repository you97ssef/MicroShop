const Shipping = require('../data/models').Shipping

async function checkStatus(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ message: "Missing required information" })
    }

    const shipping = await Shipping.findByPk(req.params.id)

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" })
    }

    return res.status(200).json(shipping)
}

async function changeStatus(req, res) {
    const { body } = req

    if (!req.params.id || !body.status) {
        return res.status(400).json({ message: "Missing required information" })
    }

    const shipping = await Shipping.findByPk(req.params.id)

    if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" })
    }

    shipping.status = req.body.status
    if (req.body.status === "Shipped" && !shipping.shippedOn) {
        shipping.shippedOn = new Date()
    }
    await shipping.save()

    return res.status(204).json()
}

module.exports = {
    checkStatus,
    changeStatus
}