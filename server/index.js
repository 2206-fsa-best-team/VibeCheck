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

module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(express.static(path.join(__dirname, "build")));

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
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/", async (req, res, next) => {
  try {
    const filepath = base64Img.imgSync(req.body.img, "./imgFiles", "test");
    const [result] = await client.documentTextDetection(filepath);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
    fullTextAnnotation.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        console.log(`Block confidence: ${block.confidence}`);
        block.paragraphs.forEach((paragraph) => {
          console.log(`Paragraph confidence: ${paragraph.confidence}`);
          paragraph.words.forEach((word) => {
            const wordText = word.symbols.map((s) => s.text).join("");
            console.log(`Word text: ${wordText}`);
            console.log(`Word confidence: ${word.confidence}`);
          });
        });
      });
    });
    res.send(result);
  } catch (err) {
    console.log(err);
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