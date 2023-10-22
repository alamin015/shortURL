const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8001;
const urlRouter = require("./routes/url.route");
const { connectDB } = require("./connection");
const urlModel = require("./models/url.model");

/***************************
 * database connection
 **************************/
const myUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srai6fz.mongodb.net/shortUrl`;
connectDB(myUrl)
  .then((res) => console.log("database connected"))
  .catch((err) => console.log("database not connected!!"));

/***************************
 * common middlware
 **************************/
const corsOptions = {
  origin: "",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
app.options("", cors(corsOptions));

app.use(express.json());
app.use(cors());

/***************************
 * Main Route call
 **************************/
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", async (req, res) => {
  const result = await urlModel.find().countDocuments();
  res.send({ result });
});

/***************************
 * url router call
 **************************/
app.use("/url", urlRouter);

/***************************
 * update url route
 **************************/
app.get("/:id", async (req, res) => {
  const shortId = req.params.id;
  const updateData = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { timeSTamp: Date.now() } },
    }
  );
  res.redirect(updateData.redirectUrl);
});

/***************************
 * app listener
 **************************/

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
