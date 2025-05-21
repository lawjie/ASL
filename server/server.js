const connect = require("./connect") // to get the connectToServer()
const express = require("express")
const cors = require("cors")
const products = require("./productRoutes") // for mounting posts
const users = require("./userRoutes")
const productcounter = require("./productRoutes")
const salesHistory = require("./productRoutes") // for mounting posts
const app = express()
const PORT = 3000

app.use(cors()) // SINCE FRONT AND BACK ARE RUN IN DIFFERENT PORTS AND WE NEED TO ACCESS IT
app.use(express.json()) // parsing express in json format
app.use(products) // This allows us to let the frontend access the backend
app.use(users)
app.use(productcounter)
app.use(salesHistory)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT} NICE`)
})
