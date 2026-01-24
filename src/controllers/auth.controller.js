const UserModel = require("../models/User");


// SIGN UP
const signup = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);
};

const authController = {
    signup,
    login
};

module.exports = { authController };