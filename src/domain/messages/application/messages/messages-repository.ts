export abstract class MessagesRepository {
  abstract connect(): void;

  abstract connected(): void;
  abstract sendMessage(): void;

  abstract initialize(): void;
}
