const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");

/*****  Routes ******/
const pageRoutes = require("./routes/pageRoutes");
const photoRoutes = require("./routes/photoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/userRoutes");

const adminRoutes = require("./routes/adminRoutes");
const Category = require("./models/Category");

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.APP_MONGODB_FULL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "db-peblog"
  })
  .catch((err) => console.log("HATA: MongoBD bağlantısı yapılamadı: ", err));
/**** Global Değişkenler  ****/
global.userIN = null;

/***** Template Engine *****/
app.set("view engine", "ejs");

/***** Middleware  *****/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  // session aç
  session({
    secret: process.env.APP_SECTION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.APP_MONGODB_FULL_URL,
      dbName: "db-peblog",
    }),
  })
);
// middleware to make 'user' available to all templates
app.use(function (req, res, next) {
  res.locals.user = req.session.userID;
  next();
});

app.use(express.static("public"));
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

/* Her sayfa isteğinde bir kullanıcı giriş varsa
kullanıcı ID değerini global userIN değişkenine ata.
Menü için category isimlerini res.locals.categories
değişkenine kaydet */
app.use("*", async (req, res, next) => {
  userIN = req.session.userID;
  const categories = await Category.find({});
  res.locals.categories = categories;
  next();
});

/***** Route Ayarlari  *****/
app.use("/", pageRoutes);
app.use("/categories", categoryRoutes);
app.use("/photos", photoRoutes);
app.use("/tags", tagRoutes);
app.use("/users", userRoutes);

app.use("/admin", adminRoutes);

/***** Portu dinlemeye başla  *****/
app.listen(port, () => console.log("Uygulama ayağa kalktı."));
