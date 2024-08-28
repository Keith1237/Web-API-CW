const Admin = require('../models/admin');

exports.createAdmin = async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const isAdmin = await Admin.findOne({ username: req.body.username });
        if (isAdmin) {
            return res.status(400).json({ message: 'Admin with this user name already exists.' });
        }
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

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOneAndDelete({ username: req.query.username , password: req.query.password });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};