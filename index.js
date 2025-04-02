import bodyParser from "body-parser";
import express from "express";
import { configDotenv } from "dotenv"
import connect from "./db/db.js";
import route from "./routes/router.js";
import bookroute from "./routes/bookRoute.js";
configDotenv()

const app = express()

const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', route)

app.use('/books', bookroute)

connect().then(() =>
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
);