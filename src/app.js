import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./api/routes/v1/index.js";
import passport from "passport";
import { googleLogin } from "./api/config/passport.js";
import { engine } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import path from "path";

googleLogin(passport);

dotenv.config(); // Here is env file configuration

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // use for getting form url data encoded

app.use(router);

// handlebars code start here
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", ".hbs"); //Sets our app to use the handlebars engine

app.set("views", path.join(__dirname, "views")); //Sets handlebars configurations

app.get("/line/graph",async(req,res)=>{
  return res.render("home/home")
})
// create server code start here
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

//Here start databse connectivity
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully..."))
  .catch(console.log);
