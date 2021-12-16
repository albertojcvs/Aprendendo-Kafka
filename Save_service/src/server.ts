import { PrismaClient } from ".prisma/client";
import express, { response } from "express";
import { Consumer } from "./kafkaServices/Consumer";
import { Kafka } from "kafkajs";
import { PrismaUserRepository } from "./repositories/implementaions/PrismaUserRepository";
const app = express();

const consumer = new Consumer('save_service_1')

consumer.consume()
app.listen(3334, () => {
  console.log("Serve two is running");
});
