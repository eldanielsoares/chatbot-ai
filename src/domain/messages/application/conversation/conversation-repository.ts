export abstract class ConversationRepository {
  abstract chat(message: string): Promise<string>;
}
