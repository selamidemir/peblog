const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

/*****  Routes ******/
const pageRoutes = require("./routes/pageRoutes");
const photoRoutes = require("./routes/photoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.APP_MONGODB_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log("HATA: MongoBD bağlantısı yapılamadı: ", err));

/***** Template Engine *****/
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/***** Middleware  *****/
app.use(express.static("public"));

// app.get("/", (req, res) => res.render("index"));
app.use("/", pageRoutes);
app.use("/categories", categoryRoutes);
app.use("/photos", photoRoutes);
app.use("/tags", tagRoutes);
app.use("/users", userRoutes);

app.listen(port, () => console.log("Uygulama ayağa kalktı."));
