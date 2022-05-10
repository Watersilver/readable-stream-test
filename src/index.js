import express from "express"

// Will be used to create stream
import fs from "fs"

// Used to get current directory
// because __dirname doesn't work in modules
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 1312;

// Serve static stuff
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve views
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Serve streams
function stream(mime, url, file) {
  app.get(url, (req, res) => {
    // Perform authentication here
    if (req.headers.test !== "ermis") {
      res.statusMessage = "header: test must be set to 'ermis' or authentication fails.";
      res.status(666).end();
      return;
    }
  
    const stream = fs.createReadStream(file);
  
    stream.on('open', () => {
        res.set('Content-Type', mime);
        stream.pipe(res);
    });
    stream.on('error', e => {
        res.set('Content-Type', 'text/plain');
        res.status(404).end(e.message);
    });
  })
}
stream("image/jpeg", "/test-image", path.join(__dirname, "testImage.jpg"));
stream("video/mp4", "/test-video", path.join(__dirname, "testVideo.mp4"));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});