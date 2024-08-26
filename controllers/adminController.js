const Admin = require('../models/admin');

exports.createAdmin = async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const newAdmin= await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAdmin= async (req, res) => {
    try {
        const admin = await Admin.find();
       
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

