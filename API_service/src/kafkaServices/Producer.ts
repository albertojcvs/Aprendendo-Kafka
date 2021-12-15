import { Kafka, Producer as KafkaProducer,Message } from "kafkajs";

interface IProduceProps{
    topic:string
    messages:Message[]
}

export class Producer {
  public producer: KafkaProducer;
  constructor() {
    const kafka = new Kafka({ brokers: ["kafka_kafka_1:29092"] });
    this.producer = kafka.producer()
  }

  async produce({topic,messages}:IProduceProps) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages
    });

    await this.producer.disconnect();
  }
}
