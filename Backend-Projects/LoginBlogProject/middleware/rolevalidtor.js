const Rolevalidator = (req, res, next) => {
    const { role } = req.user;
    if (role != "Admin") {
        return res.status(400).json({ message: "You not Access Only Admin Can Access" })
    }
    else {
        next();

    }
}

module.exports = Rolevalidator