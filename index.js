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
connectDB(process.env.DB_URL)
  .then((res) => console.log("database connected"))
  .catch((err) => console.log("database not connected!!"));

/***************************
 * common middlware
 **************************/
app.use(express.json());
app.use(cors());

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
