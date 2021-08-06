import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import devBundle from "./devBundle.js";
import template from "./../template.js";

const app = express()
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSetup'

MongoClient.connect(
    url, 
    {
        useUnifiedTopology: true
    },
    (err, db) => {
        if(err) {
            console.log(err)
        }

        console.log("Connected successfully to mongodb server")
        // db.close()
})

const CURRENT_WORKING_DIR = process.cwd()

devBundle.compile(app)

app.use(
    "./dist", 
    express.static(path.join(
        CURRENT_WORKING_DIR, 
        "dist"
    ))
) //serve static files from the dist folder

app.get("/", (req, res) => {
    res.status(200).send(template())
}) // render template.js when server receives req at root url

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})