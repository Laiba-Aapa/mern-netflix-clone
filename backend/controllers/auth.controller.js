import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {

    const { username, password, email } = req.body;

    try {
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are Required" })
        }
        //  if email is not valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false, message: "Invalid Email"
            })
        }
        // if password is not valid
        if (password.length < 6) {
            return res.status(400).json({
                success: false, message: "Password must be at least 6 characters long!"
            })
        }
        // if email already exists
        const existinguserByEmail = await User.findOne({ email: email })
        if (existinguserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        // if username already exists
        const existinguserByUsername = await User.findOne({ username: username })
        if (existinguserByUsername) {
            return res.status(400).json({ success: false, message: "userName already exists" })
        }

        // lets hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)


        // creating a new user
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
        // creating new user to User databse
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        })

        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()
        // remove pass from the response
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: ""
            }
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials!" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: "Invalid credentials!" })
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: ""
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "logout successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const authCheck = async (req, res) => {

    try {
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }


}