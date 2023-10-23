const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/registration',[
    check('email', 'trow email').isEmail(),
    check('password', 'trow pass').isLength({min: 6, max:25})
],async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'trow email or password'})
        }
        const {email, password} = req.body

        const isUsed = await User.findOne({email})

        if(isUsed) {
            return res.status(300).json({message:'email used'})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email, password:hashPassword
        })

        await user.save()
        res.status(201).json({message: 'user was created'})
    } catch (e) {
        console.log(e)
    }
})
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

      if(!user) return res.status(404).json({message: 'email is not defined'})

        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: 'passwords not currently'})
        }
        const jwtS = '88fh389632upod5sja6hkg53434e98l'
        const token = jwt.sign(
            {userid: user.id},
            jwtS,
            {expiresIn: '1h'}
        )
        res.json({token, userid: user.id})
    } catch (e) {
        console.log(e)
    }
})



module.exports = router