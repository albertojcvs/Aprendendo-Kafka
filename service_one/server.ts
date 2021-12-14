import express from "express";
import { Kafka, Consumer } from "kafkajs";
const app = express();

app.get("/", (request, response) => {
  const kafka = new Kafka({ brokers: ['kafka:'] });
  response.send("Serve one");
});

app.listen(3333, () => {
  console.log("Serve one is running");
});
