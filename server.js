require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const bodyParser = require('body-parser')
const storageRouter = require('./routers/storageRouter')
const sequelize = require('./models/connect')

const app = express()
const PORT = process.env.NODE_ENV==='production' ? process.env.PROD_PORT : process.env.DEV_PORT

app.use(bodyParser.json())

app.use('/api/v1', storageRouter)

app.listen(PORT, async () => {
    console.log(`Server run at port ${PORT} with ${process.env.STATUS} mode`)
    try {
        await sequelize.authenticate()
        console.log("Connection to the database is success")
    } catch (error) {
        console.error("Failed to connect to the database: ", error)
    }
})