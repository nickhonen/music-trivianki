import express from "express";
import cors from "cors";
import "dotenv/config";
import songsRouter from "./routes/songs";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.get("/"), async (req, res) => {
  res.json({ message: "Hello World" });
};

app.get("/ping", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/playlist/:id", (_req, res) => {
  

})

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
