import { Kafka, Consumer as KafkaConsumer } from "kafkajs";
import { PrismaUserRepository } from "../repositories/implementaions/PrismaUserRepository";
import { Producer } from "./Producer";

const userRepository = new PrismaUserRepository();

export class Consumer {
  public consumer: KafkaConsumer;
  constructor(public groupId: string) {
    const kafka = new Kafka({ brokers: ["kafka_kafka_1:29092"] });

    this.consumer = kafka.consumer({ groupId });
  }

  async consume() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "save_new_user",
      fromBeginning: false,
    });
    await this.consumer.subscribe({
      topic: "delete_user",
      fromBeginning: false,
    });

    const producer = new Producer();
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = message.value?.toString();
        switch (topic) {
          case "save_new_user":
            if (data) {
              const user = JSON.parse(data);
              await userRepository.store(user);
              await producer.produce({
                topic: "send_email_new_user",
                messages: [{ value: JSON.stringify(user)}],
              });
              break;
            }
          case "delete_user":
            if (data) {
              const user = await userRepository.find(Number(data));
              await userRepository.destroy(Number(data));
              await producer.produce({
                topic: "send_email_delete_user",
                messages: [{ value: JSON.stringify(user) }],
              });
              break;  
            }
          default:
            console.log("ERROR");
        }
      },
    });
  }
}
