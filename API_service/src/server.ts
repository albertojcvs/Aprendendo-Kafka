import express from "express";
import { Kafka, Consumer } from "kafkajs";
import { routes } from "./routes";
const app = express();

app.use(express.json())
app.use(routes)


app.listen(3333, () => {
  console.log("Serve one is running");
});
 