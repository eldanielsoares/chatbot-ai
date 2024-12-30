import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConversationRepository } from 'src/domain/messages/application/conversation/conversation-repository';

@Injectable()
export class OpenAiConversationRepository implements ConversationRepository {
  private MODEL = 'gpt-3.5-turbo';
  private TEMPERATURE = 0.7;

  constructor(private readonly openai: OpenAI) {}

  async chat(message: string): Promise<string> {
    const chatCompletion = await this.openai.chat.completions.create({
      model: this.MODEL,
      messages: [
        { role: 'system', content: message },
        { role: 'user', content: message },
      ],
      temperature: this.TEMPERATURE,
    });

    return chatCompletion.choices[0].message.content;
  }
}
