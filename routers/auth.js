const router = require("express").Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const users = ["Turki", "Ali", "Abdullah", "Abrar", "Hind", "moshera"]
// REGISTER
router.post("/register", async (req, res) => {

    const {username, password, isAdmin} = req.body
    if(users.includes(username)) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            password: passwordHash,
            isAdmin: isAdmin
        })

        try {
            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("Please call IT Departments")
    }
})



// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong Credentials...!")

        const passValidated = await bcrypt.compare(req.body.password, user.password)
        !passValidated && res.status(400).json("Wrong credentials...!")

        const accessToken = jwt.sign({
            username: user.username,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "2d" })

        res.status(200).json({ accessToken })
    } catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;