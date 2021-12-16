
export interface IMessage {
  to: string;
  from: string;
  subject: string;
  body: string;
}

export interface IMailProvider {
  send(message: IMessage): Promise<void>;
}
