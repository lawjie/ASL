
const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"})

let productsRoutes = express.Router()

// MAIN CRUD
//#1 - Retrieve All from Products Collection
productsRoutes.route("/products").get( async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Products").find({}).toArray()
    if (data.length >0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One PRODUCTS
productsRoutes.route("/products/:id").get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("Products").findOne({ _id: parseInt(request.params.id) });
    if (data) { // Simplified check for data existence
      response.json(data);
    } else {
      response.status(404).send("Data was not found :("); // Send a proper 404 status
    }
});

//#3 - Create one PRODUCTS
productsRoutes.route("/products").post(async (request, response) => {
  let db = database.getDb();

  const mongoObject = {
    _id: request.body._id,
    ModelName: request.body.ModelName,
    Brand: request.body.Brand,
    Reference: request.body.Reference,
    TotalCost: parseFloat(request.body.TotalCost),
    SellingPrice: parseFloat(request.body.SellingPrice),
    Profit: parseFloat(request.body.Profit),
    Loss: parseFloat(request.body.Loss)*(-1),
    ProfitMargin: parseFloat(request.body.ProfitMargin),
    Quality: request.body.Quality,
    Strap: request.body.Strap,
    DialColor: request.body.DialColor,
    Shape: request.body.Shape,
    Movement: request.body.Movement,
    CaseSize: request.body.CaseSize,
    WristSize: request.body.WristSize,
    Condition: request.body.Condition,
  };

  try {
    let data = await db.collection("Products").insertOne(mongoObject);
    response.status(201).json(data); // Send a 201 Created status on success
  } catch (error) {
    console.error("Error creating product:", error);
    response.status(500).json({ error: "Failed to create product" });
  }
});


//#4 - Update one PRODUCTS
productsRoutes.route("/products/:id").put(async (request, response) => {
  let db = database.getDb();

  const submitObject = {
    _id: request.body._id,
    ModelName: request.body.ModelName,
    Brand: request.body.Brand,
    Reference: request.body.Reference,
    TotalCost: parseFloat(request.body.TotalCost),
    SellingPrice: parseFloat(request.body.SellingPrice),
    Profit: parseFloat(request.body.Profit),
    Loss: parseFloat(request.body.Loss),
    ProfitMargin: parseFloat(request.body.ProfitMargin),
    Quality: request.body.Quality,
    Strap: request.body.Strap,
    DialColor: request.body.DialColor,
    Shape: request.body.Shape,
    Movement: request.body.Movement,
    CaseSize: request.body.CaseSize,
    WristSize: request.body.WristSize,
    Condition: request.body.Condition,
  };

  try {
    let data = await db.collection("Products").updateOne({ _id: parseFloat(request.params.id) }, { $set: submitObject });
    response.json(data);
    console.log("Product updated successfully:", data);
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ message: "Failed to update product", error: error.message });
  }
});


//#5 - Delete one PRODUCTS
productsRoutes.route("/products/:id").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Products").deleteOne({_id: parseInt(request.params.id)})
    response.json(data)
})








// COUNTER-----------------------------------------
// Get all COUNTER
productsRoutes.route("/productcounter").get( async (request, response) => {
  let db = database.getDb()
  let data = await db.collection("ProductCounter").find({}).toArray()
  if (data.length >0) {
      response.json(data)
  } else {
      throw new Error("Data was not found :(")
  }
})

// Update COUNTER (Increment)
productsRoutes.route("/productcounter/:id").put(async (request, response) => {
  let db = database.getDb();
  const productId = request.params.id;

  try {
    const data = await db.collection("ProductCounter").findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $inc: { count: 1 } }, // Increment the 'count' field by 1
      { returnDocument: 'after' } // Return the updated document
    );

    if (data.value) {
      response.json(data.value); // Send the updated document
      console.log("ProductCounter updated successfully:", data.value);
    } else {
      response.status(404).json({ message: "ProductCounter not found" });
    }
  } catch (error) {
    console.error("Error updating ProductCounter:", error);
    response.status(500).json({ message: "Failed to update ProductCounter", error: error.message });
  }
});









// SALES HISTORY -----------------------------------------------------------
productsRoutes.route("/saleshistory").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("SalesHistory").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }   
})


// INSERTING MANY
productsRoutes.route("/saleshistory").post(async(request,response) => {
  let db = database.getDb();

  const mongoObject = {
    SoldTo: request.body.SoldTo,
    SoldBy: request.body.SoldBy,
    WatchId: request.body.WatchId,
    ModelName: request.body.ModelName,
    Reference: request.body.Reference,
    TotalCost: parseFloat(request.body.TotalCost),
    SellingPrice: parseFloat(request.body.SellingPrice),
    Profit: parseFloat(request.body.Profit),
    Loss: parseFloat(request.body.Loss),
    ProfitMargin: parseFloat(request.body.ProfitMargin),
    Channel: request.body.Channel,
    Location: request.body.Location,
    DateSold: new Date(request.body.DateSold),
    Warranty: new Date(request.body.Warranty),
    SoldDuring: request.body.SoldDuring,
  };

  try {
    let data = await db.collection("SalesHistory").insertOne(mongoObject);
    response.status(201).json(data.ops[0]); // Send back the newly created document
  } catch (error) {
    console.error("Error creating product:", error);
    response.status(500).json({ error: "Failed to create product" });
  }
});












// TOKEN -------------------------------------------------------------------
async function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];

  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return response.status(401).json({ message: "Authentication token is missing or invalid format" });
  }

  const token = authHeaders.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    request.user = decoded; // Attach the decoded user information directly to the request object
    // console.log(request.user.name)    DISPLAYING THE NAME OF THE LOGGED IN ACCOUNT
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error for debugging
    return response.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = productsRoutes