import { Kafka, Consumer as KafkaConsumer } from "kafkajs";
import { MailTrapProvider } from "../providers/implementaions/MailTrapProvider";

export class Consumer {
  public consumer: KafkaConsumer;
  constructor(public groupId: string) {
    const kafka = new Kafka({ brokers: ["kafka_kafka_1:29092"] });

    this.consumer = kafka.consumer({ groupId });
  }

  async consume() {
    console.log('bbbbbbbbbbbbbbbbbbbbb');
    
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "send_email_new_user",
      fromBeginning: false,
    });
    await this.consumer.subscribe({
      topic: "send_email_delete_user",
      fromBeginning: false,
    });
    const mailProvider = new MailTrapProvider();
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = message.value?.toString() || "";
        const user = JSON.parse(data);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
        switch (topic) {
          case "send_email_new_user":
            
            if (user) {
             await mailProvider.send({
                to: "albertojcvs@gmail.com",
                from: "system@system.com",
                subject: "Welcome " + user.username,
                body:`<h1>Hey,${user.username}</h1>
                      <p>Welcome!</p>`
              });
              break;
            }
          case "send_email_delete_user":
            if (user) {
              await mailProvider.send({
                to: "albertojcvs@gmail.com",
                from: "system@system.com",
                subject: "Goodbye " + user.username,
                body:`<h1>Hey,${user.username}</h1>
                      <p>Goodbye!</p>`
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
