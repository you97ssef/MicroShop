async function get(req, res) {
    res.send({ message: "Test works!", time: new Date() });
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

export default {
    get,
    getId,
    post,
};
