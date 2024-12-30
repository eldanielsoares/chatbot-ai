import { Injectable } from '@nestjs/common';
import { ConversationRepository } from 'src/domain/messages/application/conversation/conversation-repository';
import { MessagesRepository } from 'src/domain/messages/application/messages/messages-repository';
import { QRCodeRepository } from 'src/domain/messages/application/qr-code/qr-code-repository';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

@Injectable()
export class WwebjsRepository implements MessagesRepository {
  private client: Client;

  constructor(
    private readonly qrcode: QRCodeRepository,
    private readonly conversation: ConversationRepository,
  ) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });
  }

  connect(): void {
    this.client.on('qr', (qr) => {
      console.log('Scan the QR Code below to connect:');
      this.qrcode.create(qr);
    });
  }
  connected(): void {
    this.client.on('ready', () => {
      console.log('WhatsApp client is ready!');
    });
  }
  async sendMessage(): Promise<void> {
    this.client.on('message', async (message: Message) => {
      // YOU CAN USE OTHERS TRIGGERS LIKE EXACT MESSAGE
      if (message.from === 'SPECIFY_PHONE') {
        const messageGpt = await this.conversation.chat(message.body);
        return message.reply(messageGpt);
      }
    });
  }

  initialize(): void {
    this.client.initialize();
  }
}
