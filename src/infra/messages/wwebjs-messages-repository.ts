import { Injectable } from '@nestjs/common';
import { MessagesRepository } from 'src/domain/messages/application/messages/messages-repository';
import { QRCodeRepository } from 'src/domain/messages/application/qr-code/qr-code-repository';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

@Injectable()
export class WwebjsRepository implements MessagesRepository {
  private client: Client;

  constructor(private readonly qrcode: QRCodeRepository) {
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
  sendMessage(): void {
    this.client.on('message', async (message: Message) => {
      if (message.body === 'ping') return message.reply('pong');
    });
  }

  initialize(): void {
    this.client.initialize();
  }
}
