const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("token not available");
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = payload;

        if (!id) {
            throw new Error("Invalid token");
        }

        const result = await Admin.findById(id);

        if (payload.role != 'admin') {
            throw new Error("not admin");
        }

        if (!result) {
            throw new Error("Admin does not exist");
        }

        req.result = result;

        next();


    } catch (err) {

        res.status(401).send("Error " + err.message);
        
        console.log("error :" + err);
    }
}

module.exports = adminMiddleware;