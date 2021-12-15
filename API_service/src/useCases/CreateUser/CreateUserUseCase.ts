import { Producer } from "../../kafkaServices/Producer";
import { ICreateUserDTO } from "./CreateUserDTo";

export class CreateUserUseCase {
  async execute(userData: ICreateUserDTO) {
    const producer = new Producer();

    await producer.produce({
      topic: "save_new_user",
      messages: [{ value: JSON.stringify(userData) }],
    });
  }
}
