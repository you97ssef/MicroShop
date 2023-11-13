async function get(req, res) {
    res.send({ message: "Test works!", time: new Date() });
}

module.exports = {
    get,
};
