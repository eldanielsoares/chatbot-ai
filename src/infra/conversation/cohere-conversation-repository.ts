import { Injectable } from '@nestjs/common';
import { CohereClientV2 } from 'cohere-ai';
import { ConversationRepository } from 'src/domain/messages/application/conversation/conversation-repository';

@Injectable()
export class CohereConversationRepository implements ConversationRepository {
  private MODEL = 'command-r-plus';

  constructor(private readonly cohere: CohereClientV2) {}

  async chat(message: string): Promise<string> {
    const chat = await this.cohere.chat({
      model: this.MODEL,
      messages: [
        {
          role: 'user',
          content: `${message} in ptbr`,
        },
      ],
      temperature: 0.7,
    });

    return chat.message.content[0].text;
  }
}
