const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Assuming you have an admin model

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin with the username already exists
        const isAdmin = await Admin.findOne({ username });
        if (isAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds, adjust as needed
        console.log(hashedPassword);
        const admin = new Admin({
            username,
            password: hashedPassword, // Store the hashed password
        });

        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.createAdmin = async (req, res) => {
//     const admin = new Admin({
//         username: req.body.username,
//         password: req.body.password
//     });

//     try {
//         const isAdmin = await Admin.findOne({ username: req.body.username });
//         if (isAdmin) {
//             return res.status(400).json({ message: 'Admin with this user name already exists.' });
//         }
//         const newAdmin= await admin.save();
//         res.status(201).json(newAdmin);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

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