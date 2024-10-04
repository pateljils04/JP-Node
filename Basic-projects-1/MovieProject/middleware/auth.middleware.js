const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const { token } = req.query;
    jwt.verify(token, 'jilszvm', async function (err, decoded) {
        if (err) {
            res.status(400).json({ message: "you not access the movies" })
        } else {
            next()
        }
    });
}

module.exports = auth;