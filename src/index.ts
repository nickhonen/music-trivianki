import express from "express";
import cors from "cors";
import "dotenv/config";
import spotifyRouter from "./routes/spotifyRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/spotify", spotifyRouter);

app.get("/api/playlist/:id", (_req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
