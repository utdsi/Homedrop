const { UserModel } = require("../model/user.model.js")

require('dotenv').config()

const jwt = require("jsonwebtoken")

exports.auth = async (req, res) => {

    const { email } = req.body

    try {

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.status(200).json({ message: 'Email exists in the database.' })
        } else {
            const new_user = new UserModel({ email,})
            await new_user.save()
            const token = jwt.sign({ "email": email}, process.env.jwtpasscode)
            return res.status(200).json({ "email": email, "token": token });

        }

    } catch (error) {

        console.log(error)
        return res.status(500).json({ error: 'Server error.' });

    }



}



