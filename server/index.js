import express from "express";
import cors from "cors";
import db from "./config/db.js";
// import the routes
import urlRoute from "./routes/urlroute.js"
// initializing the app
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// connect to database
db.once("open", () => {
  console.log("Connected to database");
});
// Handle error on database
db.on("error", (err) => {
  console.log("Database error:", err);
});
// routes
app.use("/",urlRoute);
// Start the server
app.listen(5000, () => {
  console.log(`server started on http://localhost:${5000}`);
});
