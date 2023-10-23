const expres = require('express')
const mongoose = require('mongoose')
const app = expres()

const URL_DB = 'mongodb+srv://qwerty:qwerty123@cluster0.xxynw.mongodb.net/USERS?retryWrites=true&w=majority'

app.use(expres.json({extended: true}))

app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/todo/', require('./routes/todo.routes'))

const PORT = 5000

const start = async () => {
        try {
            await mongoose.connect(URL_DB)
            app.listen(PORT, () => {

                console.log("server was started")
            })
        } catch (e) {
            console.log("server error:", e)
        }
}
start()
