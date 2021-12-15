import { Producer } from "../../kafkaServices/Producer";

export class DeleteUserUseCase {
  async execute(id: number | string) {
    const producer = new Producer();

    await producer.produce({
      topic: "delete_user",
      messages: [{ value: id.toLocaleString() }],
    });
  }
}
