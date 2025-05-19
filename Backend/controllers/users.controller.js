import jwt from "jsonwebtoken";
import usersModel from "../models/users.model";

export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.find();
        return res.status(200).json({
            data: users,
            message: "Users fetched successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

export const createUser = async (req, res) => {
    const { fullName, email, password, userId } = req.body;

    if (!fullName) {
        return res.status(400).json({
            error: true,
            message: "Fill Name is required"
        })
    }

    if (!email) {
        return res.status(400).json({
            error: true,
            message: "Email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        })
    }

    const isUser = await usersModel.findOne({ email: email })

    if (isUser) {
        return res.status(400).json({
            error: true,
            message: "User already exist"
        })
    }

    const user = new usersModel({
        fullName,
        email,
        password
    })

    await user.save()

    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m"
    })

    return res.json({
        error: false,
        user,
        token,
        message: "Registration Successfully"
    })
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required",
                success: false
            })
        }
        const userInfo = await usersModel.findOne({ email: email })
        if (!userInfo) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        }
        if (userInfo.email == email && userInfo.password == password) {
            const user = { user: userInfo };
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "36000m",
            });
            return res.json({
                error: false,
                message: "Login Successfully",
                email,
                token
            })
        } else {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
};

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existUser = await usersModel.findOne({ email: email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        const userData = await usersModel.create({
            fullName: fullName,
            email: email,
            password: password
        })

        const token = jwt.sign({
            userData
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m"
        })

        return res.status(201).json({
            data: userData,
            token,
            message: "User created successfully",
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await usersModel.deleteOne({ _id: id });
        return res.status(200).json({
            data: data,
            message: "User deleted successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await usersModel.findById({ _id: id });
        return res.status(200).json({
            data: data,
            message: "User fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getUser = async (req, res) => {
    try {
        console.log(req.user)
        const { user } = req.user;    // Destructuring the user object
        console.log("User from token:", user);  // Check if email is present

        // Find user in the database by email
        const isUser = await usersModel.findOne({ email: user.email });
        console.log("Result of the query:", isUser);  // Log the query result

        if (!isUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            user: isUser,
            message: "User fetched successfully",
            success: true
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        console.log(req.user)
        const { user } = req.user;
        const { fullName, email, password } = req.body;
        const userData = await usersModel.updateOne({ _id: user.id }, { $set: { fullName: fullName, email: email, password: password } })
        return res.status(200).json({
            data: userData,
            message: "User updated successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}