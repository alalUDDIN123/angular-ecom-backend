
const UserModel = require("../models/User");
const { sendResponse } = require("../utils/apiResponse.ts");
// SIGN UP
const signup = async (req, res) => {
    try {
        const { name, email, password, role_type } = req.body;

        // 1️⃣ Check existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return sendResponse(res, {
                success: false,
                statusCode: 409,
                message: "User already exists. Please login",
                data: null
            });
        }

        // 2️⃣ Create user
        const user = await UserModel.create({
            name,
            email,
            password,
            role_type
        });

        // 3️⃣ Remove password from response
        const { password: _, ...userData } = user.toObject();

        // 4️⃣ Success response
        return sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: userData
        });

    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Registration failed",
            errors: error.message
        });
    }
};



// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return sendResponse(res, {
                success: false,
                statusCode: 404,
                message: "Provided email is not registered",
                data: null
            });
        }

        // 2️⃣ Password check (plain for now)
        if (user.password !== password) {
            return sendResponse(res, {
                success: false,
                statusCode: 401,
                message: "Invalid password",
                data: null
            });
        }

        // 3️⃣ Remove password
        const { password: _, ...userData } = user.toObject();

        // 4️⃣ Success
        return sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Login successful",
            data: userData
        });

    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Login failed",
            errors: error.message
        });
    }
};

// admin get all users 
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// admin delete all users 
const deleteAllUsers = async (req, res) => {
    try {
        await UserModel.deleteMany({});
        res.json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const authController = {
    signup,
    login,
    getAllUsers,
    deleteAllUsers
};

module.exports = { authController };