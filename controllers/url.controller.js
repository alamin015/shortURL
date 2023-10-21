const urlModel = require("../models/url.model");
const { default: ShortUniqueId } = require("short-unique-id");

const generateNewShortUrl = async (req, res) => {
  const data = req.body;
  const { randomUUID } = new ShortUniqueId({ length: 8 });

  if (!data.url) {
    return res.status(400).json({ error: "url is reqired" });
  }

  const newShortId = randomUUID();
  await urlModel.create({
    shortId: newShortId,
    redirectUrl: data.url,
    visitHistory: [],
  });

  return res.json({ id: newShortId });
};

const handleAnalytic = async (req, res) => {
  const shortId = req.params.id;
  const result = await urlModel.findOne(
    { shortId },
    { redirectUrl: true, visitHistory: true }
  );
  return res.send(result);
};

module.exports = { generateNewShortUrl, handleAnalytic };
