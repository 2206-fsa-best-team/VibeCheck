const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8080;
// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient();
const base64Img = require("base64-img");
//nlp
const natural = require("natural");
const Analyser = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyser = new Analyser("English", stemmer, "afinn");

module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(express.static(path.join(__dirname, "../build")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/", async (req, res, next) => {
  try {
    const filepath = base64Img.imgSync(req.body.img, "./imgFiles", "test");
    const [result] = await client.documentTextDetection(filepath);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.put("/journals", async (req, res, next) => {
  try {
    let sent = analyser.getSentiment(req.body.content.split(" "));
    if (sent > 0.3) {
      sent = 0.3;
    } else if (sent < -0.3) {
      sent = -0.3;
    }
    const hundredSent = Math.floor(((sent - -0.3) * 100) / 0.6);
    res.send({ hundredSent });
  } catch (e) {
    console.log(e);
  }
});

const init = async () => {
  try {
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
