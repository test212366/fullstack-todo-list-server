const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.post('/add', async (req, res) => {
    try {
        const {text, userId} = req.body
        const todo = await new Todo({
            text,
            owner: userId
        })
        await todo.save()

        res.json(todo)


    }catch (e) {
        console.log(e)
        }
    }
)

router.get('/', async (req, res) => {
        try {
            const {userId} = req.query

            const todo = await Todo.find({owner: userId})
            res.json(todo)
        }catch (e) {
            console.log(e)
        }
    }
)


module.exports = router