const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });


        return res.status(201).send({ success: true, data: { id: admin._id, email: admin.email } });




    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).send({ success: false, message: "Invalid Credentials" });

        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).send({ success: false, message: "Invalid Credentials" });

        }

        const token = jwt.sign(
            {id:admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
        )

        res.cookie('token', token, {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.status(200).send({ success: true, token });


    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });

    }
}

module.exports = { register, login }