import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createrUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { username, email, password } = request.body;

    try {
      await this.createrUserUseCase.execute({ username, email, password });
      return response.status(201).send();
    } catch (error) {
      return response
        .status(400)
        .json({ message: error || "Unexpected error" });
    }
  }
}
