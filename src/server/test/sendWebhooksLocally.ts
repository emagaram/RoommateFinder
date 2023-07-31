import axios from "axios";
import express from "express";
import ngrok from "ngrok";

import fs from "fs";

function readFileToString(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {}
}

export default async function startNgrok() {
  try {
    const key = readFileToString("./jsonBinKey.txt");
    const url = await ngrok.connect({ proto: "http", addr: "3001" });

    console.log("Ngrok on: " + url);
    await axios.put(
      "https://api.jsonbin.io/v3/b/62e7845c60c3536f3fcc638a",
      {
        url: url,
      },
      {
        headers: {
          "content-type": "application/json",
          "X-Master-Key": key?.trim(), // might need process.env
        },
      }
    );
  } catch (error) {}

  const app = express();
  // app.use(bodyParser.urlencoded({ extended: true }));
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.listen(3001);
}
(async () => startNgrok())();
