const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})

let userRoutes = express.Router()
const SALT_ROUNDS = 6

//#1 - Retrieve All
//http://localhost:3000/users
userRoutes.route("/users").get(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").find({}).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One
//http://localhost:3000/users/12345
userRoutes.route("/users/:id").get(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").findOne({_id: new ObjectId(request.params.id)})
    // console.log(data.email)
    
    if (Object.keys(data).length >0) {
        response.json(data) // Displaying the id and its data connected
    } else {
        throw new Error("Data was not found :(")
    }
})

//#3 - Create one
userRoutes.route("/users").post(verifyToken, async (request, response) => {
    let db = database.getDb()

    const takenEmail = await db.collection("users").findOne({email: request.body.email})

    if (takenEmail) {
        response.json({message: "The email is taken"})
    } else {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        }
        let data = await db.collection("users").insertOne(mongoObject)
        response.json(data)
    }
})

//#4 - Update one
userRoutes.route("/users/:id").put(verifyToken, async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            joinDate: request.body.joinDate,
            posts: request.body.posts
        }
    }
    let data = await db.collection("users").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

//#5 - Delete one
userRoutes.route("/users/:id").delete(verifyToken, async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

//#6 - Login
userRoutes.route("/users/login").post(async (request, response) => {
    let db = database.getDb()

    const user = await db.collection("users").findOne({email: request.body.email})

    if (user) {
        let confirmation = await bcrypt.compare(request.body.password, user.password)
        if (confirmation) {
            const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "1h"})
            response.json({success: true, token})
        } else {
            response.json({success: false, message: "Incorrect Password"})
        }
    } else {
        response.json({success: false, message: "User not found"})
    }
})

function verifyToken(request, response, next) {
    const authHeaders = request.headers["Authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return response.status(401).json({ message: "Authentication token is missing" })
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({ message: "Invalid Token" })
        }
        request.body.user = user
        next()  
    })
}

module.exports = userRoutes