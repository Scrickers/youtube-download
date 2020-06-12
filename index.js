var express = require("express");
const fs = require("fs");
const ytdl = require("ytdl-core");
const urls = "http://localhost";
var app = express();

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/download", async function (req, res) {
  const url = req.query.url;
  console.log(url);
  const id = ytdl.getURLVideoID(url);
  const infos = await ytdl.getInfo(id);
  ytdl(url, {
    filter: (format) => format.container === "mp4",
  }).pipe(res);

  res.setHeader(
    "Content-disposition",
    `attachment; filename=${infos.title}.mp4`
  );
  res.setHeader("Content-type", "audio/mp4");
  res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(80, function () {
  console.log("Server on");
});
