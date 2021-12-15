import express from "express";
import { Kafka, Consumer } from "kafkajs";
const app = express();

app.get("/", async (request, response) => {
  const kafka = new Kafka({ brokers: ["kafka_kafka_1:29092"] });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Testando o kafka" }],
  });

  await producer.disconnect();

  response.send("Serve one");
});

app.listen(3333, () => {
  console.log("Serve one is running");
});
 