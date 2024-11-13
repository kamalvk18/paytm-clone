const router = require('express').Router()
const zod = require("zod")
const {JWT_SECRET} = require('../config')
const jwt = require("jsonwebtoken")
const {User, Account} = require('../db')

const {authMiddleware} = require("../middleware")

// ---------------
//  Sign Up route
// ---------------

const signupBody = zod.object({
    username: zod.string().trim(),
    firstName: zod.string().trim(),
    lastName: zod.string().trim(),
    password: zod.string().min(8),
})

router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body)
    if (!success){
        return res.status(411).json({message: "Invalid inputs"})
    }

    try {
        const foundUser = await User.findOne({username: req.body.username})
        if (foundUser){
            return res.status(411).json({message: "Email already taken"})
        }
        const newUser = await User.create(req.body)
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        })
        const token = jwt.sign({userId: newUser._id}, JWT_SECRET)
        res.status(200).json({message: "User created successfully", token: token})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
})

// ---------------
//  Sign In route
// ---------------

const signinBody = zod.object({
    username: zod.string().trim(),
    password: zod.string(),
})

router.post("/signin", async (req, res) => {
    const {success} = signinBody.safeParse(req.body)
    if (!success){
        return res.status(411).json({message: "Invalid inputs"})
    }

    try {
        const foundUser = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if (foundUser){
            const token = jwt.sign({userId: foundUser._id}, JWT_SECRET)
            return res.status(200).json({token: token})
        }
        res.status(411).json({
            message: "Error logging in"
        })
    } catch(e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
})

// ---------------
//  Update route
// ---------------

const updateBody = zod.object({
    firstName: zod.string().trim().optional(),
    lastName: zod.string().trim().optional(),
    password: zod.string().min(8).optional(),
})

router.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body)
    if (!success){
        return res.status(411).json({message: "Invalid inputs"})
    }

    try{
        await User.updateOne({ _id: req.userId }, req.body);
        res.status(201).json({message: "Updated successfully"})
    } catch(e){
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
})

module.exports = router;

// -----------------
//  Get Users route
// -----------------

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || ""
    try{
        const users = await User.find({
            $or:[{
                firstName:{
                    $regex:filter
                }
            }, {
                lastName:{
                    $regex:filter
                }
            }]
        })
        res.status(200).json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch(e){
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
})