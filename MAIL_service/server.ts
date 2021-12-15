import express from "express";
import { Kafka } from "kafkajs";
const app = express();

(async () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka_kafka_1:29092"],
  });

  const consumer = kafka.consumer({ groupId: "service-three" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('aaaaaaaaaaaaaaaa', {
        value: message.value?.toString(),
      });
    },
  });
})();
app.get("/", (request, response) => {
  response.send("Serve Three");
});

app.listen(3334, () => {
  console.log("Serve two is running");
});
